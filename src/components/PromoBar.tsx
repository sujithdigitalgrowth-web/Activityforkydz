import Link from "next/link";

export default function PromoBar() {
  return (
    <div className="bg-emerald-600 text-white text-center text-xs sm:text-sm font-semibold px-4 py-2">
      <Link href="/#packs" className="hover:underline">
        🎁 Buy 2 packs, get 1 FREE — applied automatically at checkout
      </Link>
    </div>
  );
}
