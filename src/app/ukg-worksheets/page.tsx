import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Faq from "@/components/Faq";
import type { FaqItem } from "@/lib/faq";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "UKG Worksheets PDF — CBSE Pattern English & Maths";
const PAGE_DESCRIPTION =
  "Printable UKG worksheets for 5-6 year olds. English, maths, number names and EVS in CBSE pattern. Instant PDF download, unlimited printing.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/ukg-worksheets" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/ukg-worksheets",
    type: "website",
  },
};

// The historical SEO pack expected 6 products here; numbers-1-to-100,
// puzzles-and-find-the-difference and cursive-handwriting have since been
// removed (no real assets existed for them). numbers-and-counting-mats and
// reading-comprehension are added because they genuinely cover UKG-level
// number-name and sentence-reading practice, filling part of the gap left
// by the removed Numbers 1-100 pack — see the implementation report.
// Wait, What? Animal Facts was added later on the same basis as Reading
// Comprehension — it's a genuine reading-practice book that also covers
// the animals topic in UKG EVS. Daily Practice Bundle spans into
// UKG-level content (its Age 6-7 days: addition, subtraction, sequencing).
const UKG_PRODUCT_SLUGS = [
  "time-patterns-and-shapes",
  "letters-and-words",
  "numbers-and-counting-mats",
  "reading-comprehension",
  "cut-stick-and-make",
  "wait-what-animal-facts",
  "daily-practice-bundle",
] as const;
const ukgProducts = UKG_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

const timePatternsShapes = getProductBySlug("time-patterns-and-shapes");
const lettersAndWords = getProductBySlug("letters-and-words");
const numbersAndCounting = getProductBySlug("numbers-and-counting-mats");
const treesAndPlants = getProductBySlug("trees-and-plants");
const animalFriends = getProductBySlug("animal-friends");
const fruitsAndVegetables = getProductBySlug("fruits-and-vegetables");

// Plain-text mirrors of the two FAQ answers below that embed real <Link>s —
// FAQPage schema needs plain strings; wording must stay identical to the
// JSX versions rendered in the visible FAQ.
const numberNamesAnswerText = numbersAndCounting
  ? "Not a dedicated 1–100 pack — that's not currently available. Our Numbers and Counting mats do include number-name practice, from 0 to 20, alongside tracing and ten-frame counting."
  : "Not currently — a dedicated number-names pack isn't available in the catalog right now.";
const evsAnswerText =
  "Partly. Trees & Plants, Animal Friends and Fruits cover the plants, animals and food topics that appear in UKG EVS, with colouring and labelling. We don't currently sell a dedicated EVS worksheet pack.";

const pageFaq: FaqItem[] = [
  {
    question: "What age is UKG?",
    answer:
      "UKG (Upper Kindergarten) is usually 5 to 6 years in Indian schools, the year before Class 1. Some schools call it Senior KG or Prep 2.",
  },
  {
    question: "Are these worksheets CBSE syllabus for UKG?",
    answer:
      "CBSE doesn't prescribe a formal UKG syllabus — its curriculum starts at Class 1. These follow the CBSE-pattern convention that CBSE-affiliated schools use, based on NCERT preschool guidance and the Vidya Pravesh school-readiness framework. They're supplementary practice aligned to what your child is being taught, not official board material.",
  },
  {
    question: "Do you have UKG maths worksheets with number names?",
    answer: numbersAndCounting ? (
      <>
        Not a dedicated 1–100 pack — that&apos;s not currently available. Our{" "}
        <Link href={`/products/${numbersAndCounting.slug}`} className="text-orange-600 hover:underline">
          Numbers and Counting
        </Link>{" "}
        mats do include number-name practice, from 0 to 20, alongside tracing and ten-frame
        counting.
      </>
    ) : (
      numberNamesAnswerText
    ),
  },
  {
    question: "Do you have EVS worksheets for UKG?",
    answer: (
      <>
        Partly.{" "}
        {treesAndPlants && (
          <>
            <Link href={`/products/${treesAndPlants.slug}`} className="text-orange-600 hover:underline">
              Trees &amp; Plants
            </Link>
            ,{" "}
          </>
        )}
        {animalFriends && (
          <>
            <Link href={`/products/${animalFriends.slug}`} className="text-orange-600 hover:underline">
              Animal Friends
            </Link>{" "}
            and{" "}
          </>
        )}
        {fruitsAndVegetables && (
          <Link href={`/products/${fruitsAndVegetables.slug}`} className="text-orange-600 hover:underline">
            Fruits
          </Link>
        )}{" "}
        cover the plants, animals and food topics that appear in UKG EVS, with colouring and
        labelling. We don&apos;t currently sell a dedicated EVS worksheet pack.
      </>
    ),
  },
  {
    question: "My child can do LKG work easily. Should I skip to UKG?",
    answer:
      "Probably yes, at least for the subjects they're strong in. There's no benefit to repeating material they've mastered. It's fine to be doing UKG maths and LKG English at the same time — most children aren't evenly developed across subjects.",
  },
  {
    question: "Are these enough on their own, or do I need school books too?",
    answer:
      "These are supplementary. School books provide the sequence and the assessment; these provide the extra repetition that most children need and that school homework doesn't give enough of.",
  },
];

const pageFaqForSchema: FaqItem[] = pageFaq.map((item) => {
  if (item.question === "Do you have UKG maths worksheets with number names?") {
    return { ...item, answer: numberNamesAnswerText };
  }
  if (item.question === "Do you have EVS worksheets for UKG?") {
    return { ...item, answer: evsAnswerText };
  }
  return item;
});

