"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductVisual from "./ProductVisual";
import AddToCartButton from "./AddToCartButton";

// Cap the add-on rail so it stays a quick scan, not another product grid to shop.
const MAX_ADD_ONS = 6;

export default function CartAddOns() {
  const { slugs } = useCart();
  const addOns = products
    .filter((p) => !p.comingSoon && !slugs.includes(p.slug))
    .slice(0, MAX_ADD_ONS);

  if (addOns.length === 0) return null;

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4 sm:p-5">
      <h2 className="font-heading font-semibold text-zinc-900">Add a pack while you&apos;re here</h2>
      <p className="text-sm text-zinc-500 mt-0.5 mb-4">
        Delivered instantly alongside the rest of your order.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
        {addOns.map((product) => (
          <div
            key={product.slug}
            className="rounded-lg border border-orange-100 overflow-hidden flex flex-col"
          >
            <Link href={`/products/${product.slug}`} className="block">
              <ProductVisual
                product={product}
                className="aspect-square w-full"
                emojiClassName="text-2xl"
              />
            </Link>
            <div className="p-1.5 sm:p-2 flex flex-col flex-1">
              <Link href={`/products/${product.slug}`}>
                <p className="text-[11px] sm:text-xs font-semibold text-zinc-900 leading-snug line-clamp-2 min-h-[1.9em]">
                  {product.title}
                </p>
              </Link>
              <p className="font-bold text-orange-600 text-xs sm:text-sm mt-0.5">₹{product.price}</p>
              <AddToCartButton product={product} className="w-full mt-1.5 py-1 text-[10px] sm:text-xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
