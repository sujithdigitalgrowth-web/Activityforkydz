import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

// Client-side confirmation that the payment which just closed the Razorpay
// modal actually belongs to this order and wasn't spoofed by the browser.
// This only gates the success UI — fulfillment (the download email) is
// driven by /api/webhooks/razorpay, which Razorpay calls server-to-server
// and can't be skipped by closing the tab.
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

  return NextResponse.json({ verified: true });
}
