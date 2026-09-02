import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { COLOURING_COMBO_SLUGS, COLOURING_COMBO_PRICE } from "@/lib/bundles";
import ProductCard from "@/components/ProductCard";
import Faq from "@/components/Faq";
import type { FaqItem } from "@/lib/faq";
import { breadcrumbJsonLd, collectionPageJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

const PAGE_TITLE = "Printable Colouring Packs for Kids — PDF Download";
const PAGE_DESCRIPTION =
  "Themed colouring packs for kids: animals, birds, ocean life, fruits, flowers and plants. Printable PDF, thick clean lines, ages 3-9.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/coloring-packs" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/coloring-packs",
    type: "website",
  },
};

// The historical pack listed 8 products; Indian Festivals Colouring has
// since been removed from the catalog. The 7 survivors below are exactly
// every current product with category: "colouring" — see the
// implementation report for the age/price/page-count corrections this
// produced against the pack's stale figures.
const COLOURING_PRODUCT_SLUGS = [
  "animal-friends",
  "birds-of-the-world",
  "oceans-and-sea-life",
  "fruits-and-vegetables",
  "trees-and-plants",
  "flowers-colouring",
  "alphabet-adventures",
] as const;
const colouringProducts = COLOURING_PRODUCT_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

const animalFriends = getProductBySlug("animal-friends");
const treesAndPlants = getProductBySlug("trees-and-plants");
const oceansAndSeaLife = getProductBySlug("oceans-and-sea-life");
const birdsOfTheWorld = getProductBySlug("birds-of-the-world");
const fruits = getProductBySlug("fruits-and-vegetables");
const flowers = getProductBySlug("flowers-colouring");
const alphabetAdventures = getProductBySlug("alphabet-adventures");

// Computed from the live products actually rendered on this page, not
// hardcoded — the pack's stale figures were "3 to 8" years, "₹99" and
// "40 to 104" pages.
const ageStarts = colouringProducts.map((p) => parseInt(p.ageRange, 10));
const ageEnds = colouringProducts.map((p) => {
  const match = p.ageRange.match(/(\d+)\s*-\s*(\d+)/);
  return match ? parseInt(match[2], 10) : parseInt(p.ageRange, 10);
});
const minAge = Math.min(...ageStarts);
const maxAge = Math.max(...ageEnds);
const minPrice = Math.min(...colouringProducts.map((p) => p.price));
const minPages = Math.min(...colouringProducts.map((p) => p.pageCount));
const maxPages = Math.max(...colouringProducts.map((p) => p.pageCount));

// Colouring Combo total page count, computed from the 6 bundled products'
// actual page counts — the pack's stale claim was "roughly 300 pages".
const comboProducts = COLOURING_COMBO_SLUGS.map(getProductBySlug).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);
const comboTotalPages = comboProducts.reduce((sum, p) => sum + p.pageCount, 0);
const comboPricePerPage = (COLOURING_COMBO_PRICE / comboTotalPages).toFixed(2);

const pageFaq: FaqItem[] = [
  {
    question: "Are these colouring pages free?",
    answer: `Full packs start at ₹${minPrice}.`,
  },
  {
    question: "What age are these colouring packs for?",
    answer: `Most suit ${minAge} to ${maxAge} across the range. Each pack states its own age band on the product page — pick the one that matches your child rather than going by the overall range.`,
  },
  {
    question: "Can I print the same page more than once?",
    answer: "Yes, unlimited, forever. Print the same elephant five times if that's what's being asked for.",
  },
  {
    question: "Will these print well in black and white?",
    answer:
      "Yes — they're designed for it. They're line drawings, so colour printing adds nothing. Draft quality is fine and saves ink.",
  },
  {
    question: "How many pages in each colouring pack?",
    answer: `Between ${minPages} and ${maxPages}, depending on the pack. Each product page lists the exact count.`,
  },
  {
    question: "Do the pages have watermarks?",
    answer:
      "No. No watermarks, no website URLs, no ads. Nothing on the page except the drawing and its name label.",
  },
  {
    question: "Do you have Diwali or Ganesh Chaturthi colouring pages?",
    answer:
      "A dedicated Indian Festivals Colouring pack is not currently available in the live catalogue.",
  },
];

