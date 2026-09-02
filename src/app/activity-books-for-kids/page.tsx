import type { Metadata } from "next";
import Link from "next/link";
import { products, type Product } from "@/lib/products";
import { COMBOS, COLOURING_COMBO_PRICE, LEARNING_COMBO_PRICE } from "@/lib/bundles";
import ProductCard from "@/components/ProductCard";
import ComboCard from "@/components/ComboCard";
import Faq from "@/components/Faq";
import type { FaqItem } from "@/lib/faq";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Activity Books for Kids — Printable PDF from Rs.69";
const PAGE_DESCRIPTION =
  "Printable activity books for kids aged 1-9. Colouring, tracing, cutting, matching and counting. Buy once, print forever. From Rs.69 per pack.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/activity-books-for-kids" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/activity-books-for-kids",
    type: "website",
  },
};

// Groups by each product's exact current ageRange string, ordered by
// starting age — this reflects the real 16-product catalog rather than
// inventing new age bands. See the implementation report for how this
// compares to the SEO pack's original 21-product assumption.
function groupByAge(list: Product[]): [string, Product[]][] {
  const groups = new Map<string, Product[]>();
  for (const product of list) {
    const bucket = groups.get(product.ageRange) ?? [];
    bucket.push(product);
    groups.set(product.ageRange, bucket);
  }
  return [...groups.entries()].sort(
    ([a], [b]) => parseInt(a, 10) - parseInt(b, 10)
  );
}

// Every fact below is computed from the live catalog rather than hardcoded,
// so this page can't silently go stale the next time a product is added,
// removed, or repriced — exactly the failure mode that made the original
// SEO pack's "from ₹69" / "twenty-one" / "30–104 pages" / "2 to 8" claims
// wrong against the current 16-product catalog.
const minPrice = Math.min(...products.map((p) => p.price));
const maxPrice = Math.max(...products.map((p) => p.price));
const minPages = Math.min(...products.map((p) => p.pageCount));
const maxPages = Math.max(...products.map((p) => p.pageCount));

function parseAgeRange(ageRange: string): [number, number] {
  const match = ageRange.match(/(\d+)\D+(\d+)/);
  return match ? [Number(match[1]), Number(match[2])] : [0, 0];
}
const parsedAges = products.map((p) => parseAgeRange(p.ageRange));
const minAge = Math.min(...parsedAges.map(([start]) => start));
const maxAge = Math.max(...parsedAges.map(([, end]) => end));

const comparisonRows: [string, string, string][] = [
  ["Price", `₹${minPrice}–₹${maxPrice}`, "₹250–600"],
  ["Repeat the same page", "Unlimited", "Once"],
  ["Second child", "Free", "Buy another"],
  ["Arrives", "About a minute", "2–5 days"],
  ["Storage", "A file", "A shelf"],
  ["Lost or damaged", "Reprint it", "Buy another"],
  ["Take on holiday", "Print 5 pages", "Carry the book"],
  ["Choose which pages", "Yes", "No"],
];

const startingPoints: { audience: string; slug: string; label: string }[] = [
  { audience: "2–3 and hasn't held a pencil much", slug: "my-first-lines", label: "My First Lines" },
  { audience: "3–4 and learning letters", slug: "alphabet-adventures", label: "Alphabet Adventures" },
  { audience: "4–5 and starting to read", slug: "letters-and-words", label: "Letters & Words" },
  { audience: "5–6 and preparing for Class 1", slug: "time-patterns-and-shapes", label: "Time, Patterns & Shapes" },
  { audience: "Any age, just wants to colour", slug: "animal-friends", label: "Animal Friends" },
];

// Plain-text mirrors of the two answers below that embed a real <Link> —
// FAQPage schema needs plain strings, and the wording here must stay
// word-for-word identical to the JSX versions rendered in the FAQ list.
const classroomAnswerText =
  "For a home or small personal setting, yes, unlimited. For classroom or commercial use please get in touch — we're happy to sort out a licence, and it's usually straightforward.";
