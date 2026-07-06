import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Refund and cancellation policy for digital PDF downloads purchased from activityforKydz.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund & Cancellation Policy">
      <p>
        Because every product on {site.name} is a digital file delivered instantly by email,
        we don&apos;t offer refunds simply for change of mind once the file has been
        successfully delivered — the same way a printed book can&apos;t be returned once
        opened.
      </p>
      <h2>When we will refund or replace</h2>
      <ul>
        <li>Your download email never arrived, even after checking spam.</li>
        <li>The PDF file is corrupted, incomplete, or won&apos;t open.</li>
        <li>You were charged more than once for the same order.</li>
      </ul>
      <p>
        In any of these cases, email us within 7 days of purchase at{" "}
        <a href={`mailto:${site.supportEmail}`} className="text-orange-600 font-medium">
          {site.supportEmail}
        </a>{" "}
        with your order details, and we&apos;ll re-send the file or refund the payment.
      </p>
      <h2>Cancellations</h2>
      <p>
        Since delivery is instant, orders can&apos;t be cancelled once payment is completed.
      </p>
    </LegalPage>
  );
}
