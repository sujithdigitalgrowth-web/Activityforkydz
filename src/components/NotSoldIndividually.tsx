import Link from "next/link";
import type { Product } from "@/lib/products";
import { getComboByRouteSlug } from "@/lib/bundles";

// Individual packs aren't purchasable right now — the store sells only the
// 3 combos. Swapped in for BuyBox on the product page so a visitor who
// lands here still has a clear, priced way to buy this exact pack.
export default function NotSoldIndividually({ product }: { product: Product }) {
  const specificCombo = getComboByRouteSlug(
    product.category === "colouring" ? "colouring-combo" : "learning-combo"
  );
  const everythingCombo = getComboByRouteSlug("everything-combo");

  return (
    <div className="h-full flex flex-col justify-between rounded-2xl bg-white border border-orange-100 shadow-sm p-5">
      <div>
        <p className="text-sm font-semibold text-zinc-900">Not sold individually</p>
        <p className="text-sm text-zinc-500 mt-1">
          This pack is only available as part of a combo bundle.
        </p>

        <div className="mt-5 space-y-2">
          {specificCombo && (
            <Link
              href={`/products/${specificCombo.routeSlug}`}
              className="block w-full text-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-colors"
            >
              Get {specificCombo.label} — ₹{specificCombo.price}
            </Link>
          )}
          {everythingCombo && (
            <Link
              href={`/products/${everythingCombo.routeSlug}`}
              className="block w-full text-center rounded-full border border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold py-3 transition-colors"
            >
              Or get everything — ₹{everythingCombo.price}
            </Link>
          )}
        </div>
      </div>
      <p className="text-xs text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
        Every combo includes this pack, delivered instantly by email.
      </p>
    </div>
  );
}
