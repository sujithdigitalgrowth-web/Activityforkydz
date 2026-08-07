import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "About activityforKydz — Screen-Free Packs for Kids",
  description:
    "Why we make printable activity packs instead of another kids app. Made in India for parents who want less screen time and more finished pages.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About activityforKydz — Screen-Free Packs for Kids",
    description:
      "Why we make printable activity packs instead of another kids app. Made in India for parents who want less screen time and more finished pages.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <LegalPage title="We Got Tired of Handing Over the Phone">
      <p>
        activityforKydz started from a very ordinary problem: too much screen time, and not
        enough good, screen-free ways to fill an afternoon. Coloring books from the store were
        either too thin, too expensive, or gone in a day.
      </p>
      <p>
        So we started making our own — simple, printable PDF packs about the things kids are
        already curious about: animals, letters, numbers, the ocean, plants and more. Print it
        at home, hand it over, and you&apos;ve bought yourself a genuinely quiet hour.
      </p>
      <p>
        We keep the catalog small on purpose. Every pack here is one we&apos;d actually print
        for our own kids — not a store shelf padded out for the sake of it.
      </p>
    </LegalPage>
  );
}
