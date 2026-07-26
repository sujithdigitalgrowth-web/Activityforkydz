"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

const FILTERS = [
  { id: "all", label: "All Packs" },
  { id: "colouring", label: "Colouring Packs" },
  { id: "learning", label: "Learning Packs" },
] as const;

export default function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const visible = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              filter === f.id
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-zinc-700 border-orange-100 hover:border-orange-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
