import type { Metadata } from "next";
import ComboProductPage from "@/components/ComboProductPage";
import { getComboByRouteSlug, getComboProducts } from "@/lib/bundles";

const combo = getComboByRouteSlug("colouring-combo")!;
const comboProducts = getComboProducts(combo);
const originalTotal = comboProducts.reduce((sum, p) => sum + p.price, 0);

export const metadata: Metadata = {
  title: "Colouring Pack Combo — All 6 Packs for ₹" + combo.price,
  description: `Get all 6 printable colouring packs — Animal Friends, Alphabet Adventures, Birds of the World, Oceans & Sea Life, Fruits, and Trees & Plants — for a flat ₹${combo.price} instead of ₹${originalTotal}. Instant PDF downloads.`,
  alternates: { canonical: "/products/colouring-combo" },
};

export default function ColouringComboPage() {
  return <ComboProductPage combo={combo} />;
}
