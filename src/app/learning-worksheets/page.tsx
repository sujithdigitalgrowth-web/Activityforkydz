import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { LEARNING_COMBO_PRICE } from "@/lib/bundles";
import ProductCard from "@/components/ProductCard";
import Faq from "@/components/Faq";
import type { FaqItem } from "@/lib/faq";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Printable Learning Worksheets for Kids PDF";
const PAGE_DESCRIPTION =
  "Printable learning worksheets for kids: alphabets, numbers, shapes, patterns, opposites and cutting activities. Ages 2-8, instant PDF download.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/learning-worksheets" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/learning-worksheets",
    type: "website",
  },
};

// The historical pack listed 12 products; Dot to Dot, Matching & Memory,
// Numbers 1 to 100 and Puzzles & Find the Difference have since been
// removed from the catalog. The 8 survivors are rendered below, grouped
// by skill per the pack's structure — see the implementation report for
// the age-range mismatch this produced against the pack's "ages 2-8" copy.
const LETTERS_AND_WORDS_SLUGS = ["atoz-activity", "letters-and-words", "abc-of-character"] as const;
const NUMBERS_AND_COUNTING_SLUGS = ["numbers-and-counting-mats"] as const;
const WRITING_AND_MOTOR_SLUGS = ["my-first-lines", "cut-stick-and-make"] as const;
const THINKING_AND_REASONING_SLUGS = ["big-book-of-comparisons", "time-patterns-and-shapes"] as const;

const lettersAndWordsGroup = LETTERS_AND_WORDS_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);
const numbersAndCountingGroup = NUMBERS_AND_COUNTING_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);
const writingAndMotorGroup = WRITING_AND_MOTOR_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);
const thinkingAndReasoningGroup = THINKING_AND_REASONING_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

const learningProducts = [
  ...lettersAndWordsGroup,
  ...numbersAndCountingGroup,
  ...writingAndMotorGroup,
  ...thinkingAndReasoningGroup,
];

const bigBookOfComparisons = getProductBySlug("big-book-of-comparisons");
const timePatternsAndShapes = getProductBySlug("time-patterns-and-shapes");
const cutStickAndMake = getProductBySlug("cut-stick-and-make");

// Computed from the live products actually rendered on this page, not
// hardcoded — the pack's stale figures were "2 to 8" years and "₹69 to
// ₹129". Time, Patterns & Shapes runs to 9 years, which pushes the real
// max past the pack's intro copy of "ages 2 to 8" — flagged in the report.
const ageStarts = learningProducts.map((p) => parseInt(p.ageRange, 10));
const ageEnds = learningProducts.map((p) => {
  const match = p.ageRange.match(/(\d+)\s*-\s*(\d+)/);
  return match ? parseInt(match[2], 10) : parseInt(p.ageRange, 10);
});
const minAge = Math.min(...ageStarts);
const maxAge = Math.max(...ageEnds);
const minPrice = Math.min(...learningProducts.map((p) => p.price));
const maxPrice = Math.max(...learningProducts.map((p) => p.price));

const pageFaq: FaqItem[] = [
  {
    question: "What age are these learning worksheets for?",
    answer: `These learning worksheets cover ages ${minAge} to ${maxAge} across the range. My First Lines starts at ${minAge}. Each pack states its own age band and school stage.`,
  },
  {
    question: "Are the worksheets free?",
    answer: `The full packs range from ₹${minPrice} to ₹${maxPrice}.`,
  },
  {
    question: "Do these match what school is teaching?",
    answer: (
      <>
        They&apos;re built around what Indian nursery, LKG and UKG classrooms typically cover.
        Browse by stage:{" "}
        <Link href="/nursery-worksheets" className="text-orange-600 hover:underline">
          nursery
        </Link>
        ,{" "}
        <Link href="/lkg-worksheets" className="text-orange-600 hover:underline">
          LKG
        </Link>
        ,{" "}
        <Link href="/ukg-worksheets" className="text-orange-600 hover:underline">
          UKG
        </Link>
        .
      </>
    ),
  },
  {
    question: "How many worksheets should my child do per day?",
    answer:
      "One page a day at nursery level, one to two at LKG, two at UKG. Fifteen to thirty minutes. More than that and it stops being something they want to come back to.",
  },
  {
    question: "My child refuses to do worksheets. Any suggestions?",
    answer:
      "Usually the level is wrong, not the format. Drop back a stage. Also try anything involving scissors — cutting activities get a completely different reception to plain pages. And let them choose which page from a few options.",
  },
  {
    question: "Can I print these for more than one child?",
    answer: (
      <>
        Yes. Unlimited printing for personal and family use. For classroom or commercial use,{" "}
        <Link href="/contact" className="text-orange-600 hover:underline">
          get in touch
        </Link>{" "}
        about a licence.
      </>
    ),
  },
  {
    question: "Do you have English worksheets specifically?",
    answer: (
      <>
        Yes —{" "}
        <Link href="/products/letters-and-words" className="text-orange-600 hover:underline">
          Letters &amp; Words
        </Link>{" "}
        and{" "}
        <Link href="/products/atoz-activity" className="text-orange-600 hover:underline">
          My First Alphabet
        </Link>{" "}
        cover the English side, and{" "}
        <Link href="/products/big-book-of-comparisons" className="text-orange-600 hover:underline">
          Big Book of Comparisons
        </Link>{" "}
        covers vocabulary through opposites. See also{" "}
        <Link href="/alphabet-worksheets" className="text-orange-600 hover:underline">
          alphabet worksheets
        </Link>
        .
      </>
    ),
  },
];

