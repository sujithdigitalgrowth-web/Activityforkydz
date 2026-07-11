import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { getBaseUrl } from "@/lib/seo";

// lastModified is deliberately omitted: we have no real per-page "last
// changed" data, and stamping every URL with the build timestamp on every
// deploy is a fabricated freshness signal — Google has said it may start
// discounting lastmod site-wide if it repeatedly doesn't reflect real
// changes. Omitting it is safer than a lastmod that's always "just now".
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    priority,
    changeFrequency,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...productRoutes];
}
