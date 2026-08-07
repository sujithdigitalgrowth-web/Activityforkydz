// Helpers specific to the product detail page template (breadcrumb category,
// at-a-glance school stage, "what your child will practise", and related-
// product logic). Kept separate from products.ts so that file stays pure data.
import { products, type Product } from "./products";
import { COMBOS, type ComboDef } from "./bundles";

export function parseAgeRange(ageRange: string): [number, number] {
  const match = ageRange.match(/(\d+)\s*-\s*(\d+)/);
  if (!match) {
    const single = parseInt(ageRange, 10);
    return [single, single];
  }
  return [parseInt(match[1], 10), parseInt(match[2], 10)];
}

// Breadcrumb / "browse more" category for each live product. Products with
// category: "colouring" all map to the colouring hub. Products with
// category: "learning" are split further into the more specific alphabet or
// tracing hub where that's genuinely the product's core subject (matching
// how each product was actually grouped when /alphabet-worksheets and
// /tracing-worksheets were built) — everything else falls back to the
// general learning-worksheets hub. This is a deliberate per-product mapping,
// not a mechanical derivation, since "primary subject" isn't a field in
// products.ts.
type CategoryPage = { label: string; href: string };

const CATEGORY_PAGES = {
  colouring: { label: "Colouring Packs", href: "/coloring-packs" },
  alphabet: { label: "Alphabet Worksheets", href: "/alphabet-worksheets" },
  tracing: { label: "Tracing Worksheets", href: "/tracing-worksheets" },
  learning: { label: "Learning Worksheets", href: "/learning-worksheets" },
} as const satisfies Record<string, CategoryPage>;

const PRODUCT_CATEGORY_PAGE: Record<string, keyof typeof CATEGORY_PAGES> = {
  "animal-friends": "colouring",
  "alphabet-adventures": "colouring",
  "birds-of-the-world": "colouring",
  "oceans-and-sea-life": "colouring",
  "fruits-and-vegetables": "colouring",
  "trees-and-plants": "colouring",
  "flowers-colouring": "colouring",
  "letters-and-words": "alphabet",
  "abc-of-character": "alphabet",
  "atoz-activity": "alphabet",
  "my-first-lines": "tracing",
  "numbers-and-counting-mats": "learning",
  "time-patterns-and-shapes": "learning",
  "cut-stick-and-make": "learning",
  "big-book-of-comparisons": "learning",
  "reading-comprehension": "learning",
};

export function getCategoryPage(slug: string): CategoryPage {
  const key = PRODUCT_CATEGORY_PAGE[slug] ?? "learning";
  return CATEGORY_PAGES[key];
}

// School stage, derived formulaically from ageRange using the same
// nursery/LKG/UKG age bands used throughout the site's category pages
// (Nursery ~3-4, LKG ~4-5, UKG ~5-6, Primary 7+), not hand-written per
// product. A product's stage label spans from the stage of its minimum age
// to the stage of its maximum age.
function stageForAge(age: number): string {
  if (age <= 2) return "Pre-nursery";
  if (age === 3) return "Nursery";
  if (age === 4) return "LKG";
  if (age <= 6) return "UKG";
  return "Primary";
}

export function schoolStageLabel(ageRange: string): string {
  const [min, max] = parseAgeRange(ageRange);
  const from = stageForAge(min);
  const to = stageForAge(max);
  return from === to ? from : `${from} to ${to}`;
}

