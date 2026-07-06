import Link from "next/link";
import type { Product } from "@/lib/products";

export default function CategoryNav({ products }: { products: Product[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="shrink-0 flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-orange-300 hover:text-orange-700 transition-colors"
        >
          <span>{product.emoji}</span>
          {product.title.split(" ").slice(0, 2).join(" ")}
        </Link>
      ))}
    </div>
  );
}
