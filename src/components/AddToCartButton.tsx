"use client";

import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export default function AddToCartButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { isInCart, addItem, removeItem } = useCart();
  const inCart = isInCart(product.slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inCart) {
          removeItem(product.slug);
        } else {
          addItem(product.slug);
        }
      }}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors ${
        inCart
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
          : "bg-orange-500 text-white hover:bg-orange-600"
      } ${className}`}
    >
      {inCart ? (
        <>
          <span aria-hidden="true">✓</span> In cart
        </>
      ) : (
        <>
          <span aria-hidden="true">+</span> Add to cart
        </>
      )}
    </button>
  );
}
