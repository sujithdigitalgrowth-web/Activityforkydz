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
    <div className="h-full flex flex-col justify-between rounded-2xl bg-white border border-orange-100 shadow-sm p-5">
      <div>
        <span className="text-3xl font-bold text-zinc-900">₹{product.price}</span>
        <p className="text-sm text-zinc-500 mt-0.5">{product.pageCount} pages · instant download</p>

        <div className="mt-6 space-y-2">
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

        <div className="mt-6 space-y-2 text-xs text-zinc-600">
          <p className="flex items-start gap-1.5">
            <span aria-hidden="true">🔒</span> Secure checkout
          </p>
          <p className="flex items-start gap-1.5">
            <span aria-hidden="true">⚡</span> Instant delivery
          </p>
          <p className="flex items-start gap-1.5">
            <span aria-hidden="true">💬</span> Real support if anything goes wrong
          </p>
        </div>
      </div>
      <p className="text-xs text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
        Pay via UPI, cards or netbanking. No app or account needed.
      </p>
    </div>
  );
}
