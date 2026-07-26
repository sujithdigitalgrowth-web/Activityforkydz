"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { COLOURING_COMBO_SLUGS, COLOURING_COMBO_PRICE, getColouringComboProducts } from "@/lib/bundles";
import { pushDataLayer, toDataLayerItems } from "@/lib/gtm";

export default function AddComboButton({ className = "" }: { className?: string }) {
  const { isInCart, addItem } = useCart();
  const allInCart = COLOURING_COMBO_SLUGS.every((slug) => isInCart(slug));

  if (allInCart) {
    return (
      <Link
        href="/cart"
        className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors bg-emerald-600 text-white hover:bg-emerald-700 ${className}`}
      >
        <span aria-hidden="true">✓</span> View cart
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        COLOURING_COMBO_SLUGS.forEach((slug) => addItem(slug));
        pushDataLayer({
          event: "add_to_cart",
          ecommerce: {
            currency: "INR",
            value: COLOURING_COMBO_PRICE,
            items: toDataLayerItems(getColouringComboProducts()),
          },
        });
      }}
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors bg-orange-500 text-white hover:bg-orange-600 ${className}`}
    >
      <span aria-hidden="true">+</span> Add all 6 to cart — ₹{COLOURING_COMBO_PRICE}
    </button>
  );
}
