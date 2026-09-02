import Link from "next/link";

export default function PromoBar() {
  return (
    <div className="bg-emerald-600 text-white text-center text-[11px] sm:text-sm font-semibold px-3 py-2 leading-snug">
      <Link href="/products/everything-combo" className="hover:underline">
        🎁 Get every pack we make for ₹499 — the Everything Combo
      </Link>
    </div>
  );
}
