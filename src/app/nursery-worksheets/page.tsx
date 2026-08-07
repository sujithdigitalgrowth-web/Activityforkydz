import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Faq from "@/components/Faq";
import type { FaqItem } from "@/lib/faq";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Nursery Worksheets PDF — English & Maths Printables";
const PAGE_DESCRIPTION =
  "Printable nursery worksheets for 3-4 year olds. English alphabets, numbers, patterns and tracing. Instant PDF download, print at home.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/nursery-worksheets" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/nursery-worksheets",
    type: "website",
  },
};

// The historical pack expected 6 products; matching-and-memory has since
// been removed (no real assets existed for it). The 5 survivors already
// cover the full skill range this page describes (strokes, letters,
// numbers, comparing), so nothing else from the current catalog was added
// — see the implementation report.
const NURSERY_PRODUCT_SLUGS = [
  "atoz-activity",
  "my-first-lines",
  "numbers-and-counting-mats",
  "big-book-of-comparisons",
  "alphabet-adventures",
] as const;
const nurseryProducts = NURSERY_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

const myFirstLines = getProductBySlug("my-first-lines");
const myFirstAlphabet = getProductBySlug("atoz-activity");
const alphabetAdventures = getProductBySlug("alphabet-adventures");

// Computed from the live products actually rendered on this page, not the
// full catalog and not the pack's stale "30 and 60" figure.
const minPages = Math.min(...nurseryProducts.map((p) => p.pageCount));
const maxPages = Math.max(...nurseryProducts.map((p) => p.pageCount));

const pageFaq: FaqItem[] = [
  {
    question: "What age are nursery worksheets for?",
    answer:
      "Nursery is typically 3 to 4 years in Indian schools. Our nursery packs are designed for that range, though children vary enormously at this age. Go by what your child can do with a pencil, not by their birthday.",
  },
  {
    question: "Are these CBSE pattern nursery worksheets?",
    answer:
      "They're built around what Indian nursery classrooms typically cover, which overlaps closely with CBSE-pattern preschool material. Nursery isn't formally standardised the way later classes are, so no preschool worksheet can truthfully claim strict CBSE alignment. These are supplementary practice, not a replacement for school books.",
  },
  {
    question: "Can I get free nursery worksheets to try first?",
    answer:
      "There's no free sample download right now, but every product page has preview images so you can see exactly what's inside before buying.",
  },
  {
    question: "How many pages are in each nursery pack?",
    answer: `Between ${minPages} and ${maxPages} depending on the pack. Each product page lists the exact count and the breakdown of what type of pages are included.`,
  },
  {
    question: "Can I print these more than once?",
    answer:
      "Yes, unlimited, forever. That's the main reason printables beat a physical book at this age — you will want to print the same tracing page repeatedly.",
  },
  {
    question: "My child gets frustrated with worksheets. What do I do?",
    answer:
      "Usually it means the level is wrong, not that worksheets aren't for them. Drop back a stage — if they're struggling with letters, go to stroke practice. Also check the pencil: a chunky triangular pencil or a broken-in-half crayon is far easier for a three-year-old to control than a standard pencil.",
  },
];

