import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
  return (
    <header className="border-b border-orange-100 bg-[#fffaf3]/90 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl font-semibold text-orange-600">
          activityfor<span className="text-zinc-800">Kydz</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/#packs"
            className="text-sm font-semibold text-zinc-700 hover:text-orange-600 transition-colors"
          >
            Browse packs
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
