import type { Product } from "@/lib/products";

function Stars({ rating }: { rating: number }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className="relative inline-block text-sm leading-none shrink-0" aria-hidden="true">
      <span className="text-zinc-300">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden text-amber-500"
        style={{ width: `${pct}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

export default function SocialProof({
  product,
  compact = false,
}: {
  product: Product;
  // Tighter layout for dense grid cards: drops the "+ bought" count so the
  // line never wraps inside a narrow 2-column card.
  compact?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs"
      aria-label={`Rated ${product.rating} out of 5, ${product.purchaseCount.toLocaleString("en-IN")} bought`}
    >
      <Stars rating={product.rating} />
      <span className="text-zinc-600 font-medium">{product.rating.toFixed(1)}</span>
      {!compact && (
        <>
          <span className="text-zinc-300">·</span>
          <span className="text-emerald-700 font-medium">
            {product.purchaseCount.toLocaleString("en-IN")}+ bought
          </span>
        </>
      )}
      {compact && (
        <span className="text-zinc-500 hidden sm:inline">
          ({product.purchaseCount.toLocaleString("en-IN")}+)
        </span>
      )}
    </div>
  );
}
