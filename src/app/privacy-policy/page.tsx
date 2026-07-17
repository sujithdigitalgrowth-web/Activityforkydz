import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How activityforKydz collects and uses your information when you buy a printable PDF activity pack.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what information {site.name} collects when you buy a PDF pack,
        and how it&apos;s used. We keep this simple because we collect very little.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Your email address, to deliver your PDF and send order-related messages.</li>
        <li>
          Payment details (card, UPI, or netbanking info) are collected and processed directly
          by our payment partner, PayU — we never see or store your full payment details.
        </li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To deliver the product you purchased.</li>
        <li>To respond if you contact us about an order.</li>
        <li>We do not sell or share your email with third parties for marketing.</li>
      </ul>
      <h2>Cookies</h2>
      <p>
        This site does not use tracking or advertising cookies. Any cookies used are strictly
        necessary for the checkout process to work.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${site.supportEmail}`} className="text-orange-600 font-medium">
          {site.supportEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}
