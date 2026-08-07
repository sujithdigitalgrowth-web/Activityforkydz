import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { breadcrumbJsonLd, collectionPageJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Activity Packs for 5-8 Year Olds — Printable PDF";
const PAGE_DESCRIPTION =
  "Printable activity packs for ages 5-8. Words, numbers to 100, patterns, cutting and comparisons. UKG and early primary level.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/for-5-8-years" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/for-5-8-years",
    type: "website",
  },
};

// The historical pack's 8-product list for this tier had 5 removed
// products (Numbers 1-100, Dot to Dot, Puzzles & Find the Difference,
// Cursive Handwriting, Indian Festivals Colouring). The 3 survivors —
// Time, Patterns & Shapes, Cut Stick and Make, ABC of Character — are
// rendered below.
//
// The pack explicitly authorised adding other current products that
// genuinely overlap 5-8 (naming Reading Comprehension, Flowers, Birds,
// Trees & Plants and Animal Friends as examples). Oceans & Sea Life was
// added on the same basis — it shares the identical 3-8 age range as the
// named Trees & Plants / Animal Friends examples. Products whose live
// range tops out at 6 or below (Alphabet Adventures, Letters & Words,
// Numbers & Counting Mats, Big Book of Comparisons — all 3-6) were left
// off: they're the backbone of the 3-5 tier page and only reach this
// tier's boundary, not its actual range. See the implementation report.
const AGE_PRODUCT_SLUGS = [
  "time-patterns-and-shapes",
  "cut-stick-and-make",
  "abc-of-character",
  "reading-comprehension",
  "flowers-colouring",
  "birds-of-the-world",
  "trees-and-plants",
  "animal-friends",
  "oceans-and-sea-life",
] as const;
const ageProducts = AGE_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

export default function For5To8YearsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/for-5-8-years`,
      items: ageProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Activities for 5-8 Years", url: `${baseUrl}/for-5-8-years` },
    ]),
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
        <span className="text-zinc-700">Activities for 5–8 Years</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        Activity Packs for 5–8 Year Olds
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          From UKG into early primary, worksheets can ask for more: full words, patterns,
          telling time, comparisons, cutting and sticking, and working through a page
          independently.
        </p>
        <p>
          This range covers a wide skill spread, so match the pack to what your child is doing
          at school right now rather than their exact age.
        </p>
      </div>

      <section className="mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {ageProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          What works well at this age
        </h2>
        <ul className="list-disc list-inside space-y-1 text-zinc-700">
          <li>Words — reading and short sentences</li>
          <li>Patterns and sequences</li>
          <li>Telling time</li>
          <li>Comparisons and sorting</li>
          <li>Cutting and sticking</li>
          <li>Working through a page independently</li>
        </ul>
      </section>

      <section className="mt-10 max-w-3xl">
        <p className="text-zinc-700 leading-relaxed">
          Need something easier?{" "}
          <Link href="/for-3-5-years" className="text-orange-600 font-medium hover:underline">
            Browse 3–5 years
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Browse by category
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-orange-600 font-medium">
          <li>
            <Link href="/ukg-worksheets" className="hover:underline">
              UKG worksheets
            </Link>
          </li>
          <li>
            <Link href="/learning-worksheets" className="hover:underline">
              Learning worksheets
            </Link>
          </li>
          <li>
            <Link href="/coloring-packs" className="hover:underline">
              Colouring packs
            </Link>
          </li>
          <li>
            <Link href="/activity-books-for-kids" className="hover:underline">
              Browse all activity books
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