const notHappyAnswerText =
  "Try the free samples first, which is exactly what they're for. If you've bought a pack and it isn't working, email us — our refund policy covers digital downloads and we'd rather sort it out than have you stuck with something unused.";

const pageFaq: FaqItem[] = [
  {
    question: "How much do the activity books cost?",
    answer: `Individual packs range from ₹${minPrice} to ₹${maxPrice} depending on page count. The Colouring Combo bundles all 6 colouring packs for ₹${COLOURING_COMBO_PRICE}, and the Learning Combo bundles all 9 learning packs for ₹${LEARNING_COMBO_PRICE} — both a flat price instead of buying each one separately. Add any 2 eligible packs to your cart and the cheaper one is automatically free.`,
  },
  {
    question: "Do I get a physical book?",
    answer:
      "No. These are PDF files delivered by email, designed to be printed at home or at a print shop. That's what makes unlimited printing possible and the price a fraction of a physical book.",
  },
  {
    question: "How many pages in each activity book?",
    answer: `Between ${minPages} and ${maxPages} depending on the pack. Each product page lists the exact count and what type of pages are included.`,
  },
  {
    question: "Can I print these for my class or playgroup?",
    answer: (
      <>
        For a home or small personal setting, yes, unlimited. For classroom or commercial use
        please <Link href="/contact" className="text-orange-600 hover:underline">get in touch</Link> —
        we&apos;re happy to sort out a licence, and it&apos;s usually straightforward.
      </>
    ),
  },
  {
    question: "What if my child doesn't like it?",
    answer: (
      <>
        Try the free samples first, which is exactly what they&apos;re for. If you&apos;ve bought
        a pack and it isn&apos;t working, email us — our{" "}
        <Link href="/refund-policy" className="text-orange-600 hover:underline">
          refund policy
        </Link>{" "}
        covers digital downloads and we&apos;d rather sort it out than have you stuck with
        something unused.
      </>
    ),
  },
  {
    question: "What age are these activity books for?",
    answer: `Our packs cover ages ${minAge} to ${maxAge}, depending on the pack — each product page lists its specific age range.`,
  },
  {
    question: "Do I need any special software?",
    answer: "No. Any device that opens a PDF will do — phone, laptop, tablet. No app, no account, no login.",
  },
];

// Plain-text version of the FAQ for FAQPage schema — same questions, same
// answers, just with the two linked answers above swapped for their
// word-for-word plain-text mirrors (schema.org text fields want plain text).
const pageFaqForSchema: FaqItem[] = pageFaq.map((item) => {
  if (item.question === "Can I print these for my class or playgroup?") {
    return { ...item, answer: classroomAnswerText };
  }
  if (item.question === "What if my child doesn't like it?") {
    return { ...item, answer: notHappyAnswerText };
  }
  return item;
});

