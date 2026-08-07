import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Faq from "@/components/Faq";
import type { FaqItem } from "@/lib/faq";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Alphabet Worksheets PDF — A to Z Printables for Kids";
const PAGE_DESCRIPTION =
  "A to Z alphabet worksheets in PDF. Letter tracing, matching, missing letters and phonics for ages 3-6. Print as many copies as you need.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/alphabet-worksheets" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/alphabet-worksheets",
    type: "website",
  },
};

// The historical pack expected 5 products; Cursive Handwriting has since
// been removed from the catalog. The 4 survivors are rendered below — see
// the implementation report for the one live product (My First Lines)
// considered and deliberately not added.
const ALPHABET_PRODUCT_SLUGS = [
  "alphabet-adventures",
  "letters-and-words",
  "atoz-activity",
  "abc-of-character",
] as const;
const alphabetProducts = ALPHABET_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

const alphabetAdventures = getProductBySlug("alphabet-adventures");
const myFirstAlphabet = getProductBySlug("atoz-activity");
const lettersAndWords = getProductBySlug("letters-and-words");

// Computed from the live products actually rendered on this page, not
// hardcoded — the pack's stale figure was ₹69.
const minPrice = Math.min(...alphabetProducts.map((p) => p.price));

const pageFaq: FaqItem[] = [
  {
    question: "What age should a child start alphabet worksheets?",
    answer:
      "Recognition activities suit 3 years and up. Writing practice is usually realistic from around 3.5 to 4, but it depends far more on pencil control than on age. If your child can't yet trace a straight line, start with tracing worksheets instead.",
  },
  {
    question: "Are these A to Z alphabet worksheets free?",
    answer: `The complete packs start at ₹${minPrice}.`,
  },
  {
    question: "Should I teach capital or small letters first?",
    answer:
      "Capitals. They use simpler strokes, all sit on the baseline, and are more visually distinct from each other. Introduce small letters afterwards, matched to their capital.",
  },
  {
    question: "How long does it take a child to learn all 26 letters?",
    answer:
      "Recognition typically takes 3 to 6 months of regular exposure. Writing all 26 fluently usually takes most of a school year. Both vary enormously between children and neither is a race.",
  },
  {
    question: "My child knows the alphabet song but can't recognise letters. Is that normal?",
    answer:
      "Very. The song is a memorised sequence of sounds — it doesn't connect to the written shapes at all. Plenty of children can sing it perfectly and not recognise a single letter on a page. The two skills need teaching separately.",
  },
  {
    question: "Do you have Hindi alphabet worksheets?",
    answer:
      "A Hindi varnamala tracing pack is in development. The dedicated Hindi worksheets section will be added separately when that launch path is ready.",
  },
];

