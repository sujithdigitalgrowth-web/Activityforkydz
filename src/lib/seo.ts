import { site } from "./site";
import type { Product } from "./products";
import type { FaqItem } from "./faq";

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function organizationJsonLd() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: baseUrl,
    email: site.supportEmail,
  };
}

export function websiteJsonLd() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: baseUrl,
  };
}

// Deliberately excludes aggregateRating/review fields: the rating and purchase
// counts in the catalog are still placeholders. Marking up fabricated reviews
// in structured data risks a Google "spammy structured markup" manual action —
// add aggregateRating back in only once these numbers are real.
export function productJsonLd(product: Product) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    category: "Printable kids activity PDF",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/products/${product.slug}`,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