export default function ActivityBooksForKidsPage() {
  const baseUrl = getBaseUrl();
  const ageGroups = groupByAge(products);

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/activity-books-for-kids`,
      items: products.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Activity Books for Kids", url: `${baseUrl}/activity-books-for-kids` },
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
        <span className="text-zinc-700">Activity Books for Kids</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        Activity Books You Print, Not Ones You Store
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          A physical activity book has one page per activity. Your child does it, it&apos;s
          done, and you own a book with a page torn out and crayon on the cover.
        </p>
        <p>
          A printable one works differently. Buy it once, print any page as many times as you
          want, for as many children as you want, forever. The four-year-old who wants to
          colour the elephant again gets to colour the elephant again. The younger sibling gets
          the whole book brand new in two years&apos; time.
        </p>
        <p>
          Every pack here is a complete activity book as a PDF. Colouring, tracing, cutting,
          matching, counting, puzzles. Ages 1 to 9. Delivered by email in about a minute.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-zinc-900 mb-1">
          Combo deals
        </h2>
        <p className="text-zinc-600 mb-6">
          Bundle a few packs together and pay less than buying them one by one.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {COMBOS.map((combo) => (
            <ComboCard key={combo.routeSlug} combo={combo} />
          ))}
        </div>
      </section>

      {ageGroups.map(([ageRange, groupProducts]) => (
        <section key={ageRange} className="mt-10">
          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-zinc-900 mb-4">
            Ages {ageRange}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
            {groupProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Printable vs a physical activity book
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-4">
          Not a fair fight, honestly, but here&apos;s the actual comparison:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold"></th>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  Printable PDF
                </th>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  Physical activity book
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([label, pdf, physical]) => (
                <tr key={label}>
                  <td className="border border-orange-100 px-3 py-2 font-medium text-zinc-900">{label}</td>
                  <td className="border border-orange-100 px-3 py-2 text-zinc-700">{pdf}</td>
                  <td className="border border-orange-100 px-3 py-2 text-zinc-700">{physical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-zinc-700 leading-relaxed mt-4">
          The one genuine advantage of a physical book: it&apos;s bound, so nothing gets lost,
          and some children like the object. If that matters to you, print a pack and get it
          spiral-bound at a local shop for about ₹40. You get both.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          What makes a good activity book at this age
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-4">
          Having made a full range of these, a few things matter more than they look:
        </p>
        <div className="space-y-3 text-zinc-700 leading-relaxed">
          <p>
            <strong className="text-zinc-900">Thick outlines.</strong> A three-year-old with a
            wax crayon cannot stay inside a 0.5pt line and will stop trying. Every colouring
            page we make uses lines heavy enough to survive a crayon and a heavy hand.
          </p>
          <p>
            <strong className="text-zinc-900">One thing per page.</strong> Six small activities
            on one sheet looks like value and works badly. Children finish one, feel done, and
            the rest of the page becomes a source of pressure.
          </p>
          <p>
            <strong className="text-zinc-900">A sensible order.</strong> Most activity books are
            a random pile. Ours are sequenced — easier pages first, and skills that build on
            each other in the order they build.
          </p>
          <p>
            <strong className="text-zinc-900">White space.</strong> Cramming the page reduces
            how long a child stays with it. Sounds backwards, it isn&apos;t.
          </p>
          <p>
            <strong className="text-zinc-900">Nothing to read.</strong> For under-fives, any
            instruction that requires reading means a parent has to be there. Pages should be
            self-explanatory from the picture.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          How the printing actually works
        </h2>
        <ol className="space-y-2 text-zinc-700 list-decimal list-inside">
          <li>Pick your pack and pay by UPI or card</li>
          <li>The PDF arrives by email, usually within a minute</li>
          <li>Open it on a phone, laptop or tablet</li>
          <li>Print the pages you want — A4, single-sided, black and white is fine for worksheets</li>
          <li>Save the file. Print again next month, next year, or for the next child</li>
        </ol>
        <p className="text-zinc-700 leading-relaxed mt-4">
          No printer at home? Any local print shop will do it. A full pack costs ₹50–150
          depending on page count. Take the PDF on a pen drive or email it. Ask for spiral
          binding if you want it to feel like a book.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Which one should you buy first
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-4">
          If you&apos;re starting from nothing and your child is:
        </p>
        <ul className="space-y-2 text-zinc-700">
          {startingPoints.map((item) => (
            <li key={item.slug}>
              {item.audience} →{" "}
              <Link href={`/products/${item.slug}`} className="text-orange-600 font-medium hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-zinc-700 leading-relaxed mt-4">
          Every product page has preview images so you can see exactly what&apos;s inside before
          you buy.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          More from activityforKydz
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-orange-600 font-medium">
          <li>
            <Link href="/combos" className="hover:underline">
              Combo deals
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact &amp; support
            </Link>
          </li>
          <li>
            <Link href="/refund-policy" className="hover:underline">
              Refund policy
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
