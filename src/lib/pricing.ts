import type { Product } from "./products";
import { COLOURING_COMBO_SLUGS, COLOURING_COMBO_PRICE } from "./bundles";

// "Buy 3, get 1 free" — every complete group of 4 eligible packs earns 1 free
// pack (the cheapest in that group). Stacks: 4 -> 1 free, 8 -> 2 free, 12 ->
// 3 free, ... Replaces the old "buy 2, get 1 free" (which used groups of 3).
export const GROUP_SIZE = 4;

// Once the colouring combo is active, it already got its own fixed-price
// discount and can never contribute or receive a free item — so anything
// bought alongside it stacks for free items on its own, in groups of 3
// (3 -> 1 free, 6 -> 2 free, ...). This is what actually reproduces the
// combo's worked examples: combo + 1 or 2 extra packs gets no free item,
// combo + 3 gets exactly one. A literal "combo counts as 3, so 4 total
// eligible packs = 1 free" reading would incorrectly free an item as soon
// as a single pack joins the combo, which the spec explicitly rules out.
export const COMBO_ADJACENT_GROUP_SIZE = 3;

export type CartPricing = {
  subtotal: number;
  discount: number;
  total: number;
  // Slugs of the packs that are free (empty if the cart doesn't qualify yet).
  freeSlugs: string[];
  // True once the cart holds all 6 colouring combo packs — they're then
  // priced as the flat combo total instead of individually.
  comboApplied: boolean;
  comboDiscount: number;
};

export function getCartPricing(items: Product[]): CartPricing {
  const subtotal = items.reduce((sum, p) => sum + p.price, 0);

  const slugSet = new Set(items.map((p) => p.slug));
  const comboApplied = COLOURING_COMBO_SLUGS.every((slug) => slugSet.has(slug));

  const comboSlugSet = new Set<string>(COLOURING_COMBO_SLUGS);
  const comboItems = comboApplied ? items.filter((p) => comboSlugSet.has(p.slug)) : [];
  const comboOriginalTotal = comboItems.reduce((sum, p) => sum + p.price, 0);
  const comboDiscount = comboApplied ? Math.max(0, comboOriginalTotal - COLOURING_COMBO_PRICE) : 0;

  // Buy-3-get-1-free only ever applies to whatever's left outside the combo,
  // and the combo's own packs can never be selected as the free item.
  const remaining = comboApplied ? items.filter((p) => !comboSlugSet.has(p.slug)) : items;
  const groupSize = comboApplied ? COMBO_ADJACENT_GROUP_SIZE : GROUP_SIZE;
  const freeCount = Math.floor(remaining.length / groupSize);

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
    comboApplied,
    comboDiscount,
  };
}
