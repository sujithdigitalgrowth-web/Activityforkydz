import type { Metadata } from "next";
import ComboProductPage from "@/components/ComboProductPage";
import { getComboByRouteSlug, getComboProducts } from "@/lib/bundles";

const combo = getComboByRouteSlug("learning-combo")!;
const comboProducts = getComboProducts(combo);
const originalTotal = comboProducts.reduce((sum, p) => sum + p.price, 0);

export const metadata: Metadata = {
  title: "Learning Pack Combo — All 9 Packs for ₹" + combo.price,
  description: `Get all 9 printable learning packs — Letters and Words, Numbers and Counting, ABC of Character, My First Alphabet Activity Book, My First Lines, Telling Time Patterns and Shapes, Cut Stick and Make, The Big Book of Comparisons, and Reading Comprehension Worksheets — for a flat ₹${combo.price} instead of ₹${originalTotal}. Instant PDF downloads.`,
  alternates: { canonical: "/products/learning-combo" },
};

export default function LearningComboPage() {
  return <ComboProductPage combo={combo} />;
}
