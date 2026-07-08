import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductVisual from "./ProductVisual";

export default function CategoryNav({ products }: { products: Product[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="group shrink-0 w-32 sm:w-36 flex flex-col rounded-xl border border-orange-100 bg-white overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <ProductVisual
            product={product}
            className="aspect-square w-full"
            emojiClassName="text-5xl"
          />
          <span className="px-2 py-2 text-xs font-semibold text-zinc-700 text-center group-hover:text-orange-700 transition-colors">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </span>
        </Link>
      ))}
    </div>
  );
}
