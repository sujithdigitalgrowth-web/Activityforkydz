import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getRazorpay } from "@/lib/razorpay";
import { getProductBySlug } from "@/lib/products";
import { decodeSlugsFromNotes } from "@/lib/cart-notes";
import { signDownload } from "@/lib/download-token";

// Client-side confirmation that the payment which just closed the Razorpay
// modal actually belongs to this order and wasn't spoofed by the browser.
// The download email is still driven by /api/webhooks/razorpay (fires even
// if the customer closes the tab), but once we're here the signature is
// already proven genuine, so we also hand back direct download links —
// letting the customer download instantly instead of only via email.
export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.error("RAZORPAY_KEY_SECRET is not set");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const orderId = body?.razorpay_order_id as string | undefined;
  const paymentId = body?.razorpay_payment_id as string | undefined;
  const signature = body?.razorpay_signature as string | undefined;

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const expectedBuf = Buffer.from(expected);
  const givenBuf = Buffer.from(signature);

  const valid =
    expectedBuf.length === givenBuf.length && timingSafeEqual(expectedBuf, givenBuf);

  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  // Recover which products were bought from the order's notes (packed there
  // at create-order time — same source the webhook reads) so we can return
  // signed download links immediately, without waiting on the async webhook.
  let downloads: { slug: string; title: string; downloadUrl: string }[] = [];
  try {
    const order = await getRazorpay().orders.fetch(orderId);
    const notes = (order.notes ?? {}) as Record<string, unknown>;
    const slugs = decodeSlugsFromNotes(notes);
    downloads = slugs
      .map((slug) => getProductBySlug(slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((product) => ({
        slug: product.slug,
        title: product.title,
        downloadUrl: `/api/download/${product.slug}?oid=${encodeURIComponent(orderId)}&sig=${signDownload(orderId, product.slug)}`,
      }));
  } catch (err) {
    console.error("Could not fetch order notes for instant download links", err);
  }

  return NextResponse.json({ verified: true, downloads });
}
