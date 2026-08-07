import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Faq from "@/components/Faq";
import type { FaqItem } from "@/lib/faq";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Tracing Worksheets PDF — Letters, Numbers & Lines";
const PAGE_DESCRIPTION =
  "Printable tracing worksheets for pre-writing practice. Lines, curves, letters and numbers for ages 3-6. Instant PDF, print again and again.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/tracing-worksheets" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/tracing-worksheets",
    type: "website",
  },
};

// The historical pack expected 5 products; Cursive Handwriting has since
// been removed from the catalog. The 4 survivors are rendered below — see
// the implementation report for the fact-check on Numbers & Counting Mats'
// actual number range.
const TRACING_PRODUCT_SLUGS = [
  "my-first-lines",
  "numbers-and-counting-mats",
  "alphabet-adventures",
  "atoz-activity",
] as const;
const tracingProducts = TRACING_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

const myFirstLines = getProductBySlug("my-first-lines");
const alphabetAdventures = getProductBySlug("alphabet-adventures");
const numbersAndCounting = getProductBySlug("numbers-and-counting-mats");

// Computed from the live products actually rendered on this page, not
// hardcoded — the pack's stale figure was ₹69.
const minPrice = Math.min(...tracingProducts.map((p) => p.price));

const pageFaq: FaqItem[] = [
  {
    question: "At what age should a child start tracing worksheets?",
    answer:
      "Pre-writing stroke tracing suits 2.5 to 3 years. Letter tracing is usually realistic from 3.5 to 4. Go by whether they can hold a crayon and make a deliberate mark, not by age.",
  },
  {
    question: "Are these tracing worksheets free to download?",
    answer: `The full packs start at ₹${minPrice}.`,
  },
  {
    question: "What's the difference between tracing and writing worksheets?",
    answer:
      "Tracing gives a dotted or grey guide to follow. Writing asks the child to reproduce the shape independently. There's a middle stage most sets skip — copying a model placed beside the empty space rather than tracing over it — and that's where children usually need the most practice.",
  },
  {
    question: "Do you have Hindi varnamala tracing worksheets?",
    answer:
      "A dedicated Hindi varnamala tracing pack is in development. The Hindi worksheets section will be added separately when that launch path is ready.",
  },
  {
    question: "My child presses too hard and tears the paper. What do I do?",
    answer:
      "Common and it resolves with time. Try a softer crayon rather than a pencil, put a few sheets of paper underneath as padding, and work on a vertical surface for a while — it's harder to press hard when writing on a wall.",
  },
  {
    question: "Can I print the same tracing page repeatedly?",
    answer:
      "Yes, unlimited. That's the main reason printables suit tracing better than a physical workbook — you'll want the same page many times over. Laminating and using a whiteboard marker works even better.",
  },
];

