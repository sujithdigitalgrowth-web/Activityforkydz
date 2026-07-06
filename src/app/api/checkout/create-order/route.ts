import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getRazorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const slug = body?.slug as string | undefined;
  const email = body?.email as string | undefined;

  if (!slug || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid product and email are required" }, { status: 400 });
  }

  const product = getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const order = await getRazorpay().orders.create({
    amount: product.price * 100, // paise
    currency: "INR",
    notes: { slug, email },
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
    product: { title: product.title, slug: product.slug },
  });
}
