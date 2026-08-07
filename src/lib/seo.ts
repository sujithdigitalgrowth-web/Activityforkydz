import { site } from "./site";
import type { Product } from "./products";
import type { FaqItem } from "./faq";
import type { BlogPost } from "./posts";

// NEXT_PUBLIC_SITE_URL should be set in the hosting platform's environment
// variables (e.g. Vercel project settings) to the real production domain.
// If it's ever missing from a production build, fall back to the known
// production domain instead of localhost — a silent localhost fallback in
// prod breaks canonical URLs, the sitemap, robots.txt, and OG tags.
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return process.env.NODE_ENV === "production"
    ? "https://www.activityforkydz.com"
    : "http://localhost:3000";
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
//
// Also deliberately excludes shippingDetails (these are instant digital
// downloads, nothing ships) and hasMerchantReturnPolicy: the real refund
// policy (see refund-policy/page.tsx) only covers non-delivery, a corrupted
// file, or double-charging within 7 days — schema.org's return-policy
// categories don't have a value for that, and forcing it into
// MerchantReturnFiniteReturnWindow would misrepresent it as "return for any
// reason within 7 days." Same reasoning as the aggregateRating omission above.
export function productJsonLd(product: Product) {
  const baseUrl = getBaseUrl();
  const ageMatch = product.ageRange.match(/(\d+)\s*-\s*(\d+)/);
  const suggestedMinAge = ageMatch ? Number(ageMatch[1]) : undefined;
  const suggestedMaxAge = ageMatch ? Number(ageMatch[2]) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    category: "Printable kids activity PDF",
    brand: { "@type": "Brand", name: site.name },
    // Real, current product-data fields only — no fabricated review data.
    audience: suggestedMinAge
      ? { "@type": "PeopleAudience", suggestedMinAge, suggestedMaxAge }
      : undefined,
    numberOfPages: product.pageCount,
    encodingFormat: "application/pdf",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/products/${product.slug}`,
      // A digital file bought new is trivially "new condition" — not a
      // fabricated claim. seller.name is the real site name, not a
      // placeholder (unlike site.address, which still is one).
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
      // Deliberately no shippingDetails: nothing ships, this is a digital
      // download. Deliberately no hasMerchantReturnPolicy/priceValidUntil:
      // the real refund policy only covers non-delivery, a corrupted file,
      // or double-charging within 7 days — schema.org's return-policy
      // categories don't have a value for that, and forcing it into
      // MerchantReturnFiniteReturnWindow would misrepresent it as "return
      // for any reason within 7 days." No priceValidUntil date exists —
      // prices aren't scheduled to change, so there's nothing real to put
      // there.
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

export function blogPostingJsonLd(post: BlogPost) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedDate,
    url: `${baseUrl}/blog/${post.slug}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };
}

// Only used for blog posts where the visible article genuinely walks
// through an ordered process — steps must be a direct, unembellished
// mapping of the article's own headings/text, not invented for schema.
export function howToJsonLd(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.name,
      text: s.text,
    })),
  };
}

// Only used where the visible article contains a genuine, countable list —
// itemListElement mirrors the actual visible items, and numberOfItems is
// derived from items.length, never hardcoded, so it can't drift from the
// list actually being described.
export function itemListJsonLd(opts: { name: string; items: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };
}

// items should be exactly what's rendered on the page — no removed/unlisted
// products belong in here, since this schema is a factual description of
// the page's own content, not a catalog-wide index.
export function collectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
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
