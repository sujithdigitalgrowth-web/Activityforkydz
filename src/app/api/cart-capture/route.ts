import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { logAbandonedCart } from "@/lib/cart-capture";

const PHONE_RE = /^[6-9]\d{9}$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const phone = body?.phone as string | undefined;
  const email = body?.email as string | undefined;
  const items = body?.items as unknown;
  const amount = body?.amount as unknown;

  if (!phone || !PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "A valid 10-digit phone number is required" }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0 || items.some((s) => typeof s !== "string")) {
    return NextResponse.json({ error: "Cart items are required" }, { status: 400 });
  }
  if (typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "A valid amount is required" }, { status: 400 });
  }

  const cartId = randomUUID();

  try {
    await logAbandonedCart({ cartId, phone, email: email ?? "", items, amount });
  } catch (err) {
    console.error("Failed to log abandoned cart", err);
    // Still return a cartId — a logging failure shouldn't block checkout.
  }

  return NextResponse.json({ cartId });
}
