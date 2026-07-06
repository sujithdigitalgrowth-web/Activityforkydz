import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "activityforKydz — printable coloring pages and activity packs for kids";

export default async function Image() {
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
        }}
      >
        <div style={{ display: "flex", fontSize: 90, marginBottom: 20 }}>
          🦁 🦜 🌻 🔢 🪔
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#2d2a26",
          }}
        >
          activityfor<span style={{ color: "#e2661f" }}>Kydz</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#57534e",
            marginTop: 20,
          }}
        >
          Printable coloring & activity PDF packs for kids
        </div>
      </div>
    ),
    { ...size }
  );
}
