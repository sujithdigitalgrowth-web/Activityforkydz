"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductVisual from "./ProductVisual";
import AddToCartButton from "./AddToCartButton";

// Cap the add-on rail so it stays a quick scan, not another product grid to shop.
const MAX_ADD_ONS = 6;

export default function CartAddOns() {
  const { slugs } = useCart();
  const cartProducts = products.filter((p) => slugs.includes(p.slug));
  const hasColouring = cartProducts.some((p) => p.category === "colouring");
  const hasLearning = cartProducts.some((p) => p.category === "learning");

  const available = products.filter((p) => !p.comingSoon && !slugs.includes(p.slug));

  // If the cart is exclusively one category, lead with the other category's
  // packs and swap in a cross-sell prompt — otherwise keep the generic rail.
  let heading = "Add a pack while you're here";
  let subheading = "Delivered instantly alongside the rest of your order.";
  let addOns = available;

  if (hasColouring && !hasLearning) {
    const learningFirst = available.filter((p) => p.category === "learning");
    if (learningFirst.length > 0) {
      heading = "Add a learning pack with your colouring pack";
      subheading = "A few tracing and letters worksheets pair nicely with the coloring.";
      addOns = [...learningFirst, ...available.filter((p) => p.category !== "learning")];
    }
  } else if (hasLearning && !hasColouring) {
    const colouringFirst = available.filter((p) => p.category === "colouring");
    if (colouringFirst.length > 0) {
      heading = "Add a colouring pack with your learning pack";
      subheading = "A coloring break goes nicely alongside the practice sheets.";
      addOns = [...colouringFirst, ...available.filter((p) => p.category !== "colouring")];
    }
  }

  addOns = addOns.slice(0, MAX_ADD_ONS);

  if (addOns.length === 0) return null;

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4 sm:p-5">
      <h2 className="font-heading font-semibold text-zinc-900">{heading}</h2>
      <p className="text-sm text-zinc-500 mt-0.5 mb-4">{subheading}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
        {addOns.map((product) => (
          <div
            key={product.slug}
            className="rounded-lg border border-orange-100 overflow-hidden flex flex-col"
          >
            <Link href={`/products/${product.slug}`} className="block">
              <ProductVisual
                product={product}
                className="aspect-[3/2] w-full"
                emojiClassName="text-2xl"
              />
            </Link>
            <div className="p-1.5 sm:p-2 flex flex-col flex-1">
              <Link href={`/products/${product.slug}`}>
                <p className="text-[11px] sm:text-xs font-semibold text-zinc-900 leading-snug line-clamp-2 min-h-[1.9em]">
                  {product.cardTitle ?? product.title}
                </p>
              </Link>
              <p className="font-bold text-orange-600 text-xs sm:text-sm mt-0.5">₹{product.price}</p>
              <AddToCartButton
                product={product}
                compact
                className="w-full mt-1.5 px-1 py-1 text-[10px] sm:text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
