import type { Metadata } from "next";
import ComboCard from "@/components/ComboCard";
import { COMBOS } from "@/lib/bundles";

export const metadata: Metadata = {
  title: "Kids Activity Pack Combos — Get Everything for ₹499",
  description:
    "Bundle printable activity packs together and pay less than buying them one by one. All colouring packs, all learning packs, or get every pack we make for one flat ₹499.",
  alternates: { canonical: "/combos" },
  openGraph: {
    title: "Kids Activity Pack Combos — Get Everything for ₹499",
    description:
      "Bundle printable activity packs together and pay less than buying them one by one. All colouring packs, all learning packs, or get every pack we make for one flat ₹499.",
    url: "/combos",
    type: "website",
  },
};

export default function CombosPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <h1 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">Activity Pack Combos</h1>
      <p className="text-sm text-zinc-600 mb-6">3 flat prices · instant PDF · print unlimited times</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
        {COMBOS.map((combo) => (
          <ComboCard key={combo.routeSlug} combo={combo} />
        ))}
      </div>
    </div>
  );
}
