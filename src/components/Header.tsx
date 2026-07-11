import Image from "next/image";
import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
  return (
    <header className="border-b border-orange-100 bg-[#fffaf3]/90 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-1 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/111.png"
            alt="activityforKydz logo"
            width={140}
            height={140}
            className="h-32 w-32 object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold text-zinc-700 hover:text-orange-600 transition-colors"
          >
            Home
          </Link>
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
