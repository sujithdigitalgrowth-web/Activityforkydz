import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBar from "@/components/PromoBar";
import { getBaseUrl, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const GTM_ID = "GTM-PM83SS7V";

const heading = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default:
      "activityforKydz — Printable Coloring Pages & Activity Packs for Kids (PDF Download)",
    template: "%s | activityforKydz",
  },
  description:
    "Printable PDF coloring pages and learning activity packs for kids — animals, alphabet, birds, numbers 1-100, ocean life, fruits & vegetables, matching games, puzzles and more. Instant download, print at home, no app needed.",
  keywords: [
    "printable coloring pages for kids",
    "activity pack for kids pdf",
    "kids colouring pages india",
    "alphabet coloring pages for kids",
    "dot to dot printables for kids",
    "printable activity sheets for kids",
    "learning worksheets pdf download",
  ],
  openGraph: {
    type: "website",
    siteName: "activityforKydz",
    title: "activityforKydz — Printable Coloring Pages & Activity Packs for Kids",
    description:
      "Printable PDF coloring and learning activity packs for kids. Instant download, print at home.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full`}>
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="min-h-full flex flex-col bg-[#fffaf3] text-[#2d2a26] antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
          }}
        />
        <PromoBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
