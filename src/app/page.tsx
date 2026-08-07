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
  title: "Printable Activity Packs for Kids | activityforKydz",
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
      <section className="max-w-[1400px] mx-auto px-6 pt-8 pb-2">
        <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 text-center max-w-3xl mx-auto">
          Printable Activity Packs Kids Actually Finish
        </h1>
        <p className="text-center text-sm sm:text-base text-zinc-600 mt-3 max-w-2xl mx-auto">
          Coloring, alphabet, numbers and hands-on learning packs for ages 2–12, designed page
          by page so a child sits down, finishes it, and asks for the next one. Pay once,
          download instantly, print at home or at any print shop.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 pt-4 pb-3">
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
                Save when you bundle a combo instead of buying one by one
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
        <ProductGrid products={products} />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Which pack fits your child&apos;s age?
        </h2>
        <p className="text-zinc-600 mb-6 max-w-3xl">
          Every product page lists an exact age range, but here&apos;s the short version if
          you&apos;re comparing a few packs at once.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl text-zinc-700 leading-relaxed">
          <p>
            <strong className="text-zinc-900">Ages 2–5, first pencil skills.</strong>{" "}
            <Link href="/products/my-first-lines" className="text-orange-600 hover:underline">
              My First Lines
            </Link>{" "}
            builds pencil control through simple line and curve tracing, and the{" "}
            <Link href="/products/atoz-activity" className="text-orange-600 hover:underline">
              My First Alphabet Activity Book
            </Link>{" "}
            eases a toddler into noticing that letters mean something, before real handwriting
            is realistic.
          </p>
          <p>
            <strong className="text-zinc-900">Ages 3–6, letters and numbers.</strong>{" "}
            <Link href="/products/alphabet-adventures" className="text-orange-600 hover:underline">
              Alphabet Adventures
            </Link>
            ,{" "}
            <Link href="/products/letters-and-words" className="text-orange-600 hover:underline">
              Letters and Words
            </Link>{" "}
            and{" "}
            <Link href="/products/numbers-and-counting-mats" className="text-orange-600 hover:underline">
              Numbers and Counting
            </Link>{" "}
            cover early reading and counting, while{" "}
            <Link href="/products/abc-of-character" className="text-orange-600 hover:underline">
              ABC of Character
            </Link>{" "}
            turns the same letters into a first conversation about kindness and honesty.
          </p>
          <p>
            <strong className="text-zinc-900">Ages 4–9, colour and count.</strong>{" "}
            <Link href="/products/numbers-and-counting-mats" className="text-orange-600 hover:underline">
              Numbers and Counting
            </Link>{" "}
            turns tracing into real counting, ten frames and first sums,{" "}
            <Link href="/products/birds-of-the-world" className="text-orange-600 hover:underline">
              Birds of the World
            </Link>{" "}
            rewards kids who love detail with 40+ species to colour, and{" "}
            <Link href="/products/time-patterns-and-shapes" className="text-orange-600 hover:underline">
              Telling Time, Patterns and Shapes
            </Link>{" "}
            tackles clocks and shapes once counting feels solid.
          </p>
          <p>
            <strong className="text-zinc-900">Ages 5–12, detail and general knowledge.</strong>{" "}
            <Link href="/products/flowers-colouring" className="text-orange-600 hover:underline">
              The Flowers Colouring Book
            </Link>{" "}
            rewards kids who read the common name, local name and fun fact printed on every one
            of its 104 flowers, not just fill in colour.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-8 max-w-3xl space-y-4">
          <div>
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
          <p className="text-zinc-700 leading-relaxed">
            Each pack is also built around a specific skill, not just a theme. Tracing pages
            build the pencil control handwriting needs later, comparing and sorting pages build
            attention to detail, number and shape pages build counting and sequencing, and
            every animal, bird or flower page quietly adds new vocabulary along the way.
            It&apos;s the same ground a preschool worksheet or an early-years curriculum
            covers — just handed to you as a print-ready PDF instead of a monthly
            subscription.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          How printing works
        </h2>
        <p className="text-zinc-600 mb-6 max-w-3xl">
          No printer at home isn&apos;t a dealbreaker — here&apos;s exactly what happens after
          you pay.
        </p>
        <ol className="grid sm:grid-cols-3 gap-5 max-w-4xl list-none">
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">1. Buy the pack</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              Pay by UPI, card or netbanking and the PDF lands in your inbox within a minute —
              no courier, no customs, no waiting.
            </p>
          </li>
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">2. Print it</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              Every page is sized for standard A4 or US Letter paper on any inkjet or laser
              printer — no glossy paper or cardstock needed. No printer at home? Save the PDF
              to a pen drive or email it to your nearest print shop.
            </p>
          </li>
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">3. Reuse it</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              It&apos;s yours to keep. Print one copy for now, print more when a page wears
              out, or print it again for a younger sibling later.
            </p>
          </li>
        </ol>
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
