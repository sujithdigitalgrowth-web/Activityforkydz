import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>
        By purchasing from {site.name}, you agree to the following terms.
      </p>
      <h2>What you&apos;re buying</h2>
      <p>
        All products on this site are downloadable PDF files delivered by email. There is no
        physical shipment — nothing is mailed to you.
      </p>
      <h2>Personal use only</h2>
      <p>
        Each pack is licensed for personal, household use — printing copies for your own
        children, classroom, or family. Reselling, redistributing, or publicly sharing the PDF
        files (including uploading them elsewhere) is not permitted.
      </p>
      <h2>Pricing</h2>
      <p>All prices are listed in Indian Rupees (INR) and include any applicable taxes.</p>
      <h2>Availability</h2>
      <p>
        We try to keep every listed pack available, but reserve the right to update, replace,
        or discontinue a pack at any time.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${site.supportEmail}`} className="text-orange-600 font-medium">
          {site.supportEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}
