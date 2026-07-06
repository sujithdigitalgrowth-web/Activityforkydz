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
  if (product.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover"
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
