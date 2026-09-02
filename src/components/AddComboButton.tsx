"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { getComboProducts, type ComboDef } from "@/lib/bundles";
import { pushDataLayer, toDataLayerItems } from "@/lib/gtm";

// A combo is a single buying decision, not something to build up a cart
// with — so this goes straight to checkout instead of "add to cart" plus a
// second click, matching BuyBox's "Buy now" pattern for individual packs.
export default function AddComboButton({
  combo,
  className = "",
}: {
  combo: ComboDef;
  className?: string;
}) {
  const router = useRouter();
  const { addItem } = useCart();

  function buyNow() {
    combo.slugs.forEach((slug) => addItem(slug));
    pushDataLayer({
      event: "add_to_cart",
      ecommerce: {
        currency: "INR",
        value: combo.price,
        items: toDataLayerItems(getComboProducts(combo)),
      },
    });
    router.push("/checkout");
  }

  return (
    <button
      type="button"
      onClick={buyNow}
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors bg-orange-500 text-white hover:bg-orange-600 ${className}`}
    >
      Buy now — ₹{combo.price}
    </button>
  );
}
