import { products, type Product } from "./products";

export type ComboDef = {
  // Route slug — the combo's product page lives at /products/<routeSlug>.
  routeSlug: string;
  // Short label for cards and price breakdown lines, e.g. "All 6 Colouring Packs".
  label: string;
  // Full sentence label for the combo product page H1.
  fullLabel: string;
  slugs: readonly string[];
  price: number;
  // Cover image for the combo card — drop a file at this path whenever it's ready.
  // Until then, ComboCard falls back to the accent + emoji tile, same as a
  // regular product with no cover photo yet.
  image: string;
  accent: string; // tailwind gradient pair for the fallback tile
  emoji: string;
  borderClass: string; // tailwind border color for the card/page accent
};

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

// The learning combo: all 6 learning/activity packs at a flat bundle price.
// Same mechanics as the colouring combo above — getCartPricing() applies it
// automatically once a cart holds all 6 of these slugs.
export const LEARNING_COMBO_SLUGS = [
  "letters-and-words",
  "numbers-and-counting-mats",
  "abc-of-character",
  "atoz-activity",
  "my-first-lines",
  "time-patterns-and-shapes",
] as const;

export const LEARNING_COMBO_PRICE = 340;

export const COMBOS: ComboDef[] = [
  {
    routeSlug: "colouring-combo",
    label: "All 6 Colouring Packs",
    fullLabel: "The Complete Colouring Pack Combo",
    slugs: COLOURING_COMBO_SLUGS,
    price: COLOURING_COMBO_PRICE,
    image: "/categories/Combo%20Offer.png",
    accent: "from-orange-100 to-amber-50",
    emoji: "🎨",
    borderClass: "border-orange-300",
  },
  {
    routeSlug: "learning-combo",
    label: "All 6 Learning Packs",
    fullLabel: "The Complete Learning Pack Combo",
    slugs: LEARNING_COMBO_SLUGS,
    price: LEARNING_COMBO_PRICE,
    image: "/categories/Learning%20Pack%20Combo%20Offer.png",
    accent: "from-teal-100 to-cyan-50",
    emoji: "🧠",
    borderClass: "border-teal-300",
  },
];

export function getComboProducts(combo: ComboDef): Product[] {
  return combo.slugs.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is Product => Boolean(p)
  );
}

export function getComboByRouteSlug(routeSlug: string): ComboDef | undefined {
  return COMBOS.find((c) => c.routeSlug === routeSlug);
}
