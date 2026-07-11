import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "activityforKydz — Printable Coloring Pages & Activity Packs for Kids",
    short_name: "activityforKydz",
    description:
      "Printable PDF coloring pages and learning activity packs for kids. Instant download, print at home.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf3",
    theme_color: "#e2661f",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
