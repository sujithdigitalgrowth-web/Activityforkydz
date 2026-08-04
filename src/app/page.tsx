import type { Metadata } from "next";
import Link from "next/link";
import { products, getBestSellers, getProductBySlug } from "@/lib/products";
import { COMBOS, getComboByRouteSlug } from "@/lib/bundles";
import ProductGrid from "@/components/ProductGrid";
import HeroCarousel from "@/components/HeroCarousel";
import ComboCard from "@/components/ComboCard";
import BestSellers from "@/components/BestSellers";
import Faq from "@/components/Faq";
import { generalFaq } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute string, not a template-relative one: Next.js doesn't apply the
  // root layout's title template to app/page.tsx since they're the same segment.
  title: "Printable Coloring Pages & Activity Packs for Kids | activityforKydz",
  description:
    "Buy printable PDF coloring pages and learning activity packs for kids — animals, alphabet A-Z, birds, numbers 1-100, ocean life, fruits & vegetables, matching games and puzzles. Instant download, print at home, no app needed.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const bestSellers = getBestSellers(2, ["alphabet-adventures"]);
  // Featured alongside the real best sellers — new, so it hasn't earned a
  // sales rank yet, but we still want it visible on the homepage.
  const featuredPack = getProductBySlug("time-patterns-and-shapes");
  const bestSellersDisplay = featuredPack ? [...bestSellers, featuredPack] : bestSellers;
  const colouringCombo = getComboByRouteSlug("colouring-combo");
  // Only packs with a real uploaded banner belong in the hero slider —
  // otherwise it's just an empty gradient with a floating emoji, which
  // looks broken rather than "coming soon".
  const heroProducts = products.filter((product) => Boolean(product.bannerImage));

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaq)) }}
      />
      <h1 className="sr-only">
        Printable Coloring Pages &amp; Activity Packs for Kids | activityforKydz
      </h1>

      <section className="max-w-[1400px] mx-auto px-6 pt-6 pb-3">
        <HeroCarousel products={heroProducts} />
        <p className="text-center text-xs sm:text-sm text-zinc-600 mt-3">
          <span className="font-semibold text-orange-600">₹69–129</span> per pack, less than a
          snack ·{" "}
          <span className="font-semibold text-orange-600">Instant</span> email delivery ·{" "}
          <span className="font-semibold text-orange-600">Print &amp; go</span> — no app, no
          login
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 pb-10">
        <div className="rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-white p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <span className="inline-block rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-semibold mb-1.5">
                Bundle &amp; save
              </span>
              <h2 className="font-heading text-lg sm:text-2xl font-semibold text-zinc-900">
                Get all 6 for ₹340 instead of buying one by one
              </h2>
            </div>
            <Link
              href="/combos"
              className="hidden sm:inline-block shrink-0 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 transition-colors"
            >
              See combo deals
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {COMBOS.map((combo) => (
              <ComboCard key={combo.routeSlug} combo={combo} />
            ))}
          </div>
          <Link
            href="/combos"
            className="sm:hidden mt-4 block text-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 transition-colors"
          >
            See combo deals
          </Link>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">Best sellers</h2>
        <p className="text-zinc-600 mb-6">The packs families come back for the most — plus our newest addition.</p>
        <BestSellers
          products={bestSellersDisplay}
          rankedCount={bestSellers.length}
          extraTiles={colouringCombo ? <ComboCard combo={colouringCombo} /> : null}
        />
      </section>

      <section id="packs" className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Our little collection
        </h2>
        <p className="text-zinc-600 mb-6">
          We keep this list small on purpose — every pack here is one we&apos;d actually print
          for our own kids.
        </p>
        <ProductGrid products={products.filter((product) => !product.comingSoon)} />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-8 max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-2">
            Why printable, not another app?
          </h2>
          <p className="text-zinc-700 leading-relaxed">
            Every parent already knows the fight of pulling a phone away. These packs are
            built to be printed and handed over as paper — something to hold, color outside
            the lines on, and stick on the fridge. No notifications, no autoplay, no next
            episode. Just paper, crayons and a bit of quiet.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Common questions
        </h2>
        <p className="text-zinc-600 mb-6">Everything parents usually ask before their first order.</p>
        <div className="max-w-3xl">
          <Faq items={generalFaq} />
        </div>
      </section>
    </div>
  );
}
