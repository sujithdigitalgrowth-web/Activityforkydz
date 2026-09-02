import type { Metadata } from "next";
import ComboProductPage from "@/components/ComboProductPage";
import { getComboByRouteSlug, getComboProducts } from "@/lib/bundles";

const combo = getComboByRouteSlug("everything-combo")!;
const comboProducts = getComboProducts(combo);
const originalTotal = comboProducts.reduce((sum, p) => sum + p.price, 0);

const comboTitle = `The Everything Combo — All ${comboProducts.length} Packs for ₹${combo.price}`;
const comboDescription = `The whole activityforKydz library in one download — every colouring pack and every learning pack we make, ${comboProducts.length} packs in total, for a flat ₹${combo.price} instead of ₹${originalTotal} bought separately. Instant PDF downloads.`;

export const metadata: Metadata = {
  title: comboTitle,
  description: comboDescription,
  alternates: { canonical: "/products/everything-combo" },
  openGraph: {
    title: comboTitle,
    description: comboDescription,
    url: "/products/everything-combo",
    type: "website",
  },
};

export default function EverythingComboPage() {
  return <ComboProductPage combo={combo} />;
}
