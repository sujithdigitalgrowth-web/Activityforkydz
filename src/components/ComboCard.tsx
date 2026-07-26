import Image from "next/image";
import Link from "next/link";
import { getColouringComboProducts, COLOURING_COMBO_PRICE } from "@/lib/bundles";

export default function ComboCard() {
  const products = getColouringComboProducts();
  const originalTotal = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <Link
      href="/products/colouring-combo"
      className="group flex flex-col rounded-xl sm:rounded-2xl border-2 border-orange-300 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative aspect-[3/2] w-full">
        <Image
          src="/categories/Combo%20Offer.png"
          alt="All 6 Colouring Packs combo — instant PDF download, print unlimited times"
          fill
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover"
        />
      </div>
      <div className="p-2.5 sm:p-4 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-sm sm:text-base text-zinc-900 leading-snug line-clamp-2">
          All 6 Colouring Packs
        </h3>
        <div className="flex items-center gap-2 mt-1.5 sm:mt-3">
          <span className="font-bold text-orange-600 text-sm sm:text-base">₹{COLOURING_COMBO_PRICE}</span>
          <span className="text-xs sm:text-sm text-zinc-400 line-through">₹{originalTotal}</span>
        </div>
        <p className="text-[10px] sm:text-xs text-emerald-700 font-semibold mt-1">
          Save ₹{originalTotal - COLOURING_COMBO_PRICE}
        </p>
      </div>
    </Link>
  );
}
