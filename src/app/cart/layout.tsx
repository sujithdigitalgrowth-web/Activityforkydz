import type { Metadata } from "next";

// Cart contents are per-visitor and have no unique indexable content —
// keep it out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
