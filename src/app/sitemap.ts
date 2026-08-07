import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { getAllPosts } from "@/lib/posts";
import { getBaseUrl } from "@/lib/seo";

// lastModified is deliberately omitted for routes with no real per-page
// "last changed" data (static pages, product pages): stamping every URL
// with the build timestamp on every deploy is a fabricated freshness
// signal — Google has said it may start discounting lastmod site-wide if
// it repeatedly doesn't reflect real changes. Omitting it is safer than a
// lastmod that's always "just now".
//
// priority is omitted entirely, on every route: Google has said for years
// it ignores <priority> in sitemaps, so it's dead weight that only invites
// bikeshedding whenever a new route is added.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const staticRoutes = [
    { path: "", changeFrequency: "weekly" as const },
    { path: "/about", changeFrequency: "monthly" as const },
    { path: "/contact", changeFrequency: "monthly" as const },
    { path: "/blog", changeFrequency: "weekly" as const },
    { path: "/combos", changeFrequency: "weekly" as const },
    { path: "/privacy-policy", changeFrequency: "yearly" as const },
    { path: "/terms", changeFrequency: "yearly" as const },
    { path: "/refund-policy", changeFrequency: "yearly" as const },
  ].map(({ path, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    changeFrequency: "monthly" as const,
  }));

  // Blog posts have a real publishedDate, unlike the routes above — so a
  // lastModified value here is honest, not a fabricated build timestamp.
  const postRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
