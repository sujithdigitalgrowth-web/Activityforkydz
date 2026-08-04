"use client";

import { useCart } from "@/lib/cart-context";
import { COMBOS, getComboProducts } from "@/lib/bundles";
import AddComboButton from "./AddComboButton";

// Shown above the checkout CTA whenever the cart has at least one pack that's
// eligible for a combo (see src/lib/bundles.ts) but not the full set — nudges
// toward the flat bundle price instead. If more than one combo is partially
// eligible, shows whichever one is closest to complete.
export default function ComboUpsellBanner() {
  const { slugs } = useCart();

  const candidate = COMBOS.map((combo) => ({
    combo,
    matched: combo.slugs.filter((slug) => slugs.includes(slug)).length,
  }))
    .filter((c) => c.matched > 0 && c.matched < c.combo.slugs.length)
    .sort((a, b) => b.matched - a.matched)[0];

  if (!candidate) return null;
  const { combo } = candidate;

  const comboOriginalTotal = getComboProducts(combo).reduce((sum, p) => sum + p.price, 0);
  const savings = comboOriginalTotal - combo.price;

  return (
    <div className="mb-3 rounded-xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-white p-2.5 sm:p-3 text-center">
      <span className="inline-block rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 mb-1">
        Best value
      </span>
      <p className="text-xs sm:text-sm font-bold text-emerald-900 leading-snug">
        Get {combo.label.toLowerCase()} for just ₹{combo.price}
      </p>
      <p className="text-[11px] sm:text-xs text-emerald-700 mt-0.5">
        <span className="line-through text-zinc-400">₹{comboOriginalTotal}</span> — save ₹{savings}
      </p>
      <AddComboButton combo={combo} className="w-full mt-2 px-3 py-2 text-xs sm:text-sm" />
    </div>
  );
}
