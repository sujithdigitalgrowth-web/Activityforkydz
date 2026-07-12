"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductVisual from "./ProductVisual";
import AddToCartButton from "./AddToCartButton";

export default function CartAddOns() {
  const { slugs } = useCart();
  const addOns = products.filter((p) => !p.comingSoon && !slugs.includes(p.slug));

  if (addOns.length === 0) return null;

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4 sm:p-5">
      <h2 className="font-heading font-semibold text-zinc-900">Add a pack while you&apos;re here</h2>
      <p className="text-sm text-zinc-500 mt-0.5 mb-4">
        Delivered instantly alongside the rest of your order.
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {addOns.map((product) => (
          <div
            key={product.slug}
            className="shrink-0 w-36 sm:w-40 rounded-xl border border-orange-100 overflow-hidden"
          >
            <Link href={`/products/${product.slug}`} className="block">
              <ProductVisual
                product={product}
                className="aspect-square w-full"
                emojiClassName="text-4xl"
              />
            </Link>
            <div className="p-2.5">
              <Link href={`/products/${product.slug}`}>
                <p className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 min-h-[2.25rem]">
                  {product.title}
                </p>
              </Link>
              <p className="font-bold text-orange-600 text-sm mt-1">₹{product.price}</p>
              <AddToCartButton product={product} className="w-full mt-2 py-1.5 text-xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
