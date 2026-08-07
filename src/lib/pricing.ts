import type { Product } from "./products";
import { COMBOS } from "./bundles";

// "Buy 1, get 1 free" — every complete group of 2 eligible packs earns 1 free
// pack (the cheapest in that group). Stacks: 2 -> 1 free, 4 -> 2 free, 6 ->
// 3 free, ...
export const GROUP_SIZE = 2;

export type AppliedCombo = {
  routeSlug: string;
  label: string;
  slugs: readonly string[];
  discount: number;
};

export type CartPricing = {
  subtotal: number;
  discount: number;
  total: number;
  // Slugs of the packs that are free (empty if the cart doesn't qualify yet).
  freeSlugs: string[];
  // One entry per combo (see src/lib/bundles.ts) that's fully present in the
  // cart — those packs are priced at the combo's flat total instead of
  // individually. Usually empty or one entry, but a cart can hold more than
  // one completed combo at once.
  appliedCombos: AppliedCombo[];
};

export function getCartPricing(items: Product[]): CartPricing {
  const subtotal = items.reduce((sum, p) => sum + p.price, 0);
  const slugSet = new Set(items.map((p) => p.slug));

  const appliedCombos: AppliedCombo[] = [];
  const comboSlugSet = new Set<string>();
  for (const combo of COMBOS) {
    if (!combo.slugs.every((slug) => slugSet.has(slug))) continue;
    const comboItems = items.filter((p) => (combo.slugs as readonly string[]).includes(p.slug));
    const comboOriginalTotal = comboItems.reduce((sum, p) => sum + p.price, 0);
    appliedCombos.push({
      routeSlug: combo.routeSlug,
      label: combo.label,
      slugs: combo.slugs,
      discount: Math.max(0, comboOriginalTotal - combo.price),
    });
    combo.slugs.forEach((slug) => comboSlugSet.add(slug));
  }
  const comboDiscount = appliedCombos.reduce((sum, c) => sum + c.discount, 0);

  // Buy-2-get-1-free only ever applies to whatever's left outside any applied
  // combo, and combo packs can never be selected as the free item.
  const remaining = items.filter((p) => !comboSlugSet.has(p.slug));
  const freeCount = Math.floor(remaining.length / GROUP_SIZE);

  let freeSlugs: string[] = [];
  let promoDiscount = 0;
  if (freeCount > 0) {
    const cheapestFirst = [...remaining].sort((a, b) => a.price - b.price);
    const freeItems = cheapestFirst.slice(0, freeCount);
    promoDiscount = freeItems.reduce((sum, p) => sum + p.price, 0);
    freeSlugs = freeItems.map((p) => p.slug);
  }

  const discount = comboDiscount + promoDiscount;

  return {
    subtotal,
    discount,
    total: subtotal - discount,
    freeSlugs,
    appliedCombos,
  };
}
