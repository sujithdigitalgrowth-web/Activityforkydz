import type { Metadata } from "next";

// Checkout is a transactional, per-visitor flow with no indexable content —
// keep it out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
