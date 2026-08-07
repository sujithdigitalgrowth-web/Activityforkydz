import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Faq from "@/components/Faq";
import type { FaqItem } from "@/lib/faq";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "LKG Worksheets PDF — Maths & English Free Download";
const PAGE_DESCRIPTION =
  "Printable LKG worksheets covering maths, English and counting. CBSE pattern, made for 4-5 year olds. Download the PDF and print at home.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/lkg-worksheets" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/lkg-worksheets",
    type: "website",
  },
};

// The historical pack expected 6 products; dot-to-dot has since been
// removed (no real assets existed for it). The 5 survivors already cover
// the full LKG skill range this page describes, so nothing else from the
// current catalog was added — see the implementation report.
const LKG_PRODUCT_SLUGS = [
  "letters-and-words",
  "numbers-and-counting-mats",
  "alphabet-adventures",
  "big-book-of-comparisons",
  "cut-stick-and-make",
] as const;
const lkgProducts = LKG_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

const alphabetAdventures = getProductBySlug("alphabet-adventures");
const numbersAndCounting = getProductBySlug("numbers-and-counting-mats");
const lettersAndWords = getProductBySlug("letters-and-words");
const cutStickAndMake = getProductBySlug("cut-stick-and-make");

// Computed from the live products actually rendered on this page, not
// hardcoded — the pack's stale figure was ₹69.
const minPrice = Math.min(...lkgProducts.map((p) => p.price));

// Plain-text mirror of the FAQ answer below that embeds a real <Link> —
// FAQPage schema needs plain strings; wording matches the JSX version.
const lkgVsUkgAnswerText =
  "LKG focuses on writing capital letters, recognising small letters, two and three letter words, and numbers to 50. UKG moves to sentence formation, number names, shapes, patterns, clock reading and numbers to 100. See our UKG worksheets.";

const pageFaq: FaqItem[] = [
  {
    question: "What age is LKG?",
    answer:
      "LKG (Lower Kindergarten) is usually 4 to 5 years in Indian schools, sitting between nursery and UKG. Some schools call it Junior KG or Prep.",
  },
  {
    question: "Are these LKG worksheets free?",
    answer: `The full packs are paid, starting at ₹${minPrice}.`,
  },
  {
    question: "What's the difference between LKG and UKG worksheets?",
    answer: (
      <>
        LKG focuses on writing capital letters, recognising small letters, two and three letter
        words, and numbers to 50. UKG moves to sentence formation, number names, shapes,
        patterns, clock reading and numbers to 100. See our{" "}
        <Link href="/ukg-worksheets" className="text-orange-600 hover:underline">
          UKG worksheets
        </Link>
        .
      </>
    ),
  },
  {
    question: "My child reverses letters like b and d. Is that a problem?",
    answer:
      "No. Letter reversals are developmentally normal until around age seven. They usually resolve on their own with more writing practice. Only worth investigating if they persist well into Class 2 alongside other reading difficulties.",
  },
  {
    question: "Can I use these if my child is homeschooled?",
    answer:
      "Yes, and they work well for it. The packs are sequenced, so you can work through them in order rather than picking pages at random. Several parents use the combo bundles as a full year of supplementary material.",
  },
  {
    question: "How do I print these?",
    answer:
      "Standard A4, single-sided. Black and white is fine for worksheets. Any home printer or local print shop will handle them — the PDF is print-ready with no setup needed.",
  },
];

const pageFaqForSchema: FaqItem[] = pageFaq.map((item) => {
  if (item.question === "What's the difference between LKG and UKG worksheets?") {
    return { ...item, answer: lkgVsUkgAnswerText };
  }
  return item;
});

