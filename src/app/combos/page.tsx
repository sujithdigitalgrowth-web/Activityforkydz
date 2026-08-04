import type { Metadata } from "next";
import ComboCard from "@/components/ComboCard";
import { COMBOS } from "@/lib/bundles";

export const metadata: Metadata = {
  title: "Combo Deals — Bundle & Save | activityforKydz",
  description:
    "Bundle printable activity packs together and pay less than buying them one by one. All 6 colouring packs or all 6 learning packs, each for one flat price.",
  alternates: { canonical: "/combos" },
};

export default function CombosPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <h1 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">Combo deals</h1>
      <p className="text-zinc-600 mb-6">
        Bundle a few packs together and pay less than buying them one by one.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
        {COMBOS.map((combo) => (
          <ComboCard key={combo.routeSlug} combo={combo} />
        ))}
      </div>
    </div>
  );
}
