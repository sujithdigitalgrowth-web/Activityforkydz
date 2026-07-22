"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";

export default function HeroCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollByAmount(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.92, behavior: "smooth" });
  }

  function handleScroll() {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="relative snap-center shrink-0 w-full rounded-2xl overflow-hidden shadow-sm"
          >
            <Link href={`/products/${product.slug}`} className="block">
              {/* Separate mobile/desktop crops (art direction) rather than one
                  image squeezed into both ratios via object-cover, since a
                  3:1 desktop banner loses too much width when cropped to 16:9. */}
              <ProductVisual
                product={product}
                className="aspect-[16/9] w-full sm:hidden"
                emojiClassName="text-8xl"
                srcOverride={product.bannerImageMobile ?? product.bannerImage}
              />
              <ProductVisual
                product={product}
                className="max-sm:hidden aspect-[3/1] w-full"
                emojiClassName="text-9xl"
                srcOverride={product.bannerImage}
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        {products.map((product, i) => (
          <span
            key={product.slug}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? "w-4 bg-orange-500" : "w-1.5 bg-orange-300"
            }`}
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
