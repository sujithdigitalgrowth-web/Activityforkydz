"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-orange-100 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-zinc-800"
      >
        <path d="M6 6h15l-1.5 9h-12L4.5 3H2" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-orange-600 text-white text-[11px] font-bold">
          {count}
        </span>
      )}
    </Link>
  );
}
