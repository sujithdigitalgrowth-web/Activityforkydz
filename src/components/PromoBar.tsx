import Link from "next/link";

export default function PromoBar() {
  return (
    <div className="bg-emerald-600 text-white text-center text-[11px] sm:text-sm font-semibold px-3 py-2 leading-snug">
      <Link href="/#packs" className="hover:underline">
        🎁 Buy 1 pack, get 1 FREE — applied automatically at checkout
      </Link>
    </div>
  );
}
