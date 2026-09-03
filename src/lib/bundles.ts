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
  // One short punchy line under the H1 — the pitch, not an inventory.
  hook: string;
  // Scannable bullet points under the hook (rendered with checkmarks) —
  // parents skim, they don't read a paragraph, so this replaces what used
  // to be a single dense blurb. Keep each line short — one benefit each.
  highlights: string[];
};

// The colouring combo: every colouring pack at a flat bundle price instead
// of their individual total. getCartPricing() applies this automatically
// whenever a cart contains all of these slugs — the dedicated combo page
// just adds all of them at once for convenience, it isn't a separate line
// item. Keep this in sync with every product in products.ts that has
// category: "colouring".
export const COLOURING_COMBO_SLUGS = [
  "animal-friends",
  "alphabet-adventures",
  "birds-of-the-world",
  "oceans-and-sea-life",
  "fruits-and-vegetables",
  "trees-and-plants",
  "flowers-colouring",
] as const;

export const COLOURING_COMBO_PRICE = 399;

// The learning combo: every learning/activity pack at a flat bundle price.
// Same mechanics as the colouring combo above — getCartPricing() applies it
// automatically once a cart holds all of these slugs. Keep this in sync
// with every product in products.ts that has category: "learning".
export const LEARNING_COMBO_SLUGS = [
  "letters-and-words",
  "numbers-and-counting-mats",
  "abc-of-character",
  "atoz-activity",
  "my-first-lines",
  "time-patterns-and-shapes",
  "cut-stick-and-make",
  "big-book-of-comparisons",
  "reading-comprehension",
  "cut-and-paste-alphabet",
  "daily-practice-bundle",
  "shapes-activity-book",
  "a-hundred-mazes",
  "one-right-answer",
  "wait-what-animal-facts",
] as const;

export const LEARNING_COMBO_PRICE = 399;

// The everything combo: the full catalog (every colouring + every learning
// pack) at one flat price. Deliberately just the union of the two combos
// above, not a hand-picked list — keep it in sync the same way. Because its
// slug set is a superset of both other combos, getCartPricing() has
// overlap-aware logic (largest combo first, skip any combo whose slugs are
// already claimed) so a cart with everything in it is priced once at ₹499,
// not stacked with the Colouring and Learning combo discounts too.
export const EVERYTHING_COMBO_SLUGS = [
  ...COLOURING_COMBO_SLUGS,
  ...LEARNING_COMBO_SLUGS,
] as const;

export const EVERYTHING_COMBO_PRICE = 499;

export const COMBOS: ComboDef[] = [
  {
    routeSlug: "everything-combo",
    label: "Get Everything",
    fullLabel: "The Everything Combo — Every Pack We Make",
    slugs: EVERYTHING_COMBO_SLUGS,
    price: EVERYTHING_COMBO_PRICE,
    image: "/categories/Get%20Everything.png",
    accent: "from-fuchsia-100 to-purple-50",
    emoji: "🎁",
    borderClass: "border-fuchsia-300",
    hook: "Stop picking and choosing. Get the whole library, once.",
    highlights: [
      "Every pack we make — all colouring, all learning, nothing held back",
      "From a toddler's first pencil line to sudoku and logic puzzles",
      "Covers every age and stage, so you never have to guess what to buy next",
      "One payment, one email, print unlimited times, forever",
    ],
  },
  {
    routeSlug: "colouring-combo",
    label: "All Colouring Packs",
    fullLabel: "The Complete Colouring Pack Combo",
    slugs: COLOURING_COMBO_SLUGS,
    price: COLOURING_COMBO_PRICE,
    image: "/categories/Animal%20Colouring%20Combo.png",
    accent: "from-orange-100 to-amber-50",
    emoji: "🎨",
    borderClass: "border-orange-300",
    hook: "Every colouring pack we make, for one flat price.",
    highlights: [
      "7 themed worlds — animals, birds, oceans, fruits, trees and 104 real flowers",
      "Thick, crayon-proof outlines built for small hands",
      "Every picture labelled with its real name — colouring doubles as vocabulary",
      "Instant download, print unlimited times, forever",
    ],
  },
  {
    routeSlug: "learning-combo",
    label: "All Learning Packs",
    fullLabel: "The Complete Learning Pack Combo",
    slugs: LEARNING_COMBO_SLUGS,
    price: LEARNING_COMBO_PRICE,
    image: "/categories/Learnign%20Pack%20Combo.png",
    accent: "from-teal-100 to-cyan-50",
    emoji: "🧠",
    borderClass: "border-teal-300",
    hook: "Every learning pack we make, from first pencil strokes to real problem-solving.",
    highlights: [
      "15 packs — alphabet, numbers, shapes, cutting, mazes, sudoku, reading and more",
      "Matched to what nursery, LKG and UKG classrooms actually teach",
      "Full answer keys included wherever a pack has one",
      "Instant download, print unlimited times, forever",
    ],
  },
];

export function getComboProducts(combo: ComboDef): Product[] {
  return combo.slugs.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is Product => Boolean(p)
  );
}

// A percentage reads as a clear win at a glance ("Save 55%") without making
// the shopper do rupee math against the struck-through total — used instead
// of a raw ₹ discount everywhere a combo's savings are shown.
export function getComboDiscountPercent(combo: ComboDef): number {
  const originalTotal = getComboProducts(combo).reduce((sum, p) => sum + p.price, 0);
  if (originalTotal <= 0) return 0;
  return Math.round(((originalTotal - combo.price) / originalTotal) * 100);
}

export function getComboByRouteSlug(routeSlug: string): ComboDef | undefined {
  return COMBOS.find((c) => c.routeSlug === routeSlug);
}