export default function AlphabetWorksheetsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/alphabet-worksheets`,
      items: alphabetProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Alphabet Worksheets", url: `${baseUrl}/alphabet-worksheets` },
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
        <span className="text-zinc-700">Alphabet Worksheets</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        A to Z, One Letter at a Time
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          Twenty-six letters, each with a capital and a small form, each with a sound that
          doesn&apos;t always match its name. It&apos;s a lot to ask of a four-year-old, and the
          way most alphabet material is organised makes it harder than it needs to be.
        </p>
        <p>
          The usual approach is A, B, C, D — alphabetical order, straight through. That&apos;s
          the worst possible sequence for a child learning to write, because it puts the hardest
          letters early and groups letters that look nothing alike.
        </p>
        <p>
          These printable alphabet worksheets are ordered by how the letter is formed, not by
          where it sits in the alphabet. Download the PDF, print a page a day, and print it again
          when you need the repetition.
        </p>
      </div>

      <section className="mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {alphabetProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          The letter order that actually works
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            If you&apos;re teaching letter writing rather than letter recognition, teach in
            stroke groups:
          </p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Group 1 — straight lines only
          </h3>
          <p className="font-medium text-zinc-900">L, T, I, E, F, H</p>
          <p>
            All made from vertical and horizontal lines. No curves, no diagonals. Most children
            manage these within a week.
          </p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Group 2 — curves
          </h3>
          <p className="font-medium text-zinc-900">C, O, Q, G, S</p>
          <p>
            Single continuous curves. The trick is starting at the top and going anticlockwise —
            children who learn C clockwise struggle with every other curved letter later.
          </p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Group 3 — lines plus curves
          </h3>
          <p className="font-medium text-zinc-900">D, P, B, R, U, J</p>
          <p>Combining the first two groups.</p>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
            Group 4 — diagonals
          </h3>
          <p className="font-medium text-zinc-900">V, A, W, X, Y, K, M, N, Z</p>
          <p>
            Hardest, because diagonals require crossing the body&apos;s midline. Leave these
            until last.
          </p>

          <p>
            Alphabetical order puts A — a diagonal letter — first. That&apos;s why so many
            children get stuck on the very first letter they&apos;re taught and decide writing is
            hard.
          </p>
          <p>
            Our{" "}
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
            pack is arranged alphabetically because that&apos;s what schools use and what parents
            expect, but you can work through it in the stroke order above by just taking the
            pages out of sequence. It works noticeably better.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Recognition before writing, always
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>Two different skills, and they don&apos;t arrive at the same time.</p>
          <p>
            Letter recognition — knowing that this shape is called &quot;em&quot; — comes first
            and is mostly visual memory. A three-year-old can recognise letters long before their
            hand can form them.
          </p>
          <p>
            Letter formation — being able to draw it — requires fine motor control that develops
            on its own schedule and can&apos;t be rushed by more worksheets.
          </p>
          <p>
            If your child recognises letters but can&apos;t write them, they don&apos;t need more
            alphabet worksheets. They need pre-writing tracing practice — lines, curves and
            zigzags — to build the hand control first. Trying to force letter formation before
            that is where frustration comes from.
          </p>
          <p>
            {myFirstAlphabet ? (
              <Link
                href={`/products/${myFirstAlphabet.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                My First Alphabet Activity Book
              </Link>
            ) : (
              "My First Alphabet Activity Book"
            )}{" "}
            is the recognition-stage pack.{" "}
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
            is the formation-stage one.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Capital or small letters first?
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>Capitals first. Almost every Indian school does this and it&apos;s the right call:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Capitals are made of simpler strokes — more straight lines, fewer curves</li>
            <li>Capitals all sit on the line with no descenders below it</li>
            <li>Capitals are more visually distinct from each other, so fewer confusions</li>
            <li>
              Only a handful of capital pairs look alike, versus b/d, p/q, m/n, u/v in small
              letters
            </li>
          </ul>
          <p>
            Introduce small letters once capitals are fluent, and introduce them matched to their
            capital rather than as a fresh set of 26. A–a, B–b, and so on. Matching worksheets do
            this well and it halves the perceived workload.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          When letters come out backwards
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            Reversals — b written as d, s written backwards, whole words mirror-written — are
            completely normal until about age seven. They are not an early sign of dyslexia and
            they don&apos;t need correcting aggressively.
          </p>
          <p>What helps:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>More writing practice, not more correction</li>
            <li>Tracing with a finger before using a pencil, so the movement is learned physically</li>
            <li>A visual cue for the common pair: lowercase b faces the same way as a capital B</li>
            <li>Ignoring it, mostly</li>
          </ul>
          <p>
            What doesn&apos;t help: pointing it out every time. Children who become anxious about
            reversals write less, and writing less is the only thing that genuinely delays the
            fix.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Missing letters and word building
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            Once individual letters are secure, the next step is putting them into words. This is
            where{" "}
            {lettersAndWords ? (
              <Link
                href={`/products/${lettersAndWords.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Letters &amp; Words
              </Link>
            ) : (
              "Letters & Words"
            )}{" "}
            comes in — it covers fill-in-the-missing-letter pages, two and three letter word
            building, and picture-to-word matching.
          </p>
          <p>
            Missing-letter worksheets are underrated. They force a child to think about a
            letter&apos;s sound and its position, not just its shape, which is the bridge between
            knowing the alphabet and actually reading.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          After the alphabet
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>Once your child is writing all 26 letters comfortably:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Three letter words →{" "}
              {lettersAndWords ? (
                <Link
                  href={`/products/${lettersAndWords.slug}`}
                  className="text-orange-600 font-medium hover:underline"
                >
                  Letters &amp; Words
                </Link>
              ) : (
                "Letters & Words"
              )}
            </li>
            <li>Hindi varnamala → Hindi worksheets</li>
            <li>
              Sentences →{" "}
              <Link href="/ukg-worksheets" className="text-orange-600 font-medium hover:underline">
                UKG worksheets
              </Link>
            </li>
          </ul>
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
