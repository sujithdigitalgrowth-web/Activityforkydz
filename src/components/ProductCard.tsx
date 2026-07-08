import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import SocialProof from "./SocialProof";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-orange-100 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1">
        <ProductVisual
          product={product}
          className="aspect-[4/3] w-full"
          emojiClassName="text-7xl"
        />
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-heading font-semibold text-zinc-900 leading-snug line-clamp-2 min-h-[2.75rem]">
            {product.title}
          </h3>
          <p className="text-sm text-zinc-600 mt-1 line-clamp-2 min-h-[2.5rem]">
            {product.tagline}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-orange-600">₹{product.price}</span>
            <span className="text-xs text-zinc-500">{product.pageCount} pages</span>
          </div>
          <div className="mt-2">
            <SocialProof product={product} />
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <AddToCartButton product={product} className="w-full py-2.5 text-sm" />
      </div>
    </div>
  );
}
