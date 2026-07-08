"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import AddToCartButton from "./AddToCartButton";

export default function HeroCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.92, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="relative snap-center shrink-0 w-full sm:w-[90%] rounded-2xl overflow-hidden shadow-sm"
          >
            <Link href={`/products/${product.slug}`} className="block">
              <ProductVisual
                product={product}
                className="aspect-[16/9] sm:aspect-[21/8] w-full"
                emojiClassName="text-8xl sm:text-9xl"
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <span className="inline-block rounded-full bg-white/90 text-orange-700 text-xs font-bold px-3 py-1 mb-2 sm:mb-3">
                ₹{product.price} · {product.pageCount} pages
              </span>
              <Link href={`/products/${product.slug}`}>
                <h2 className="font-heading text-xl sm:text-3xl font-bold text-white leading-snug drop-shadow-sm line-clamp-2 max-w-xl">
                  {product.title}
                </h2>
              </Link>
              <p className="text-white/85 text-sm sm:text-base mt-1 line-clamp-1 max-w-lg">
                {product.tagline}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <AddToCartButton product={product} className="px-5 py-2.5" />
                <Link
                  href={`/products/${product.slug}`}
                  className="rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold px-5 py-2.5 backdrop-blur-sm transition-colors"
                >
                  View pack →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        {products.map((product) => (
          <span
            key={product.slug}
            className="h-1.5 w-1.5 rounded-full bg-orange-300"
            aria-hidden="true"
          />
        ))}
      </div>

      <button
        aria-label="Previous"
        onClick={() => scrollByAmount(-1)}
        className="hidden sm:flex absolute -left-4 top-[40%] -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white border border-orange-100 shadow hover:bg-orange-50"
      >
        ←
      </button>
      <button
        aria-label="Next"
        onClick={() => scrollByAmount(1)}
        className="hidden sm:flex absolute -right-4 top-[40%] -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white border border-orange-100 shadow hover:bg-orange-50"
      >
        →
      </button>
    </div>
  );
}
