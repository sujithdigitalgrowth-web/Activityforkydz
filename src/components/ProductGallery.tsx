"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

type Slide = { src: string; label: string };

// Same base-layer trick as ProductVisual: the accent + emoji tile is always
// there, so a missing/404 photo (a gallery slot with no real image dropped in
// yet) just falls back to it instead of showing a blank box.
function Slot({
  product,
  slide,
  selected,
  onClick,
  imageClassName,
  emojiClassName,
  priority,
  // Thumbnails are always small squares, so a tight object-cover crop reads
  // fine there. The large main viewer sometimes shows a portrait A4 page
  // (a "look inside" sample) inside a wide 16:9 box — object-cover would
  // crop most of the page away, so it uses object-contain (letterboxed)
  // instead to show the full page.
  fit = "cover",
}: {
  product: Product;
  slide: Slide;
  selected: boolean;
  onClick?: () => void;
  imageClassName: string;
  emojiClassName: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // The letterbox bars around a contained (non-cropped) image should blend
  // with the page background rather than clash with the product's accent
  // color, which is tuned for a fully-covered tile, not empty bar space.
  const background = fit === "contain" ? "bg-[#fffaf3]" : `bg-gradient-to-br ${product.accent}`;

  const content = (
    <div
      className={`relative overflow-hidden ${background} flex items-center justify-center ${imageClassName}`}
    >
      <span className={emojiClassName}>{product.emoji}</span>
      {!failed && (
        <Image
          src={slide.src}
          alt={`${product.title} — ${slide.label}`}
          fill
          sizes={onClick ? "64px" : "(max-width: 768px) 90vw, 800px"}
          priority={priority}
          className={`${fit === "contain" ? "object-contain" : "object-cover"} transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );

  if (!onClick) return content;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={slide.label}
      aria-current={selected}
      className={`shrink-0 rounded-lg overflow-hidden border-2 transition ${
        selected ? "border-orange-500" : "border-transparent hover:border-orange-200"
      }`}
    >
      {content}
    </button>
  );
}

export default function ProductGallery({
  product,
  mainClassName = "",
}: {
  product: Product;
  mainClassName?: string;
}) {
  const cover = product.bannerImage ?? product.image ?? `/categories/${product.slug}.jpg`;
  const slides: Slide[] = [{ src: cover, label: product.title }, ...(product.galleryImages ?? [])];
  const [selected, setSelected] = useState(0);

  if (slides.length === 1) {
    return (
      <Slot
        product={product}
        slide={slides[0]}
        selected
        imageClassName={mainClassName}
        emojiClassName="text-7xl"
        priority
      />
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3">
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
        {slides.map((slide, i) => (
          <Slot
            key={slide.src + i}
            product={product}
            slide={slide}
            selected={selected === i}
            onClick={() => setSelected(i)}
            imageClassName="w-16 h-16 rounded-lg"
            emojiClassName="text-xl"
          />
        ))}
      </div>
      <Slot
        product={product}
        slide={slides[selected]}
        selected
        imageClassName={`flex-1 ${mainClassName}`}
        emojiClassName="text-7xl"
        priority={selected === 0}
        fit={selected === 0 ? "cover" : "contain"}
      />
    </div>
  );
}
