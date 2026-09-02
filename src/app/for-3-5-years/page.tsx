import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { breadcrumbJsonLd, collectionPageJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Activity Packs for 3-5 Year Olds — Printable PDF";
const PAGE_DESCRIPTION =
  "Printable worksheets and colouring for ages 3-5. Alphabets, counting, tracing and matching. Nursery and LKG level, instant download.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/for-3-5-years" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/for-3-5-years",
    type: "website",
  },
};

// The historical pack lists 9 products for this tier; Matching & Memory
// has since been removed. The 8 survivors are rendered below — their
// current age ranges all genuinely overlap 3-5 (Flowers only at the
// boundary, age 5) — see the implementation report. Cut & Paste Alphabet,
// Daily Practice Bundle and Shapes Activity Book were added later, all
// three genuinely 3-6 years.
const AGE_PRODUCT_SLUGS = [
  "alphabet-adventures",
  "letters-and-words",
  "numbers-and-counting-mats",
  "big-book-of-comparisons",
  "oceans-and-sea-life",
  "birds-of-the-world",
  "trees-and-plants",
  "flowers-colouring",
  "cut-and-paste-alphabet",
  "daily-practice-bundle",
  "shapes-activity-book",
] as const;
const ageProducts = AGE_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

export default function For3To5YearsPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/for-3-5-years`,
      items: ageProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Activities for 3-5 Years", url: `${baseUrl}/for-3-5-years` },
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
        <span className="text-zinc-700">Activities for 3–5 Years</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        Activity Packs for 3–5 Year Olds
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          This is the nursery-to-LKG stretch, where the shift from recognising shapes to
          actually writing letters and counting happens. Most children in this range are ready
          for alphabet formation, counting, tracing and simple matching.
        </p>
        <p>
          Pick by current skill level rather than age alone — a child who&apos;s already writing
          capitals confidently is ready to move up, whatever their birthday says.
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
          <li>Alphabet recognition, then formation</li>
          <li>Counting and early number sense</li>
          <li>Tracing — lines, shapes, letters</li>
          <li>Matching and simple comparisons</li>
          <li>Nursery and LKG level material</li>
        </ul>
      </section>

      <section className="mt-10 max-w-3xl">
        <p className="text-zinc-700 leading-relaxed">
          Younger child?{" "}
          <Link href="/for-2-3-years" className="text-orange-600 font-medium hover:underline">
            2–3 years
          </Link>
          . Older child?{" "}
          <Link href="/for-5-8-years" className="text-orange-600 font-medium hover:underline">
            5–8 years
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
            <Link href="/lkg-worksheets" className="hover:underline">
              LKG worksheets
            </Link>
          </li>
          <li>
            <Link href="/alphabet-worksheets" className="hover:underline">
              Alphabet worksheets
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
