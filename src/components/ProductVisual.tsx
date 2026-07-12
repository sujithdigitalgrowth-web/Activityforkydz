"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductVisual({
  product,
  className = "",
  emojiClassName = "text-6xl",
  iconOnly = false,
  srcOverride,
}: {
  product: Product;
  className?: string;
  emojiClassName?: string;
  // Skip the real cover photo and always show the accent + emoji tile —
  // for spots like the category strip, which is meant to stay a uniform
  // row of simple icons rather than a mix of photos and icons.
  iconOnly?: boolean;
  // Use a specific image instead of the default cover (product.image /
  // /categories/<slug>.jpg) — e.g. product.bannerImage for the hero carousel.
  srcOverride?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const src = srcOverride ?? product.image ?? `/categories/${product.slug}.jpg`;

  // The accent + emoji fallback is always the base layer, so there's never a
  // blank flash while the real cover image is still loading (or a 404, for
  // packs that don't have one yet) — this matters most on slow mobile networks.
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${product.accent} flex items-center justify-center ${className}`}
    >
      <span className={emojiClassName}>{product.emoji}</span>
      {!iconOnly && !imageFailed && (
        <Image
          src={src}
          alt={`${product.title} — ${product.tagline}`}
          fill
          sizes="(max-width: 768px) 90vw, 400px"
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
