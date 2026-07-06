import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import SocialProof from "./SocialProof";

export default function BestSellers({ products }: { products: Product[] }) {
  return (
    <div className="grid sm:grid-cols-3 gap-5 items-stretch">
      {products.map((product, i) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="group relative flex flex-col rounded-2xl border border-orange-100 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="absolute top-3 left-3 z-10 rounded-full bg-zinc-900 text-white text-xs font-bold px-2.5 py-1">
            #{i + 1} best seller
          </span>
          <ProductVisual product={product} className="h-32 w-full" emojiClassName="text-6xl" />
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
      ))}
    </div>
  );
}
