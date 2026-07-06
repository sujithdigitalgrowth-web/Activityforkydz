import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fffaf3 0%, #ffe4c7 100%)",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <div style={{ display: "flex", fontSize: 140, marginBottom: 10 }}>
          {product?.emoji ?? "📄"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#2d2a26",
            textAlign: "center",
          }}
        >
          {product?.title ?? "Printable Activity Pack"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#57534e",
            marginTop: 20,
          }}
        >
          {product ? `${product.pageCount} pages · ₹${product.price} · Instant PDF download` : ""}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            color: "#e2661f",
            marginTop: 30,
          }}
        >
          activityforKydz
        </div>
      </div>
    ),
    { ...size }
  );
}
