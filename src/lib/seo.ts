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
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    category: "Printable kids activity PDF",
    brand: { "@type": "Brand", name: site.name },
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
