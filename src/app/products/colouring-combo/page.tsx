import type { Metadata } from "next";
import ComboProductPage from "@/components/ComboProductPage";
import { getComboByRouteSlug, getComboProducts } from "@/lib/bundles";

const combo = getComboByRouteSlug("colouring-combo")!;
const comboProducts = getComboProducts(combo);
const originalTotal = comboProducts.reduce((sum, p) => sum + p.price, 0);

const comboTitle = `Colouring Pack Combo — All ${comboProducts.length} Packs for ₹${combo.price}`;
const comboDescription = `Animals, birds, oceans, fruits, trees and 104 real flowers — ${comboProducts.length} printable colouring packs with a name label on every page, for a flat ₹${combo.price} instead of ₹${originalTotal}. Instant PDF download, print unlimited times.`;

export const metadata: Metadata = {
  title: comboTitle,
  description: comboDescription,
  alternates: { canonical: "/products/colouring-combo" },
  openGraph: {
    title: comboTitle,
    description: comboDescription,
    url: "/products/colouring-combo",
    type: "website",
  },
};

export default function ColouringComboPage() {
  return <ComboProductPage combo={combo} />;
}
