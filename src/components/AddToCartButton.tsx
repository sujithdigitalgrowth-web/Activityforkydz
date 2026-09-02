"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { pushDataLayer, toDataLayerItems } from "@/lib/gtm";

// Every purchase button on the site goes straight to checkout — there's no
// "add to cart, keep browsing, come back later" journey anymore, so this
// adds the single item and navigates immediately, same as AddComboButton.
export default function AddToCartButton({
  product,
  className = "",
  compact = false,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const { addItem } = useCart();

  if (product.comingSoon) {
    return (
      <span
        className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-semibold bg-zinc-100 text-zinc-400 cursor-not-allowed ${className}`}
      >
        Coming soon
      </span>
    );
  }

  return (
    <button
      type="button"
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
        router.push("/checkout");
      }}
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors bg-orange-500 text-white hover:bg-orange-600 ${className}`}
    >
      {compact ? `₹${product.price}` : `Buy now — ₹${product.price}`}
    </button>
  );
}
