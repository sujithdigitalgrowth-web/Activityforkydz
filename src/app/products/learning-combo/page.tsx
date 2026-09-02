import type { Metadata } from "next";
import ComboProductPage from "@/components/ComboProductPage";
import { getComboByRouteSlug, getComboProducts } from "@/lib/bundles";

const combo = getComboByRouteSlug("learning-combo")!;
const comboProducts = getComboProducts(combo);
const originalTotal = comboProducts.reduce((sum, p) => sum + p.price, 0);

const comboTitle = `Learning Pack Combo — All ${comboProducts.length} Packs for ₹${combo.price}`;
const comboDescription = `First pencil strokes to real problem-solving — ${comboProducts.length} printable learning packs covering the alphabet, numbers, shapes, cutting, mazes, sudoku and reading, for a flat ₹${combo.price} instead of ₹${originalTotal}. Instant PDF download.`;

export const metadata: Metadata = {
  title: comboTitle,
  description: comboDescription,
  alternates: { canonical: "/products/learning-combo" },
  openGraph: {
    title: comboTitle,
    description: comboDescription,
    url: "/products/learning-combo",
    type: "website",
  },
};

export default function LearningComboPage() {
  return <ComboProductPage combo={combo} />;
}
