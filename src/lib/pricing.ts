import type { Product } from "./products";

// "Buy 2, get 1 free" — once the cart holds 3 or more packs, the single
// cheapest one is comped automatically. Doesn't stack (a cart of 6 still
// only gets one pack free, not two) — simplest version of the promo.
const FREE_ITEM_MIN_COUNT = 3;

export type CartPricing = {
  subtotal: number;
  discount: number;
  total: number;
  // Slug of the pack that's free, or null if the cart doesn't qualify yet.
  freeSlug: string | null;
};

export function getCartPricing(items: Product[]): CartPricing {
  const subtotal = items.reduce((sum, p) => sum + p.price, 0);

  if (items.length < FREE_ITEM_MIN_COUNT) {
    return { subtotal, discount: 0, total: subtotal, freeSlug: null };
  }

  const cheapest = items.reduce((min, p) => (p.price < min.price ? p : min), items[0]);
  return {
    subtotal,
    discount: cheapest.price,
    total: subtotal - cheapest.price,
    freeSlug: cheapest.slug,
  };
}
