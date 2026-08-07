import type { Metadata } from "next";
import Script from "next/script";

// Checkout is a transactional, per-visitor flow with no indexable content —
// keep it out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Only the checkout page actually calls window.Razorpay — loading
          this here instead of the root layout keeps it off every other
          route's page weight. afterInteractive (unchanged) still means it
          never blocks render. */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      {children}
    </>
  );
}
