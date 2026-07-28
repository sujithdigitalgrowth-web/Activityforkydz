"use client";

import { useCart } from "@/lib/cart-context";
import { COLOURING_COMBO_SLUGS, COLOURING_COMBO_PRICE, getColouringComboProducts } from "@/lib/bundles";
import AddComboButton from "./AddComboButton";

// Shown above the checkout CTA whenever the cart has at least one
// combo-eligible colouring pack but not the full set of 6 — nudges toward
// the flat ₹340 bundle instead.
export default function ComboUpsellBanner() {
  const { slugs } = useCart();
  const hasComboEligible = COLOURING_COMBO_SLUGS.some((slug) => slugs.includes(slug));
  const comboApplied = COLOURING_COMBO_SLUGS.every((slug) => slugs.includes(slug));

  if (!hasComboEligible || comboApplied) return null;

  const comboOriginalTotal = getColouringComboProducts().reduce((sum, p) => sum + p.price, 0);
  const savings = comboOriginalTotal - COLOURING_COMBO_PRICE;

  return (
    <div className="mb-3 rounded-xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-white p-2.5 sm:p-3 text-center">
      <span className="inline-block rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 mb-1">
        Best value
      </span>
      <p className="text-xs sm:text-sm font-bold text-emerald-900 leading-snug">
        Get all 6 colouring packs for just ₹{COLOURING_COMBO_PRICE}
      </p>
      <p className="text-[11px] sm:text-xs text-emerald-700 mt-0.5">
        <span className="line-through text-zinc-400">₹{comboOriginalTotal}</span> — save ₹{savings}
      </p>
      <AddComboButton className="w-full mt-2 px-3 py-2 text-xs sm:text-sm" />
    </div>
  );
}