export default function NurseryWorksheetsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/nursery-worksheets`,
      items: nurseryProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Nursery Worksheets", url: `${baseUrl}/nursery-worksheets` },
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
        <span className="text-zinc-700">Nursery Worksheets</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        Nursery Worksheets Your Child Will Actually Sit Through
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          Nursery is the year everything is a first. First time holding a pencil properly.
          First time recognising that a shape on a page is a letter and not just a squiggle.
          First time being asked to sit at a table and finish something.
        </p>
        <p>
          Most worksheets sold for this age get it wrong in one of two directions. Either
          they&apos;re too easy — a page of circles to colour, done in ninety seconds — or they
          jump straight to writing letters, which a three-year-old&apos;s hand is not ready
          for.
        </p>
        <p>
          These are the ones in between. Printable nursery worksheets that start with the
          strokes that letters are built from, then move to letter recognition, then to
          matching and counting. Download the PDF, print at home, and print it again next month
          when the first copy is covered in crayon.
        </p>
      </div>

      <section className="mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {nurseryProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          What nursery worksheets should cover
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-3">
          Indian nursery classrooms vary, but the ground they cover in the year is fairly
          consistent.
        </p>
        <p className="text-zinc-700 leading-relaxed mb-3">
          By the end of nursery most children are expected to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-700 mb-4">
          <li>Recognise all 26 capital letters by sight</li>
          <li>Trace straight lines, curves, slants and zigzags cleanly</li>
          <li>Count aloud to 20 and match numbers 1–10 to quantities</li>
          <li>Identify basic shapes — circle, square, triangle, rectangle</li>
          <li>Understand simple opposites — big and small, in and out, up and down</li>
          <li>Hold a pencil in a tripod grip rather than a fist</li>
          <li>Sit with one activity for ten to fifteen minutes</li>
        </ul>
        <p className="text-zinc-700 leading-relaxed">
          Worksheets are useful for exactly five of those seven. The pencil grip and the
          sitting still come from repetition, not from the page design — which is why the
          volume of practice matters more than which specific worksheet you use. That&apos;s
          the argument for printables over a physical book: you can print the same page four
          times.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          What to start with if your child has never used a worksheet
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            {myFirstLines ? (
              <>
                Start with{" "}
                <Link
                  href={`/products/${myFirstLines.slug}`}
                  className="text-orange-600 font-medium hover:underline"
                >
                  My First Lines
                </Link>
                . It contains no letters at all.
              </>
            ) : (
              "Start with the stroke-tracing pages. They contain no letters at all."
            )}
          </p>
          <p>
            That sounds like a step backwards, but every letter in English is made from four
            strokes — the straight line, the curve, the slant and the circle. A child who can
            trace those four cleanly will pick up letter formation in a fraction of the time of
            a child who&apos;s been copying letter shapes without them.
          </p>
          <p>
            Two to three weeks on stroke pages, then move to{" "}
            {myFirstAlphabet ? (
              <Link
                href={`/products/${myFirstAlphabet.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                My First Alphabet Activity Book
              </Link>
            ) : (
              "My First Alphabet Activity Book"
            )}
            .
          </p>
          <p>
            If your child is already recognising letters, skip ahead to{" "}
            {alphabetAdventures ? (
              <Link
                href={`/products/${alphabetAdventures.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Alphabet Adventures
              </Link>
            ) : (
              "Alphabet Adventures"
            )}{" "}
            — one letter per page, with a picture word and a tracing line.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          How much is enough
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            One page a day is more than enough at nursery level. Two if your child asks for
            another, never more than that because the point is that they want to come back
            tomorrow.
          </p>
          <p>
            A ten-minute session that ends while they&apos;re still enjoying it beats a
            thirty-minute session that ends in a negotiation. This is the single most common
            mistake parents make with worksheets at this age.
          </p>
          <p>
            Don&apos;t do worksheets every day either. Four days a week is plenty. The pack
            isn&apos;t going anywhere and you own it forever.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Printing these at home
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-3">
          All our nursery worksheets print on standard A4. A few notes that save paper:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-700 mb-4">
          <li>
            Black and white is fine for tracing and matching pages. Save colour printing for
            the colouring pages where it doesn&apos;t matter anyway.
          </li>
          <li>Print single-sided. Children press hard at this age and double-sided pages show through.</li>
          <li>Thicker paper helps for anything that gets cut out. 100gsm or above if you have it.</li>
          <li>Print two or three copies at once of tracing pages. You will need them.</li>
        </ul>
        <p className="text-zinc-700 leading-relaxed">
          If you don&apos;t have a printer, any local print shop will do a full pack for
          ₹50–150 depending on page count. Take the PDF on a pen drive or email it to them.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Nursery vs LKG — which do you need?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold"></th>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  Nursery (3–4 years)
                </th>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  LKG (4–5 years)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-orange-100 px-3 py-2 font-medium text-zinc-900">Letters</td>
                <td className="border border-orange-100 px-3 py-2 text-zinc-700">Recognise capitals</td>
                <td className="border border-orange-100 px-3 py-2 text-zinc-700">Write capitals, recognise small</td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2 font-medium text-zinc-900">Numbers</td>
                <td className="border border-orange-100 px-3 py-2 text-zinc-700">Count to 20, match 1–10</td>
                <td className="border border-orange-100 px-3 py-2 text-zinc-700">Write 1–50, simple addition</td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2 font-medium text-zinc-900">Writing</td>
                <td className="border border-orange-100 px-3 py-2 text-zinc-700">Strokes and patterns</td>
                <td className="border border-orange-100 px-3 py-2 text-zinc-700">Letter formation</td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2 font-medium text-zinc-900">Words</td>
                <td className="border border-orange-100 px-3 py-2 text-zinc-700">Picture words only</td>
                <td className="border border-orange-100 px-3 py-2 text-zinc-700">Two and three letter words</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-zinc-700 leading-relaxed mt-4">
          {/* /lkg-worksheets doesn't exist yet — plain text, not a link,
              until that route is built (see implementation report). */}
          If your child is comfortable recognising letters and starting to write them, you want
          LKG worksheets instead.
        </p>
        <p className="text-zinc-700 leading-relaxed mt-2">
          If they&apos;re still working on holding a pencil, stay here.
        </p>
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
            <Link href="/ukg-worksheets" className="hover:underline">
              UKG worksheets
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