export default function TracingWorksheetsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/tracing-worksheets`,
      items: tracingProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Tracing Worksheets", url: `${baseUrl}/tracing-worksheets` },
    ]),
    faqJsonLd(pageFaq),
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-zinc-500 mb-4">
        <Link href="/" className="hover:text-orange-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-700">Tracing Worksheets</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        Tracing Practice, From First Lines to Full Letters
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          Tracing is the most underrated worksheet type there is, because it looks like the child
          isn&apos;t doing anything. They&apos;re just following a dotted line. No answers,
          nothing to mark, nothing to be right or wrong about.
        </p>
        <p>
          What&apos;s actually happening is the entire physical foundation of handwriting. Every
          letter in English is made from four movements — the vertical line, the horizontal line,
          the curve and the diagonal. A child who can execute those four cleanly learns to write
          in a fraction of the time of one who&apos;s been copying letter shapes without them.
        </p>
        <p>
          These printable tracing worksheets run the full sequence: first lines, then shapes,
          then letters, then numbers, then cursive joins. Download the PDF and print each page as
          many times as your child needs — which, for tracing, is usually a lot.
        </p>
      </div>

      <section className="mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {tracingProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          The tracing sequence, in order
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            Working through these in order takes most children about a year. Skipping ahead is
            the most common cause of handwriting frustration.
          </p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Stage 1 — Pre-writing strokes (ages 2–3.5)
          </h3>
          <p>
            Vertical lines, horizontal lines, circles, crosses, diagonals, zigzags, waves, loops.
          </p>
          <p>
            No letters at all. This is{" "}
            {myFirstLines ? (
              <Link
                href={`/products/${myFirstLines.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                My First Lines
              </Link>
            ) : (
              "My First Lines"
            )}
            .
          </p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Stage 2 — Shapes (ages 3–4)
          </h3>
          <p>
            Squares, triangles, rectangles, stars. These combine strokes and require planning a
            whole path in advance, which letters also demand.
          </p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Stage 3 — Capital letters (ages 3.5–5)
          </h3>
          <p>
            Simplest strokes first — L, T, I, E, F, H — before the curved and diagonal letters.
          </p>
          <p>
            {alphabetAdventures ? (
              <Link
                href={`/products/${alphabetAdventures.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Alphabet Adventures
              </Link>
            ) : (
              "Alphabet Adventures"
            )}
            .
          </p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Stage 4 — Numbers (ages 4–5)
          </h3>
          <p>Numbers 0 to 20, with counting, ten frames and first sums.</p>
          <p>
            {numbersAndCounting ? (
              <Link
                href={`/products/${numbersAndCounting.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Numbers &amp; Counting Mats
              </Link>
            ) : (
              "Numbers & Counting Mats"
            )}
            .
          </p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Stage 5 — Small letters (ages 4–6)
          </h3>
          <p>Harder than capitals: descenders, ascenders, and the b/d/p/q confusions.</p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Stage 6 — Cursive (ages 6+)
          </h3>
          <p>The six basic cursive strokes, then letters, then joining.</p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          How to actually use a tracing worksheet
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            Most of the value gets lost because of how tracing sheets get used. The page is not
            the activity — the movement is.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Finger first, pencil second.</span> Have
            your child trace the shape with their index finger before picking up a pencil. This
            builds the motor pattern without the added difficulty of gripping and controlling a
            tool. Do this every time you introduce a new shape.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Say the movement out loud.</span>{" "}
            &quot;Down, and around.&quot; &quot;Across, then down.&quot; Children who verbalise
            the stroke learn it faster and are far less likely to develop backwards letter
            formation, which is very hard to unlearn once it sets.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Start at the top, always.</span> The
            single most important habit. A child who starts letters from the bottom will hit a
            wall at cursive and their writing speed will never quite catch up. Watch where the
            pencil starts, not just whether the result looks right.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Big before small.</span> Trace in the
            air, on a table with a finger, in a tray of rice or atta, then on paper. Large
            movements use the shoulder and elbow; small ones need finger control that develops
            later.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Stop while they&apos;re still
            enjoying it.</span> Ten minutes is plenty.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          The pencil matters more than the worksheet
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            A standard adult pencil is genuinely difficult for a three-year-old to control. If
            tracing is going badly, change the tool before changing the worksheet:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Broken crayons. Snap them in half. A short crayon physically cannot be held in a
              fist grip — it forces a three-finger hold.
            </li>
            <li>Triangular pencils or chunky grips. Widely available and worth the ₹50.</li>
            <li>
              Vertical surfaces. Tape the worksheet to a wall or use an easel. Working upright
              builds wrist extension and shoulder stability, which are what pencil control
              actually rests on.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Laminate and reuse
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>For tracing specifically, this saves a lot of paper:</p>
          <p>
            Print the page, laminate it or slide it into a clear plastic sleeve, and use a
            whiteboard marker. Your child traces, wipes, traces again. One printed page becomes
            fifty.
          </p>
          <p>
            This works especially well for{" "}
            {numbersAndCounting ? (
              <Link
                href={`/products/${numbersAndCounting.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Numbers &amp; Counting Mats
              </Link>
            ) : (
              "Numbers & Counting Mats"
            )}
            , which are designed for it.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          When to move on from tracing
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>Move from tracing to independent writing when your child can:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Trace a shape staying on the line most of the way</li>
            <li>Start each stroke in the right place without a reminder</li>
            <li>Copy a shape shown beside them, not just trace over it</li>
          </ul>
          <p>
            That middle step — copying beside rather than tracing over — is the one most
            worksheet sets skip, and it&apos;s where children get stuck. Fold the page so the
            model is next to the empty space rather than under the pencil. If they can do that,
            they&apos;re ready to write.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          More from activityforKydz
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-orange-600 font-medium">
          <li>
            <Link href="/activity-books-for-kids" className="hover:underline">
              Browse all activity books
            </Link>
          </li>
          <li>
            <Link href="/alphabet-worksheets" className="hover:underline">
              Alphabet worksheets
            </Link>
          </li>
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
        </ul>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Common questions
        </h2>
        <Faq items={pageFaq} />
      </section>
    </div>
  );
}
