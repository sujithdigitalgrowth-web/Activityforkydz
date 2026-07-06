"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import SocialProof from "./SocialProof";

export default function HeroCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="snap-center shrink-0 w-[85%] sm:w-[60%] lg:w-[38%] flex flex-col rounded-2xl border border-orange-100 bg-white overflow-hidden shadow-sm"
          >
            <ProductVisual product={product} className="h-40 w-full" emojiClassName="text-6xl" />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-heading font-semibold text-lg leading-snug text-zinc-900 line-clamp-2 min-h-[3.25rem]">
                {product.title}
              </h3>
              <p className="text-sm text-zinc-600 mt-1 line-clamp-2 min-h-[2.5rem]">
                {product.tagline}
              </p>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-orange-100 text-orange-700 px-2 py-1 font-medium">
                    {product.pageCount} pages
                  </span>
                  <span className="rounded-full bg-orange-100 text-orange-700 px-2 py-1 font-medium">
                    ₹{product.price}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <SocialProof product={product} />
              </div>
              <div className="flex-1" />
              <Link
                href={`/products/${product.slug}`}
                className="mt-4 inline-block w-full text-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 transition-colors"
              >
                Download now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous"
        onClick={() => scrollByAmount(-1)}
        className="hidden sm:flex absolute -left-4 top-1/3 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white border border-orange-100 shadow hover:bg-orange-50"
      >
        ←
      </button>
      <button
        aria-label="Next"
        onClick={() => scrollByAmount(1)}
        className="hidden sm:flex absolute -right-4 top-1/3 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white border border-orange-100 shadow hover:bg-orange-50"
      >
        →
      </button>
    </div>
  );
}
