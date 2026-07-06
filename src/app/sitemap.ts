import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { getBaseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/refund-policy", priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    priority,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