export default function LkgWorksheetsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/lkg-worksheets`,
      items: lkgProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "LKG Worksheets", url: `${baseUrl}/lkg-worksheets` },
    ]),
    faqJsonLd(pageFaqForSchema),
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
        <span className="text-zinc-700">LKG Worksheets</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        LKG Worksheets — Maths, English and Counting
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          LKG is the year the work gets real. In nursery your child was recognising letters. In
          LKG they&apos;re expected to write them, read two and three letter words, count past
          fifty, and do it while sitting at a desk for a proper stretch of time.
        </p>
        <p>
          It&apos;s also the year most parents start worrying, because the gap between what
          school sends home and what your child can actually do on their own becomes visible
          for the first time.
        </p>
        <p>
          These printable LKG worksheets cover both halves of the year — English and maths — in
          the order Indian classrooms teach them. Download the PDF, print what you need this
          week, print it again next month. One purchase, unlimited copies.
        </p>
      </div>

      <section className="mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {lkgProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          What LKG covers, term by term
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-4">
          Most Indian LKG syllabi follow roughly this shape. Yours may differ by a few weeks
          either way, but the sequence is near-universal:
        </p>

        <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
          Term 1 — English
        </h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-700">
          <li>Capital letters A–Z, written not just recognised</li>
          <li>Small letters a–z, recognition first</li>
          <li>Matching capital to small</li>
          <li>Beginning sounds</li>
        </ul>

        <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
          Term 1 — Maths
        </h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-700">
          <li>Numbers 1–20, writing</li>
          <li>Counting objects to 20</li>
          <li>Number before, after, between</li>
          <li>Basic shapes</li>
        </ul>

        <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
          Term 2 — English
        </h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-700">
          <li>Two letter words (at, in, on, up)</li>
          <li>Three letter words — the CVC words (cat, bag, sun)</li>
          <li>Missing letters</li>
          <li>Simple picture-to-word matching</li>
        </ul>

        <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
          Term 2 — Maths
        </h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-700">
          <li>Numbers 21–50, then 51–100</li>
          <li>Simple addition with pictures</li>
          <li>Bigger and smaller</li>
          <li>Patterns</li>
        </ul>

        <p className="text-zinc-700 leading-relaxed mt-6">
          The two things that trip children up most in LKG are small letters (b/d and p/q
          reversals are completely normal and not a warning sign at this age) and counting past
          twenty, where the number names stop following a pattern.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">Where to start</h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>If your child is at the beginning of LKG:</p>
          <p>
            Start with{" "}
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
            for letter formation, and{" "}
            {numbersAndCounting ? (
              <Link
                href={`/products/${numbersAndCounting.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Numbers &amp; Counting Mats
              </Link>
            ) : (
              "Numbers & Counting Mats"
            )}{" "}
            for the 1–20 work.
          </p>
          <p>If your child is mid-year and reading is beginning:</p>
          <p>
            {lettersAndWords ? (
              <Link
                href={`/products/${lettersAndWords.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Letters &amp; Words Activity Book
              </Link>
            ) : (
              "Letters & Words Activity Book"
            )}{" "}
            is the one you want. It covers two and three letter words, missing letters and word
            building — which is exactly the part of LKG most children need extra practice on.
          </p>
          <p>If your child finishes worksheets too fast and complains they&apos;re boring:</p>
          <p>
            {cutStickAndMake ? (
              <Link
                href={`/products/${cutStickAndMake.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Cut, Stick and Make
              </Link>
            ) : (
              "Cut, Stick and Make"
            )}{" "}
            puts the same skills inside an activity that doesn&apos;t feel like homework.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          About &quot;CBSE pattern&quot; LKG worksheets
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>You&apos;ll see this phrase everywhere, so it&apos;s worth being straight about it.</p>
          <p>
            CBSE does not prescribe a formal syllabus for LKG. The board&apos;s structured
            curriculum begins at Class 1. What schools call &quot;CBSE pattern LKG&quot; is
            really a widely-adopted convention that CBSE-affiliated schools follow, based on the
            NCERT preschool guidelines and the Vidya Pravesh framework.
          </p>
          <p>
            In practice that means the content is fairly standard across schools — which is why
            our worksheets line up well with what your child is being taught. But no one selling
            LKG worksheets can honestly claim official CBSE certification, and you should be
            suspicious of anyone who does.
          </p>
          <p>What matters is whether the difficulty matches your child, not the label on the cover.</p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          How much practice at LKG level
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>One worksheet a day, five days a week, is a good rhythm at this age. Fifteen to twenty minutes.</p>
          <p>
            More useful than volume: do the same worksheet twice, a week apart. Retention at
            four and five years old comes from spaced repetition, not from doing forty different
            pages.
          </p>
          <p>This is another argument for printables — printing the same page again costs you nothing.</p>
          <p>
            If your child is behind on something specific, drill that one thing for ten minutes
            rather than doing a broad mixed page. If they&apos;re ahead, move to{" "}
            <Link href="/ukg-worksheets" className="text-orange-600 font-medium hover:underline">
              UKG worksheets
            </Link>{" "}
            rather than doing more of the same level.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Signs your child is ready to move up
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-3">
          Move to UKG-level material when your child can:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-700 mb-4">
          <li>Write all capital letters without a model to copy from</li>
          <li>Read simple three letter words without sounding out each letter</li>
          <li>Count to 50 reliably and write numbers to 20</li>
          <li>Complete a worksheet page without needing you sitting next to them</li>
        </ul>
        <p className="text-zinc-700 leading-relaxed">
          That last one matters more than the academic markers. Independent working is the
          skill UKG assumes.
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
            <Link href="/nursery-worksheets" className="hover:underline">
              Nursery worksheets
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
