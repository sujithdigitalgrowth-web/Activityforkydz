"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProductBySlug } from "@/lib/products";
import { getCartPricing } from "@/lib/pricing";
import ProductVisual from "@/components/ProductVisual";
import CartAddOns from "@/components/CartAddOns";
import { pushDataLayer, toDataLayerItems } from "@/lib/gtm";

export default function CartPage() {
  const { slugs, removeItem } = useCart();
  const items = slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const pricing = getCartPricing(items);

  // useCart() is backed by useSyncExternalStore, which renders an empty
  // array on the very first client commit of a hard page load (to match
  // SSR) before switching to the real localStorage-backed cart. Depending
  // on `items` (instead of a one-time `[]`) plus a ref guard means this
  // fires once, on whichever render actually has real data.
  const hasTrackedViewCart = useRef(false);
  useEffect(() => {
    if (hasTrackedViewCart.current || items.length === 0) return;
    hasTrackedViewCart.current = true;
    pushDataLayer({
      event: "view_cart",
      ecommerce: {
        currency: "INR",
        value: pricing.total,
        items: toDataLayerItems(items),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="font-heading text-2xl font-semibold text-zinc-900">
          Your cart is empty
        </h1>
        <p className="text-zinc-600 mt-2">
          Add a few packs and they&apos;ll show up here, ready to check out.
        </p>
        <Link
          href="/#packs"
          className="inline-block mt-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 transition-colors"
        >
          Browse packs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-heading text-2xl font-semibold text-zinc-900 mb-6">
        Your cart ({items.length})
      </h1>

      <div className="grid md:grid-cols-5 gap-6 md:gap-8">
        <div className="md:col-span-3 space-y-4">
          {items.map((product) => {
            const isFree = product.slug === pricing.freeSlug;
            return (
              <div
                key={product.slug}
                className="flex items-center gap-4 rounded-xl border border-orange-100 bg-white p-3"
              >
                <Link href={`/products/${product.slug}`} className="shrink-0">
                  <ProductVisual
                    product={product}
                    className="rounded-lg h-20 w-24 sm:w-28"
                    emojiClassName="text-4xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${product.slug}`}>
                    <h2 className="font-heading font-semibold text-zinc-900 truncate">
                      {product.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-zinc-500">{product.pageCount} pages</p>
                  {isFree && (
                    <span className="inline-block mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                      🎁 Free pack
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  {isFree ? (
                    <p className="font-bold">
                      <span className="text-zinc-400 line-through text-sm mr-1.5">₹{product.price}</span>
                      <span className="text-emerald-600">FREE</span>
                    </p>
                  ) : (
                    <p className="font-bold text-orange-600">₹{product.price}</p>
                  )}
                  <button
                    onClick={() => removeItem(product.slug)}
                    className="text-xs text-zinc-500 hover:text-red-600 mt-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:col-span-2">
          <div className="md:sticky md:top-24 rounded-2xl bg-white border border-orange-100 shadow-sm p-4 sm:p-5">
            {pricing.discount > 0 ? (
              <>
                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <span>Subtotal</span>
                  <span>₹{pricing.subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-emerald-600 font-medium mt-1">
                  <span>🎁 Buy 2, get 1 free</span>
                  <span>-₹{pricing.discount}</span>
                </div>
                <div className="flex items-baseline justify-between mt-1.5 mb-1">
                  <span className="text-zinc-600">Total</span>
                  <span className="text-2xl font-bold text-zinc-900">₹{pricing.total}</span>
                </div>
              </>
            ) : (
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-zinc-600">Subtotal</span>
                <span className="text-2xl font-bold text-zinc-900">₹{pricing.total}</span>
              </div>
            )}
            <p className="text-xs text-zinc-500 mb-3">
              {items.length} pack{items.length === 1 ? "" : "s"} · instant PDF downloads
            </p>
            {pricing.discount === 0 && items.length < 3 && (
              <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1.5 mb-3">
                🎁 Add {3 - items.length} more pack{3 - items.length === 1 ? "" : "s"} — buy 2,
                get 1 free!
              </p>
            )}
            <Link
              href="/checkout"
              className="block w-full text-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 transition-colors"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/#packs"
              className="block w-full text-center text-sm text-zinc-500 hover:text-orange-600 mt-2.5 transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CartAddOns />
      </div>
    </div>
  );
}
