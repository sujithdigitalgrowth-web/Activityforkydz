"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getComboProducts, type ComboDef } from "@/lib/bundles";

export default function ComboCard({ combo }: { combo: ComboDef }) {
  const [imageFailed, setImageFailed] = useState(false);
  const products = getComboProducts(combo);
  const originalTotal = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <Link
      href={`/products/${combo.routeSlug}`}
      className={`group flex flex-col rounded-xl sm:rounded-2xl border-2 ${combo.borderClass} bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all`}
    >
      <div
        className={`relative aspect-[3/2] w-full bg-gradient-to-br ${combo.accent} flex items-center justify-center`}
      >
        <span className="text-4xl">{combo.emoji}</span>
        {!imageFailed && (
          <Image
            src={combo.image}
            alt={`${combo.label} — instant PDF download, print unlimited times`}
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className="p-2.5 sm:p-4 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-sm sm:text-base text-zinc-900 leading-snug line-clamp-2">
          {combo.label}
        </h3>
        <div className="flex items-center gap-2 mt-1.5 sm:mt-3">
          <span className="font-bold text-orange-600 text-sm sm:text-base">₹{combo.price}</span>
          <span className="text-xs sm:text-sm text-zinc-400 line-through">₹{originalTotal}</span>
        </div>
        <p className="text-[10px] sm:text-xs text-emerald-700 font-semibold mt-1">
          Save ₹{originalTotal - combo.price}
        </p>
      </div>
    </Link>
  );
}
