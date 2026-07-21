import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getProductBySlug } from "@/lib/products";
import { signDownload } from "@/lib/download-token";
import { sendDownloadEmail } from "@/lib/email";
import { decodeSlugsFromNotes } from "@/lib/cart-notes";
import { getBaseUrl } from "@/lib/seo";

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
    const email: string | undefined = notes.email;
    const orderId: string | undefined = payment?.order_id;
    const slugs = decodeSlugsFromNotes(notes);

    if (email && orderId && slugs.length > 0) {
      const siteUrl = getBaseUrl();

      const items = slugs
        .map((slug) => getProductBySlug(slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
        .map((product) => {
          const sig = signDownload(orderId, product.slug);
          const downloadUrl = `${siteUrl}/api/download/${product.slug}?oid=${encodeURIComponent(orderId)}&sig=${sig}`;
          return { product, downloadUrl };
        });

      if (items.length > 0) {
        try {
          await sendDownloadEmail({ to: email, items });
        } catch (err) {
          console.error("Failed to send download email", err);
          return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
