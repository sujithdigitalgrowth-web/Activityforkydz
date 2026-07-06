import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getProductBySlug } from "@/lib/products";
import { signDownload } from "@/lib/download-token";
import { sendDownloadEmail } from "@/lib/email";

function isValidSignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuf = Buffer.from(expected);
  const givenBuf = Buffer.from(signature);
  if (expectedBuf.length !== givenBuf.length) return false;
  return timingSafeEqual(expectedBuf, givenBuf);
}

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("RAZORPAY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  if (!signature || !isValidSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    const notes = payment?.notes ?? {};
    const slug: string | undefined = notes.slug;
    const email: string | undefined = notes.email;
    const orderId: string | undefined = payment?.order_id;

    if (slug && email && orderId) {
      const product = getProductBySlug(slug);
      if (product) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
        const sig = signDownload(orderId, slug);
        const downloadUrl = `${siteUrl}/api/download/${slug}?oid=${encodeURIComponent(orderId)}&sig=${sig}`;

        try {
          await sendDownloadEmail({ to: email, product, downloadUrl });
        } catch (err) {
          console.error("Failed to send download email", err);
          return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
