import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "Get in touch with activityforKydz for order support, download issues, or questions about our printable kids activity packs.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact & support">
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
      <h2>Fastest way to get help</h2>
      <p>
        Just reply directly to the download email you received after payment — it already has
        your order details, so we can sort things out faster.
      </p>
      <h2>Business details</h2>
      <p>
        {site.legalEntityName}
        <br />
        {site.address}
      </p>
    </LegalPage>
  );
}
