import type { Metadata } from "next";
import ComboProductPage from "@/components/ComboProductPage";
import { getComboByRouteSlug, getComboProducts } from "@/lib/bundles";

const combo = getComboByRouteSlug("learning-combo")!;
const comboProducts = getComboProducts(combo);
const originalTotal = comboProducts.reduce((sum, p) => sum + p.price, 0);

export const metadata: Metadata = {
  title: "Learning Pack Combo — All 6 Packs for ₹" + combo.price,
  description: `Get all 6 printable learning packs — Letters and Words, Numbers and Counting Mats, ABC of Character, My First Alphabet Activity Book, My First Lines, and Telling Time, Patterns and Shapes — for a flat ₹${combo.price} instead of ₹${originalTotal}. Instant PDF downloads.`,
  alternates: { canonical: "/products/learning-combo" },
};

export default function LearningComboPage() {
  return <ComboProductPage combo={combo} />;
}
