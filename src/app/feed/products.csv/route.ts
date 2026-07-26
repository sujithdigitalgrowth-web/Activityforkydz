import { products } from "@/lib/products";
import { getBaseUrl } from "@/lib/seo";

// Product feed for Meta Commerce Manager (and any other CSV-based catalog
// tool). Only live packs are listed — comingSoon ones have no PDF to
// deliver yet, so they'd bounce a buyer straight to a broken checkout.
// Meta re-fetches this URL on its own schedule, so new/changed products
// show up automatically without a manual re-upload.
const COLUMNS = [
  "id",
  "title",
  "description",
  "availability",
  "condition",
  "price",
  "link",
  "image_link",
  "brand",
] as const;

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const baseUrl = getBaseUrl();

  const rows = products
    .filter((product) => !product.comingSoon)
    .map((product) => {
      const imagePath = product.image ?? `/categories/${product.slug}.jpg`;
      const row: Record<(typeof COLUMNS)[number], string> = {
        id: product.slug,
        title: product.title,
        description: product.seoDescription ?? product.description,
        availability: "in stock",
        condition: "new",
        price: `${product.price}.00 INR`,
        link: `${baseUrl}/products/${product.slug}`,
        image_link: `${baseUrl}${imagePath}`,
        brand: "activityforKydz",
      };
      return COLUMNS.map((col) => csvEscape(row[col])).join(",");
    });

  const csv = [COLUMNS.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
