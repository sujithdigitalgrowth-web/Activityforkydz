import Image from "next/image";
import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
  return (
    <header className="border-b border-orange-100 bg-[#fffaf3]/90 backdrop-blur sticky top-0 z-10">
      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/111.png"
            alt="activityforKydz logo"
            width={1600}
            height={750}
            className="h-12 sm:h-14 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            href="/"
            className="whitespace-nowrap text-sm sm:text-base font-semibold text-zinc-700 hover:text-orange-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#packs"
            className="whitespace-nowrap text-sm sm:text-base font-semibold text-zinc-700 hover:text-orange-600 transition-colors"
          >
            Browse packs
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
