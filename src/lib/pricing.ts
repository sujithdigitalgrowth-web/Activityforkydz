import type { Product } from "./products";

// "Buy 2, get 1 free" — stacks per complete group of 3 packs (3 -> 1 free,
// 6 -> 2 free, 9 -> 3 free, ...). Within each group the cheapest pack is
// the one comped.
const GROUP_SIZE = 3;

export type CartPricing = {
  subtotal: number;
  discount: number;
  total: number;
  // Slugs of the packs that are free (empty if the cart doesn't qualify yet).
  freeSlugs: string[];
};

export function getCartPricing(items: Product[]): CartPricing {
  const subtotal = items.reduce((sum, p) => sum + p.price, 0);
  const freeCount = Math.floor(items.length / GROUP_SIZE);

  if (freeCount === 0) {
    return { subtotal, discount: 0, total: subtotal, freeSlugs: [] };
  }

  const cheapestFirst = [...items].sort((a, b) => a.price - b.price);
  const freeItems = cheapestFirst.slice(0, freeCount);
  const discount = freeItems.reduce((sum, p) => sum + p.price, 0);

  return {
    subtotal,
    discount,
    total: subtotal - discount,
    freeSlugs: freeItems.map((p) => p.slug),
  };
}
