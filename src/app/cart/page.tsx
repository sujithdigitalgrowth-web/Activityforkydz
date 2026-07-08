"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProductBySlug } from "@/lib/products";
import ProductVisual from "@/components/ProductVisual";

export default function CartPage() {
  const { slugs, removeItem } = useCart();
  const items = slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const subtotal = items.reduce((sum, p) => sum + p.price, 0);

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

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((product) => (
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
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-orange-600">₹{product.price}</p>
                <button
                  onClick={() => removeItem(product.slug)}
                  className="text-xs text-zinc-500 hover:text-red-600 mt-1 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-white border border-orange-100 shadow-sm p-6">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-zinc-600">Subtotal</span>
              <span className="text-2xl font-bold text-zinc-900">₹{subtotal}</span>
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              {items.length} pack{items.length === 1 ? "" : "s"} · instant PDF downloads
            </p>
            <Link
              href="/checkout"
              className="block w-full text-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-colors"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/#packs"
              className="block w-full text-center text-sm text-zinc-500 hover:text-orange-600 mt-3 transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
