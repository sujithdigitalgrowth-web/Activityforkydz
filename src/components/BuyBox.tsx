"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import AddToCartButton from "./AddToCartButton";

export default function BuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  function buyNow() {
    addItem(product.slug);
    router.push("/checkout");
  }

  return (
    <div className="rounded-2xl bg-white border border-orange-100 shadow-sm p-6">
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-3xl font-bold text-zinc-900">₹{product.price}</span>
        <span className="text-sm text-zinc-500">{product.pageCount} pages · instant download</span>
      </div>

      <div className="space-y-2">
        {!product.comingSoon && (
          <button
            onClick={buyNow}
            className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-colors"
          >
            Buy now — ₹{product.price}
          </button>
        )}
        <AddToCartButton product={product} className="w-full py-3" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-x-4 gap-y-1 flex-wrap text-xs text-zinc-600">
        <span className="flex items-center gap-1">
          <span aria-hidden="true">🔒</span> Secure checkout
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden="true">⚡</span> Instant delivery
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden="true">💬</span> Real support if anything goes wrong
        </span>
      </div>
      <p className="text-xs text-zinc-400 mt-2 text-center">
        Pay via UPI, cards or netbanking. No app or account needed.
      </p>
    </div>
  );
}
