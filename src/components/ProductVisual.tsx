"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductVisual({
  product,
  className = "",
  emojiClassName = "text-6xl",
}: {
  product: Product;
  className?: string;
  emojiClassName?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const src = product.image ?? `/categories/${product.slug}.jpg`;

  if (!imageFailed) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-br ${product.accent} flex items-center justify-center ${className}`}
    >
      <span className={emojiClassName}>{product.emoji}</span>
    </div>
  );
}
