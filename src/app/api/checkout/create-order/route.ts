import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getCartPricing } from "@/lib/pricing";
import { getRazorpay } from "@/lib/razorpay";
import { encodeSlugsToNotes } from "@/lib/cart-notes";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const slugs = body?.slugs as string[] | undefined;
  const email = body?.email as string | undefined;

  if (!Array.isArray(slugs) || slugs.length === 0 || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid cart and email are required" }, { status: 400 });
  }

  const uniqueSlugs = [...new Set(slugs)];
  const products = uniqueSlugs.map((slug) => getProductBySlug(slug));
  if (products.some((p) => !p)) {
    return NextResponse.json({ error: "One or more products were not found" }, { status: 404 });
  }
  const verifiedProducts = products.filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Amount charged is computed here, server-side, from the cart contents —
  // never trust a client-submitted total for what Razorpay actually collects.
  const { total } = getCartPricing(verifiedProducts);
  const amount = Math.round(total * 100); // paise

  const order = await getRazorpay().orders.create({
    amount,
    currency: "INR",
    notes: { email, ...encodeSlugsToNotes(uniqueSlugs) },
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
    products: verifiedProducts.map((p) => ({ title: p.title, slug: p.slug })),
  });
}
