import type { Metadata } from "next";
import Link from "next/link";
import { products, getBestSellers, getProductBySlug } from "@/lib/products";
import { COMBOS, getComboByRouteSlug } from "@/lib/bundles";
import ProductGrid from "@/components/ProductGrid";
import HeroCarousel from "@/components/HeroCarousel";
import ComboCard from "@/components/ComboCard";
import BestSellers from "@/components/BestSellers";
import ProductVisual from "@/components/ProductVisual";
import Faq from "@/components/Faq";
import { generalFaq, generalFaqForSchema } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute string, not a template-relative one: Next.js doesn't apply the
  // root layout's title template to app/page.tsx since they're the same segment.
  title: "Printable Activity Packs for Kids | activityforKydz",
  description:
    "Printable coloring pages and learning worksheets for kids 2-8. Nursery, LKG & UKG packs. Instant PDF download, print at home, no app needed.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Printable Activity Packs for Kids | activityforKydz",
    description:
      "Printable coloring pages and learning worksheets for kids 2-8. Nursery, LKG & UKG packs. Instant PDF download, print at home, no app needed.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  const trialPack = getProductBySlug("abc-of-character-trial");
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
  // Computed from the live catalog, not hardcoded — the pack's stale
  // figure was ₹69.
  const minPrice = Math.min(...products.map((p) => p.price));

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaqForSchema)) }}
      />
      <section className="max-w-[1400px] mx-auto px-6 pt-8 pb-2">
        <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 text-center max-w-3xl mx-auto">
          Printable Activity Packs Kids Actually Finish
        </h1>
        <p className="text-center text-sm sm:text-base text-zinc-600 mt-3 max-w-2xl mx-auto">
          Screen-free colouring and learning packs for ages 2 to 8. Delivered to your inbox as a
          PDF. Print as many copies as you like, forever.
        </p>
        <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
          <Link
            href="/#packs"
            className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 transition-colors"
          >
            Browse the packs
          </Link>
        </div>
      </section>

      {trialPack && (
        <section className="max-w-[1400px] mx-auto px-6 pt-2 pb-3">
          <Link
            href={`/products/${trialPack.slug}`}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <ProductVisual
              product={trialPack}
              className="rounded-xl w-full max-w-xs h-56 sm:w-36 sm:h-36 shrink-0 border-2 border-emerald-400 shadow-md ring-4 ring-emerald-100"
              emojiClassName="text-5xl"
            />
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <span className="inline-block rounded-full bg-emerald-600 text-white px-3 py-1 text-xs font-semibold mb-1.5">
                🎉 Best deal
              </span>
              <h2 className="font-heading text-lg sm:text-2xl font-semibold text-zinc-900">
                ABC of Character — Trial Pack
              </h2>
              <ul className="text-zinc-600 text-sm mt-1.5 space-y-1 inline-block text-left">
                <li>✓ 8 letters to try, instant download</li>
                <li>✓ Loved it? Get the full 26-letter pack</li>
              </ul>
            </div>
            <div className="shrink-0 text-center">
              <div className="mb-2">
                <span className="text-zinc-400 line-through text-sm mr-1.5">₹99</span>
                <span className="text-2xl font-bold text-emerald-600">₹19</span>
              </div>
              <span className="inline-block rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 transition-colors">
                Try it for ₹19
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="max-w-[1400px] mx-auto px-6 pt-4 pb-3">
        <HeroCarousel products={heroProducts} />
        <p className="text-center text-xs sm:text-sm text-zinc-600 mt-3">
          <span className="font-semibold text-orange-600">Instant</span> email delivery ·{" "}
          <span className="font-semibold text-orange-600">No app</span> to install ·{" "}
          <span className="font-semibold text-orange-600">Unlimited</span> printing · From{" "}
          <span className="font-semibold text-orange-600">₹{minPrice}</span>
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
                Save more with combo packs
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
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-3">
            Everyone has an app. Nobody has a finished page.
          </h2>
          <div className="text-zinc-700 leading-relaxed space-y-4">
            <p>
              There is no shortage of learning apps for Indian kids. There is a shortage of
              things a four-year-old can sit down with, complete on their own, and hold up
              afterwards.
            </p>
            <p>
              Apps hold attention because they move. That&apos;s exactly the problem — the
              moment the tablet goes away, so does the activity. Nothing gets finished. Nothing
              gets kept.
            </p>
            <p>
              A printed page works differently. It doesn&apos;t buzz, it doesn&apos;t autoplay
              the next thing, and it doesn&apos;t end when the battery does. Your child colours
              it, traces it, cuts it, sticks it on the fridge. Then asks for another one.
            </p>
            <p>
              That&apos;s the whole idea here. We make packs of pages worth printing — properly
              designed, in a sensible order, with thick clean lines that survive a wax crayon and
              a heavy hand.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Two kinds of packs, both printable
        </h2>
        <p className="text-zinc-600 mb-6 max-w-3xl">
          See the{" "}
          <Link href="/activity-books-for-kids" className="text-orange-600 hover:underline">
            full range of activity books
          </Link>{" "}
          if you&apos;d rather browse everything at once.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl">
          <div className="rounded-2xl border border-orange-100 bg-white p-5">
            <h3 className="font-heading text-lg font-semibold text-zinc-900 mb-2">
              Colouring Packs
            </h3>
            <p className="text-zinc-700 text-sm leading-relaxed mb-4">
              Themed sets built around one subject at a time. Animals, birds, ocean life,
              fruits, trees and flowers. One subject per page with a name label, so your child
              is picking up vocabulary while they colour. Thick outlines that work with fat
              crayons and small hands.
            </p>
            <Link href="/coloring-packs" className="text-orange-600 font-medium hover:underline">
              Browse colouring packs
            </Link>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white p-5">
            <h3 className="font-heading text-lg font-semibold text-zinc-900 mb-2">
              Learning Worksheets
            </h3>
            <p className="text-zinc-700 text-sm leading-relaxed mb-4">
              The ones that follow a curriculum. Alphabets A to Z, numbers and counting mats,
              pre-writing lines, opposites, shapes, patterns, cutting and pasting. Written to
              match what Indian nursery, LKG and UKG classrooms actually cover, so what your
              child does at home lines up with what happens at school.
            </p>
            <Link href="/learning-worksheets" className="text-orange-600 font-medium hover:underline">
              Browse learning worksheets
            </Link>
          </div>
        </div>
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
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Not sure where to start? Go by age.
        </h2>
        <p className="text-zinc-600 mb-6 max-w-3xl">
          The fastest way to pick is by what your child can already do with a pencil.
        </p>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl">
          <Link
            href="/for-2-3-years"
            className="rounded-2xl border border-orange-100 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span className="text-orange-600 font-heading font-semibold">2–3 years</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              Big shapes, first lines, simple colouring. Built for short attention spans and
              chunky crayons. Nothing that needs reading.
            </p>
          </Link>
          <Link
            href="/for-3-5-years"
            className="rounded-2xl border border-orange-100 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span className="text-orange-600 font-heading font-semibold">3–5 years</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              Alphabets, counting to 20, tracing and matching. Nursery and LKG level. This is
              where most parents start.
            </p>
          </Link>
          <Link
            href="/for-5-8-years"
            className="rounded-2xl border border-orange-100 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span className="text-orange-600 font-heading font-semibold">5–8 years</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              Words, numbers to 100, patterns, clock reading, cutting and comparisons. UKG and
              early primary.
            </p>
          </Link>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-3">
            Matched to what school is teaching
          </h2>
          <p className="text-zinc-700 leading-relaxed mb-5">
            If your child is in an Indian preschool, the syllabus is fairly predictable. Nursery
            does letter recognition and pre-writing strokes. LKG moves to letter formation, two
            and three letter words, and counting to fifty. UKG adds number names, shapes,
            patterns, clock reading and simple sentences.
          </p>
          <p className="text-zinc-700 leading-relaxed mb-5">
            Our packs are grouped the same way, so you&apos;re not guessing whether something is
            too easy or three years too early.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-orange-600 font-medium">
            <li>
              <Link href="/nursery-worksheets" className="hover:underline">
                Nursery worksheets
              </Link>
            </li>
            <li>
              <Link href="/lkg-worksheets" className="hover:underline">
                LKG worksheets
              </Link>
            </li>
            <li>
              <Link href="/ukg-worksheets" className="hover:underline">
                UKG worksheets
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-8 max-w-3xl space-y-4">
          <div>
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-2">
              Why printable, not another app?
            </h2>
            <p className="text-zinc-700 leading-relaxed">
              It works when the internet doesn&apos;t. Download once, print whenever. No
              buffering, no login, no &quot;please update the app&quot;.
            </p>
          </div>
          <p className="text-zinc-700 leading-relaxed">
            One purchase, unlimited copies. Print the same page for a second child, or the same
            page five times because your three-year-old wants to colour the elephant again.
            There&apos;s no per-download limit.
          </p>
          <p className="text-zinc-700 leading-relaxed">
            No app, no in-app purchases, and no recurring subscription.
          </p>
          <p className="text-zinc-700 leading-relaxed">
            It leaves something behind. A finished worksheet goes on the wall or into a folder.
            Twenty minutes on an app leaves nothing.
          </p>
          <p className="text-zinc-700 leading-relaxed">
            It&apos;s cheap enough not to think about. Packs start at ₹{minPrice}. A physical
            activity book costs more and runs out.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Buy, check your email, print
        </h2>
        <p className="text-zinc-600 mb-6 max-w-3xl">
          No printer at home isn&apos;t a dealbreaker — here&apos;s exactly what happens after
          you pay.
        </p>
        <ol className="grid sm:grid-cols-3 gap-5 max-w-4xl list-none">
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">1. Pick your pack</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              Browse by theme, age or school stage. Product pages show preview images so you can
              see what the pack looks like before buying.
            </p>
          </li>
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">2. Pay by UPI or card</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              Standard Indian payment methods. No account to create.
            </p>
          </li>
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">3. The PDF lands in your inbox</span>
            <p className="text-zinc-700 mt-1.5 text-sm leading-relaxed">
              Usually within a minute. Open it on your phone or laptop, send it to any printer,
              and you&apos;re done. Save the file — you can print from it again next year.
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
