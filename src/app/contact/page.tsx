import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Support — activityforKydz",
  description: "Didn't get your download? Print not working? Email us and we'll sort it out, usually the same day. Real people, no ticket system.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Support — activityforKydz",
    description: "Didn't get your download? Print not working? Email us and we'll sort it out, usually the same day. Real people, no ticket system.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <LegalPage title="Something Not Working? Tell Us">
      <p>
        Have a question about an order, a download that didn&apos;t arrive, or anything else?
        We read every email ourselves.
      </p>
      <h2>Email</h2>
      <p>
        <a href={`mailto:${site.supportEmail}`} className="text-orange-600 font-medium">
          {site.supportEmail}
        </a>
      </p>
      <p>
        Reply to the email above and we&apos;ll get back to you — you&apos;re important to us.
      </p>
    </LegalPage>
  );
}
