import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { breadcrumbJsonLd, collectionPageJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Activity Packs for 2-3 Year Olds — Printable PDF";
const PAGE_DESCRIPTION =
  "Printable activities for toddlers aged 2-3. Big shapes, first lines, simple colouring. Made for short attention spans and chunky crayons.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/for-2-3-years" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/for-2-3-years",
    type: "website",
  },
};

// The historical pack lists 4 products for this tier. All 4 are still
// live and their current age ranges genuinely overlap 2-3 (My First Lines
// and My First Alphabet start at 2; Animal Friends and Fruits start at 3,
// which is still within this tier) — see the implementation report.
const AGE_PRODUCT_SLUGS = [
  "my-first-lines",
  "atoz-activity",
  "animal-friends",
  "fruits-and-vegetables",
] as const;
const ageProducts = AGE_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

export default function For2To3YearsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/for-2-3-years`,
      items: ageProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Activities for 2-3 Years", url: `${baseUrl}/for-2-3-years` },
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
        <span className="text-zinc-700">Activities for 2–3 Years</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        Activity Packs for 2–3 Year Olds
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          At 2 to 3, sessions are short — five to ten minutes is a full session, not a
          compromise. Look for big shapes, thick lines and simple colouring rather than anything
          that asks for reading or writing letters yet.
        </p>
        <p>
          Go by what your child can do with a crayon today, not by their exact birthday — some
          three-year-olds are still firmly in this stage, and that&apos;s normal.
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
          <li>Short sessions — five to ten minutes at a time</li>
          <li>Large shapes and big colourable areas</li>
          <li>Pre-writing strokes: lines, curves, zigzags</li>
          <li>Simple colouring, one subject per page</li>
          <li>No reading required</li>
        </ul>
      </section>

      <section className="mt-10 max-w-3xl">
        <p className="text-zinc-700 leading-relaxed">
          Older child?{" "}
          <Link href="/for-3-5-years" className="text-orange-600 font-medium hover:underline">
            Browse activities for 3–5 years
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
            <Link href="/nursery-worksheets" className="hover:underline">
              Nursery worksheets
            </Link>
          </li>
          <li>
            <Link href="/tracing-worksheets" className="hover:underline">
              Tracing worksheets
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
