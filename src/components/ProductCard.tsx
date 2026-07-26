import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import SocialProof from "./SocialProof";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col rounded-xl sm:rounded-2xl border border-orange-100 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1">
        <ProductVisual
          product={product}
          className="aspect-[3/2] w-full"
          emojiClassName="text-5xl sm:text-7xl"
        />
        <div className="p-2.5 sm:p-4 flex flex-col flex-1">
          <h3 className="font-heading font-semibold text-sm sm:text-base text-zinc-900 leading-snug line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mt-1.5 sm:mt-3">
            <span className="font-bold text-orange-600 text-sm sm:text-base">₹{product.price}</span>
            <span className="text-[10px] sm:text-xs text-zinc-500">{product.pageCount} pages</span>
          </div>
          <div className="mt-1 sm:mt-2">
            <SocialProof product={product} compact />
          </div>
        </div>
      </Link>
      <div className="px-2.5 pb-2.5 sm:px-4 sm:pb-4">
        <AddToCartButton product={product} className="w-full py-2 text-xs sm:py-2.5 sm:text-sm" />
      </div>
    </div>
  );
}