export default function ColoringPacksPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = [
    collectionPageJsonLd({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${baseUrl}/coloring-packs`,
      items: colouringProducts.map((product) => ({
        name: product.title,
        url: `${baseUrl}/products/${product.slug}`,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Colouring Packs", url: `${baseUrl}/coloring-packs` },
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
        <span className="text-zinc-700">Colouring Packs</span>
      </nav>

      <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 max-w-3xl">
        Colouring Packs, Sorted by What Your Child Likes
      </h1>

      <div className="mt-4 max-w-3xl space-y-4 text-zinc-700 leading-relaxed">
        <p>
          There is no shortage of free colouring pages on the internet. There is a shortage of
          good ones.
        </p>
        <p>
          Most of what you find is scanned, low resolution, prints grey and fuzzy, and comes with
          a website watermark across the corner. Half of it is drawn with lines too thin for a
          child holding a wax crayon to have any hope of staying inside. And you spend twenty
          minutes hunting for the six decent pages among four hundred.
        </p>
        <p>
          These are packs, not pages. One theme per pack, fifty or so pages, drawn at print
          resolution with outlines heavy enough to survive a three-year-old. Download the PDF,
          print what you want, print it again next week.
        </p>
      </div>

      <section className="mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
          {colouringProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          What makes a colouring page good for a small child
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            <span className="font-medium text-zinc-900">Line weight.</span> This is the whole
            game and almost nobody gets it right. A page drawn with thin elegant lines looks
            better to an adult and is unusable for a four-year-old. Thick outlines give a visible
            target, and staying inside them is what builds the pencil control that handwriting
            later depends on.
          </p>
          <p>
            <span className="font-medium text-zinc-900">One subject per page.</span> A busy scene
            with fourteen things in it is overwhelming. One elephant, large, centred, with space
            around it. Children finish it, feel good, and ask for another.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Big shapes for small hands.</span>{" "}
            Regions large enough to fill without precision. A page where the biggest colourable
            area is the size of a fingernail is a page that gets abandoned.
          </p>
          <p>
            <span className="font-medium text-zinc-900">A name on the page.</span> Every page in
            our packs is labelled — the animal, the bird, the fruit. Your child picks up
            vocabulary while colouring without anyone teaching a lesson.
          </p>
          <p>
            <span className="font-medium text-zinc-900">No watermarks, no ads, no URL across
            the bottom.</span> Nothing on the page except the thing being coloured.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Colouring isn&apos;t just colouring
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>It&apos;s easy to file colouring under &quot;keeps them busy&quot;. It&apos;s doing more than that:</p>
          <p>
            <span className="font-medium text-zinc-900">Pencil control and grip.</span> Filling a
            shape and staying inside a line is the same motor skill as forming a letter. Children
            who colour a lot find handwriting easier — the hand work is already done.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Focus and stamina.</span> Sitting with
            one task for fifteen minutes is a skill, and it&apos;s the skill Class 1 teachers say
            most children arrive without. Colouring builds it more painlessly than anything else.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Vocabulary.</span> Named pages give you
            the reason to talk. What colour is a flamingo? Have you seen a real one?
          </p>
          <p>
            <span className="font-medium text-zinc-900">Colour recognition and decision
            making.</span> Choosing which colour goes where is a genuine decision, made
            independently, with no wrong answer. There aren&apos;t many activities at this age
            that offer that.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Something finished.</span> A completed
            page goes on the fridge. That matters more to a four-year-old than adults tend to
            remember.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          Which pack for which child
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  If your child likes...
                </th>
                <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold">
                  Pick
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-orange-100 px-3 py-2">Animals of any kind</td>
                <td className="border border-orange-100 px-3 py-2">
                  {animalFriends ? (
                    <Link href={`/products/${animalFriends.slug}`} className="text-orange-600 font-medium hover:underline">
                      Animal Friends
                    </Link>
                  ) : (
                    "Animal Friends"
                  )}{" "}
                  — {animalFriends?.pageCount ?? 52} pages
                </td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2">Being outdoors, gardens</td>
                <td className="border border-orange-100 px-3 py-2">
                  {treesAndPlants ? (
                    <Link href={`/products/${treesAndPlants.slug}`} className="text-orange-600 font-medium hover:underline">
                      Trees &amp; Plants
                    </Link>
                  ) : (
                    "Trees & Plants"
                  )}
                </td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2">Fish, water, aquariums</td>
                <td className="border border-orange-100 px-3 py-2">
                  {oceansAndSeaLife ? (
                    <Link href={`/products/${oceansAndSeaLife.slug}`} className="text-orange-600 font-medium hover:underline">
                      Oceans &amp; Sea Life
                    </Link>
                  ) : (
                    "Oceans & Sea Life"
                  )}
                </td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2">Birds, or is a bit older</td>
                <td className="border border-orange-100 px-3 py-2">
                  {birdsOfTheWorld ? (
                    <Link href={`/products/${birdsOfTheWorld.slug}`} className="text-orange-600 font-medium hover:underline">
                      Birds of the World
                    </Link>
                  ) : (
                    "Birds of the World"
                  )}
                </td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2">Food, or is learning food names</td>
                <td className="border border-orange-100 px-3 py-2">
                  {fruits ? (
                    <Link href={`/products/${fruits.slug}`} className="text-orange-600 font-medium hover:underline">
                      Fruits Colouring &amp; Learning
                    </Link>
                  ) : (
                    "Fruits Colouring & Learning"
                  )}
                </td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2">Detail, patterns, is 6+</td>
                <td className="border border-orange-100 px-3 py-2">
                  {flowers ? (
                    <Link href={`/products/${flowers.slug}`} className="text-orange-600 font-medium hover:underline">
                      Flowers Colouring Book
                    </Link>
                  ) : (
                    "Flowers Colouring Book"
                  )}{" "}
                  — 104 designs
                </td>
              </tr>
              <tr>
                <td className="border border-orange-100 px-3 py-2">Letters, and needs the practice</td>
                <td className="border border-orange-100 px-3 py-2">
                  {alphabetAdventures ? (
                    <Link href={`/products/${alphabetAdventures.slug}`} className="text-orange-600 font-medium hover:underline">
                      Alphabet Adventures
                    </Link>
                  ) : (
                    "Alphabet Adventures"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            Can&apos;t choose? The{" "}
            <Link
              href="/products/colouring-combo"
              className="text-orange-600 font-medium hover:underline"
            >
              All 6 Colouring Packs combo
            </Link>{" "}
            is ₹{COLOURING_COMBO_PRICE} for all six packs — around {comboTotalPages} pages in
            total, which works out to about ₹{comboPricePerPage} per page. See all{" "}
            <Link href="/combos" className="text-orange-600 font-medium hover:underline">
              combo offers
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          Printing colouring pages properly
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>
            <span className="font-medium text-zinc-900">Black and white is correct.</span> These
            are outlines. Colour printing adds nothing and costs five times as much.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Standard A4, single-sided.</span>{" "}
            Children press hard and double-sided pages show through.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Plain paper is fine, thicker is
            better.</span> 80gsm works. If your child uses sketch pens or paints, 100gsm+ stops
            bleed-through.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Print several at once.</span> You&apos;ll
            be asked to reprint the good ones.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Draft quality is fine.</span> These are
            line drawings — the difference is invisible and it roughly halves your ink cost.
          </p>
          <p>
            <span className="font-medium text-zinc-900">No printer?</span> Any print shop. A full
            50-page pack is typically ₹50–100 in black and white. Take the PDF on a pen drive.
          </p>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
          A note on free colouring pages
        </h2>
        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <p>We&apos;d rather be straight than pretend free doesn&apos;t exist.</p>
          <p>
            If you want a few pages to keep a child busy for one afternoon, free pages from a
            search will do the job and there&apos;s no reason to pay for that.
          </p>
          <p>
            What you&apos;re buying here is not access to colouring pages — it&apos;s not having
            to hunt for them, not printing something that comes out grey and fuzzy, and having
            fifty pages in a sensible order on a single theme, drawn to a consistent standard.
          </p>
          <p>
            If you&apos;re not sure that&apos;s worth it, full packs start at ₹{minPrice}.
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
            <Link href="/learning-worksheets" className="hover:underline">
              Learning worksheets
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