export default function UkgWorksheetsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/ukg-worksheets`,
      items: ukgProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "UKG Worksheets", url: `${baseUrl}/ukg-worksheets` },
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
        <span className="text-zinc-700">UKG Worksheets</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        UKG Worksheets, CBSE Pattern
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          UKG is the bridge year. Everything in it exists to make Class 1 survivable —
          sentence writing, numbers to 100, number names, shapes, patterns, telling the time,
          and sitting through a proper school day.
        </p>
        <p>
          It&apos;s also the year the workload jumps. Most parents notice their child suddenly
          coming home with homework that assumes skills nobody explicitly taught — like
          knowing that &quot;forty-seven&quot; and &quot;47&quot; are the same thing, or being
          able to continue a pattern without being shown the rule.
        </p>
        <p>
          These printable UKG worksheets cover the full range: English, maths, number names,
          shapes, patterns and EVS-adjacent topics. Written to CBSE-pattern preschool
          convention. Download, print, and print again as many times as you need.
        </p>
      </div>

      <section className="mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {ukgProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          What UKG covers
        </h2>

        <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">English</h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-700">
          <li>Small letters a–z, written fluently</li>
          <li>Three and four letter words</li>
          <li>Beginning, middle and ending sounds</li>
          <li>Simple sentence formation — &quot;The cat is big.&quot;</li>
          <li>Naming words, action words, describing words</li>
          <li>Opposites and rhyming words</li>
        </ul>

        <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">Maths</h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-700">
          <li>Numbers 1–100, writing and reading</li>
          <li>Number names — one, two, three… up to at least twenty</li>
          <li>Before, after, between up to 100</li>
          <li>Addition and subtraction to 20</li>
          <li>Shapes — 2D and introducing 3D</li>
          <li>Patterns — colour, shape, size and number sequences</li>
          <li>Measurement — longer/shorter, heavier/lighter</li>
          <li>Telling time — o&apos;clock and half past</li>
        </ul>

        <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2">
          EVS / General awareness
        </h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-700">
          <li>Body parts, family, food groups</li>
          <li>Animals and their homes</li>
          <li>Plants, seasons, festivals</li>
          <li>Good habits and safety</li>
        </ul>

        <p className="text-zinc-700 leading-relaxed mt-6">
          The two areas children most commonly need extra help with in UKG are number names
          (there&apos;s no logic to them, it&apos;s pure memorisation) and patterns (which
          require noticing a rule rather than repeating a fact — a genuinely different kind of
          thinking).
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">Where to start</h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          {timePatternsShapes && (
            <p>
              For patterns, shapes and time — the three UKG topics that trip children up most —{" "}
              <Link
                href={`/products/${timePatternsShapes.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Time, Patterns &amp; Shapes Workbook
              </Link>{" "}
              covers all three in one pack.
            </p>
          )}
          {lettersAndWords && (
            <p>
              For English,{" "}
              <Link
                href={`/products/${lettersAndWords.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Letters &amp; Words
              </Link>{" "}
              covers word building and missing letters.
            </p>
          )}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          About &quot;CBSE pattern&quot; — what it does and doesn&apos;t mean
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            Being straight with you, because this phrase is used loosely by everyone selling
            preschool material:
          </p>
          <p>
            CBSE has no prescribed syllabus for UKG. The board&apos;s formal curriculum starts
            at Class 1. What everyone calls &quot;CBSE pattern UKG&quot; is a widely-followed
            convention derived from NCERT&apos;s preschool curriculum and the Vidya Pravesh
            three-month school-readiness module that CBSE schools use at the start of Class 1.
          </p>
          <p>
            That framework is genuinely useful — it tells you what Class 1 will assume your
            child already knows. Our UKG material is built against it. But nobody can sell you
            officially CBSE-certified UKG worksheets, and any seller claiming to is telling you
            something untrue.
          </p>
          <p>
            What actually matters: does the difficulty match your child, and does it cover
            number names, patterns and sentence formation. Those are the three things Class 1
            assumes.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          Getting ready for Class 1
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-3">
          By the end of UKG, aim for your child to be able to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-700 mb-4">
          <li>Write all letters, capital and small, without copying</li>
          <li>Read simple sentences aloud</li>
          <li>Write numbers 1–100</li>
          <li>Say and write number names to at least 20</li>
          <li>Continue a pattern and explain the rule</li>
          <li>Add and subtract within 20</li>
          <li>Tell time to the half hour</li>
          <li>Work independently for 20–25 minutes</li>
          <li>Hold scissors and cut on a line</li>
        </ul>
        <p className="text-zinc-700 leading-relaxed">
          The last two are the ones parents underweight. Class 1 teachers consistently report
          that the children who struggle aren&apos;t the ones behind on letters — they&apos;re
          the ones who can&apos;t work without an adult beside them.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          How much practice
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            Twenty to thirty minutes a day, five days a week, is right for UKG. That&apos;s
            typically two worksheet pages.
          </p>
          <p>
            Mix subjects within the week rather than doing a solid block of maths. Interleaving
            improves retention noticeably at this age, and it stops your child deciding they
            &quot;don&apos;t like maths&quot; because that&apos;s what Tuesday always is.
          </p>
          <p>
            Check the product page&apos;s preview images to see the level before buying a full
            pack.
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
            <Link href="/products/trees-and-plants" className="hover:underline">
              Trees &amp; Plants
            </Link>
          </li>
          <li>
            <Link href="/products/animal-friends" className="hover:underline">
              Animal Friends
            </Link>
          </li>
          <li>
            <Link href="/products/fruits-and-vegetables" className="hover:underline">
              Fruits Colouring &amp; Learning
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
