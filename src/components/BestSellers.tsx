import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import SocialProof from "./SocialProof";
import AddToCartButton from "./AddToCartButton";

export default function BestSellers({
  products,
  rankedCount = products.length,
}: {
  products: Product[];
  // Only the first `rankedCount` products are genuine top sellers by
  // purchase count — anything after that (e.g. a newly launched pack
  // pinned onto the end) gets a "New" badge instead of a fake rank.
  rankedCount?: number;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 items-stretch">
      {products.map((product, i) => (
        <div
          key={product.slug}
          className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-orange-100 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="absolute top-2 left-2 z-10 rounded-full bg-zinc-900 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1">
            {i < rankedCount ? `#${i + 1} best seller` : "New"}
          </span>
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
      ))}
    </div>
  );
}
