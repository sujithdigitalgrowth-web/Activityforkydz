import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-orange-100 bg-[#fffaf3]/90 backdrop-blur sticky top-0 z-10">
      <div className="max-w-[1400px] mx-auto px-2.5 sm:px-6 py-3 flex items-center gap-1.5 sm:gap-2">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo/111.png"
            alt="activityforKydz logo"
            width={1600}
            height={750}
            className="h-8 sm:h-14 w-auto"
            priority
          />
        </Link>

        <div className="ml-auto flex items-center gap-2 sm:gap-8 min-w-0">
          <nav className="flex items-center gap-2 sm:gap-8 min-w-0">
            <Link
              href="/"
              className="whitespace-nowrap text-[11px] sm:text-base font-semibold text-zinc-700 hover:text-orange-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/combos"
              className="whitespace-nowrap text-[11px] sm:text-base font-semibold text-zinc-700 hover:text-orange-600 transition-colors"
            >
              Combos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
