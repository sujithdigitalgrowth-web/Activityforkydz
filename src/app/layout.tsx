import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBaseUrl, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

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
    "Printable PDF coloring pages and learning activity packs for kids — animals, birds, numbers, nature, Ganesh Chaturthi and other festival colouring, and more. Instant download, print at home, no app needed.",
  keywords: [
    "printable coloring pages for kids",
    "activity pack for kids pdf",
    "kids colouring pages india",
    "Ganesh Chaturthi coloring pages",
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
      <body className="min-h-full flex flex-col bg-[#fffaf3] text-[#2d2a26] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