// Plain-text mirrors for the three FAQ answers above that embed <Link>
// elements — FAQPage schema needs plain strings; wording matches the JSX.
const pageFaqForSchema: FaqItem[] = pageFaq.map((item) => {
  if (item.question === "Do these match what school is teaching?") {
    return {
      ...item,
      answer:
        "They're built around what Indian nursery, LKG and UKG classrooms typically cover. Browse by stage: nursery, LKG, UKG.",
    };
  }
  if (item.question === "Can I print these for more than one child?") {
    return {
      ...item,
      answer:
        "Yes. Unlimited printing for personal and family use. For classroom or commercial use, get in touch about a licence.",
    };
  }
  if (item.question === "Do you have English worksheets specifically?") {
    return {
      ...item,
      answer:
        "Yes — Letters & Words and My First Alphabet cover the English side, and Big Book of Comparisons covers vocabulary through opposites. See also alphabet worksheets.",
    };
  }
  return item;
});

export default function LearningWorksheetsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/learning-worksheets`,
      items: learningProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Learning Worksheets", url: `${baseUrl}/learning-worksheets` },
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
        <span className="text-zinc-700">Learning Worksheets</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        Learning Worksheets That Don&apos;t Feel Like Homework
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          A worksheet is a strange thing to hand a four-year-old. It&apos;s a page of work with
          no obvious point, produced by an adult, and the reward for finishing it is another one.
        </p>
        <p>
          The ones that work don&apos;t feel like that. They have something to cut out, or a
          picture hidden inside the counting, or a puzzle where the answer is a drawing. The
          learning is the same. The experience isn&apos;t.
        </p>
        <p>
          These are printable learning worksheets covering the full preschool range —
          alphabets, numbers, shapes, patterns, opposites, matching and cutting — for ages 2 to
          8. Download the PDF, print the pages you need, print them again when you need them
          again.
        </p>
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">Letters and words</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {lettersAndWordsGroup.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">Numbers and counting</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {numbersAndCountingGroup.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">Writing and motor skills</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {writingAndMotorGroup.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">Thinking and reasoning</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {thinkingAndReasoningGroup.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          The four things preschool worksheets should cover
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            Strip away the packaging and preschool learning comes down to four areas. A child
            who&apos;s solid in all four walks into Class 1 fine.
          </p>
          <p>
            <span className="font-medium text-zinc-900">1. Letters and sounds.</span> Recognition,
            then formation, then blending into words. The sequence matters — see{" "}
            <Link href="/alphabet-worksheets" className="text-orange-600 font-medium hover:underline">
              alphabet worksheets
            </Link>{" "}
            for the order that works.
          </p>
          <p>
            <span className="font-medium text-zinc-900">2. Numbers and quantity.</span> Not just
            counting aloud, which is memorised sound, but knowing that &quot;5&quot; means five
            things. The gap between reciting numbers and understanding quantity is where most
            early maths difficulty starts.
          </p>
          <p>
            <span className="font-medium text-zinc-900">3. Hand control.</span> Tracing, cutting,
            sticking, holding a pencil. This is physical development, and it can&apos;t be rushed
            by more worksheets — only by more practice. See{" "}
            <Link href="/tracing-worksheets" className="text-orange-600 font-medium hover:underline">
              tracing worksheets
            </Link>
            .
          </p>
          <p>
            <span className="font-medium text-zinc-900">4. Reasoning.</span> Patterns, opposites,
            sorting, matching, spotting differences. The most neglected of the four and arguably
            the most important, because it&apos;s the only one that teaches a child to notice a
            rule rather than remember a fact.
          </p>
          <p>
            Most parents over-invest in area 1 and under-invest in areas 3 and 4. If you&apos;re
            buying one pack and your child already knows their letters, buy a reasoning one.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Opposites, patterns and shapes — the three most-searched, least-taught
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            <span className="font-medium text-zinc-900">Opposites.</span> Big/small, tall/short,
            full/empty, in/out. They seem trivial and they&apos;re the foundation of comparative
            language, which is the foundation of maths word problems later.{" "}
            {bigBookOfComparisons ? (
              <Link
                href={`/products/${bigBookOfComparisons.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Big Book of Comparisons
              </Link>
            ) : (
              "Big Book of Comparisons"
            )}{" "}
            covers these with picture matching rather than text, so a pre-reader can do them
            alone.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Patterns.</span> Continue the sequence:
            red, blue, red, blue, ___. This is the first time a child is asked to work out a rule
            instead of recall an answer, and it&apos;s genuinely hard the first few times.
            Patterns appear in every Indian preschool syllabus and in class 1, 2 and 3 maths
            papers.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Shapes.</span> Circle, square, triangle,
            rectangle, then 3D. Shape recognition feeds directly into letter recognition — a
            child who can distinguish a triangle from a square has the visual discrimination that
            separating b from d requires.
          </p>
          <p>
            All three are in{" "}
            {timePatternsAndShapes ? (
              <Link
                href={`/products/${timePatternsAndShapes.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Time, Patterns &amp; Shapes
              </Link>
            ) : (
              "Time, Patterns & Shapes"
            )}
            .
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Making worksheets not feel like work
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            <span className="font-medium text-zinc-900">Cut something out.</span> Anything
            involving scissors gets a completely different reception than the same content on a
            plain page. This is why{" "}
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
            gets finished when other packs don&apos;t.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Do it standing up.</span> Tape the page
            to a wall or the fridge. Costs nothing, changes the activity entirely, and is better
            for the shoulder and wrist development that handwriting needs.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Let them pick the page.</span> Print
            four, fan them out, let your child choose. The choosing is what makes it theirs.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Stop early.</span> End while they still
            want more. This is the single highest-leverage thing on this list and the hardest for
            parents to do.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Don&apos;t correct everything.</span>{" "}
            Mark what&apos;s right. A page returned covered in corrections teaches a child that
            worksheets are where you find out you&apos;re wrong.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">How to sequence a year</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  Months 1–3
                </th>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  Months 4–6
                </th>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  Months 7–9
                </th>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  Months 10–12
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-orange-100 px-3 py-2 align-top">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Strokes and lines</li>
                    <li>Counting to 10</li>
                    <li>Shapes</li>
                    <li>Colouring</li>
                  </ul>
                </td>
                <td className="border border-orange-100 px-3 py-2 align-top">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Capital letters</li>
                    <li>Numbers 1–20</li>
                    <li>Matching</li>
                    <li>Colouring</li>
                  </ul>
                </td>
                <td className="border border-orange-100 px-3 py-2 align-top">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Small letters</li>
                    <li>Numbers to 50</li>
                    <li>Opposites</li>
                    <li>Cutting</li>
                  </ul>
                </td>
                <td className="border border-orange-100 px-3 py-2 align-top">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Two &amp; three letter words</li>
                    <li>Numbers to 100</li>
                    <li>Patterns</li>
                    <li>Puzzles</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            The Learning Pack Combo covers roughly this whole progression in one bundle. It
            currently bundles all 9 learning packs for ₹{LEARNING_COMBO_PRICE} —{" "}
            <Link
              href="/products/learning-combo"
              className="text-orange-600 font-medium hover:underline"
            >
              see the Learning Pack Combo
            </Link>
            .
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
            <Link href="/tracing-worksheets" className="hover:underline">
              Tracing worksheets
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
          <li>
            <Link href="/combos" className="hover:underline">
              Combo offers
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