// "What your child will practise" — 3-5 bullets per product, written from
// each product's own whatsInside/whyItMatters/description content, not a
// generic list reused across every page.
export const PRACTISE_BY_SLUG: Record<string, string[]> = {
  "animal-friends": [
    "Colouring within lines and pencil control",
    "Animal names and habitats (vocabulary)",
    "Reading a short fact aloud together",
    "Recognising and naming 50+ animals",
  ],
  "alphabet-adventures": [
    "Letter recognition, A to Z",
    "Connecting a letter to its sound and a picture",
    "Letter tracing and early pencil control",
    "Spotting a target letter on the page",
  ],
  "birds-of-the-world": [
    "Colouring with attention to detail",
    "Bird names in English (vocabulary)",
    "Patience with a more detailed picture",
    "Talking about habitats and nature",
  ],
  "oceans-and-sea-life": [
    "Colouring within lines",
    "Sea creature names (vocabulary)",
    "Ocean habitats and wildlife",
    "Working on one big collaborative scene",
  ],
  "fruits-and-vegetables": [
    "Colouring and pencil control",
    "Fruit names (vocabulary)",
    "Matching a fruit to its tree",
    "Talking about healthy snacking",
  ],
  "trees-and-plants": [
    "Colouring within lines",
    "Plant and tree names (vocabulary)",
    "How a seed grows into a tree, in sequence",
    "Quiet, focused table time",
  ],
  "flowers-colouring": [
    "Colouring with attention to detail",
    "Flower names — common, local and Latin",
    "Matching colours to a real-colours reference",
    "Sustained focus across a long-format book",
  ],
  "letters-and-words": [
    "Letter recognition and formation",
    "Reading short two and three letter words",
    "Identifying first sounds",
    "Letter hunts and colour-by-letter play",
    "Writing their own name",
  ],
  "numbers-and-counting-mats": [
    "Number tracing, 0 to 20",
    "Counting real quantities, not just reciting",
    "Ten frames",
    "First sums",
    "Skip counting",
  ],
  "abc-of-character": [
    "Letter recognition, A to Z",
    "Independent colouring",
    "Talking about values like kindness and honesty",
  ],
  "atoz-activity": [
    "Letter recognition, upper and lowercase",
    "Letter tracing",
    "Picture matching",
    "Maze and find-it activities",
    "Letter sounds",
  ],
  "my-first-lines": [
    "Pencil control and grip",
    "Tracing straight and curved lines",
    "Focus in short bursts",
    "Pre-writing readiness, before letters",
  ],
  "time-patterns-and-shapes": [
    "Telling the time, from o'clock to minutes past/to",
    "Spotting and continuing patterns",
    "Naming flat and solid shapes",
    "Crossword vocabulary practice",
  ],
  "cut-stick-and-make": [
    "Scissor control with big, easy-to-grip pieces",
    "Glue-stick coordination",
    "Matching shapes and counting",
    "Following a build-it-in-order activity",
  ],
  "big-book-of-comparisons": [
    "Comparing size, height and weight",
    "Matching and sorting",
    "Spotting same and different",
    "Reasoning through a \"how do you know?\" question",
  ],
  "reading-comprehension": [
    "Reading short, simple sentences",
    "Tracing a topic word",
    "Answering multiple-choice comprehension questions",
    "Building reading confidence through repetition",
  ],
};

// Deterministic "You might also like": two products from the same primary
// category (closest age-range overlap first), then one "next step" product
// — the closest live product whose age range starts at or after this one's
// maximum age — then the combo this product is actually bundled into, if
// any. Only live products; nothing hand-curated or random.
export function getRelatedProducts(product: Product): {
  related: Product[];
  combo?: ComboDef;
} {
  const category = PRODUCT_CATEGORY_PAGE[product.slug] ?? "learning";
  const [, maxAge] = parseAgeRange(product.ageRange);

  function ageOverlap(other: Product): number {
    const [oMin, oMax] = parseAgeRange(other.ageRange);
    const [min, max] = parseAgeRange(product.ageRange);
    return Math.max(0, Math.min(max, oMax) - Math.max(min, oMin));
  }

  const sameCategory = products
    .filter((p) => p.slug !== product.slug && (PRODUCT_CATEGORY_PAGE[p.slug] ?? "learning") === category)
    .sort((a, b) => ageOverlap(b) - ageOverlap(a))
    .slice(0, 2);

  const usedSlugs = new Set([product.slug, ...sameCategory.map((p) => p.slug)]);

  const nextStep = products
    .filter((p) => !usedSlugs.has(p.slug))
    .map((p) => ({ product: p, gap: parseAgeRange(p.ageRange)[0] - maxAge }))
    .filter((x) => x.gap >= 0)
    .sort((a, b) => a.gap - b.gap)[0]?.product;

  const related = nextStep ? [...sameCategory, nextStep] : sameCategory;
  const combo = COMBOS.find((c) => c.slugs.includes(product.slug));

  return { related, combo };
}
