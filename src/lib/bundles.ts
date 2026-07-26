import { products, type Product } from "./products";

// The colouring combo: all 6 colouring packs at a flat bundle price instead
// of their individual total. getCartPricing() applies this automatically
// whenever a cart contains all of these slugs — the dedicated combo page
// just adds all six at once for convenience, it isn't a separate line item.
export const COLOURING_COMBO_SLUGS = [
  "animal-friends",
  "alphabet-adventures",
  "birds-of-the-world",
  "oceans-and-sea-life",
  "fruits-and-vegetables",
  "trees-and-plants",
] as const;

export const COLOURING_COMBO_PRICE = 340;

export function getColouringComboProducts(): Product[] {
  return COLOURING_COMBO_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is Product => Boolean(p)
  );
}
