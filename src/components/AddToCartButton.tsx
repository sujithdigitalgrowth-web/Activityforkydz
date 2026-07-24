"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { pushDataLayer, toDataLayerItems } from "@/lib/gtm";

export default function AddToCartButton({
  product,
  className = "",
  compact = false,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  const { isInCart, addItem } = useCart();
  const inCart = isInCart(product.slug);

  if (product.comingSoon) {
    return (
      <span
        className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-semibold bg-zinc-100 text-zinc-400 cursor-not-allowed ${className}`}
      >
        Coming soon
      </span>
    );
  }

  if (inCart) {
    return (
      <Link
        href="/checkout"
        onClick={(e) => e.stopPropagation()}
        className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors bg-emerald-600 text-white hover:bg-emerald-700 ${className}`}
      >
        {compact ? "Pay" : "Pay now"} <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label="Add to cart"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product.slug);
        pushDataLayer({
          event: "add_to_cart",
          ecommerce: {
            currency: "INR",
            value: product.price,
            items: toDataLayerItems([product]),
          },
        });
      }}
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors bg-orange-500 text-white hover:bg-orange-600 ${className}`}
    >
      <span aria-hidden="true">+</span> {compact ? "Add" : "Add to cart"}
    </button>
  );
}
