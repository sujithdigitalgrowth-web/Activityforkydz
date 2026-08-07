import type { Metadata } from "next";

// Cart contents are per-visitor and have no unique indexable content —
// keep it out of search results, but still let crawlers follow its links
// (e.g. back to product pages) rather than treating it as a dead end.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
