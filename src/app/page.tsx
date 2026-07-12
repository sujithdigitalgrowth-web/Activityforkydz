import type { Metadata } from "next";
import { products, getBestSellers } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryNav from "@/components/CategoryNav";
import BestSellers from "@/components/BestSellers";
import Faq from "@/components/Faq";
import { generalFaq } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute string, not a template-relative one: Next.js doesn't apply the
  // root layout's title template to app/page.tsx since they're the same segment.
  title: "Printable Coloring Pages & Activity Packs for Kids | activityforKydz",
  description:
    "Buy printable PDF coloring pages and learning activity packs for kids — animal & bird coloring pages, numbers practice, Ganesh Chaturthi and festival colouring, and more. Instant download, print at home, no app needed.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const bestSellers = getBestSellers(3);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaq)) }}
      />
      <h1 className="sr-only">
        Printable Coloring Pages &amp; Activity Packs for Kids | activityforKydz
      </h1>

      <section className="max-w-[1400px] mx-auto px-6 pt-6 pb-10">
        <HeroCarousel products={products} />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 pb-10">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          Jump straight to a category
        </h2>
        <CategoryNav products={products} />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 pb-10">
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="rounded-xl bg-white border border-orange-100 p-4">
            <p className="font-heading text-2xl font-semibold text-orange-600">₹49-99</p>
            <p className="text-sm text-zinc-600 mt-1">per pack, less than a snack</p>
          </div>
          <div className="rounded-xl bg-white border border-orange-100 p-4">
            <p className="font-heading text-2xl font-semibold text-orange-600">Instant</p>
            <p className="text-sm text-zinc-600 mt-1">delivered to your email right after payment</p>
          </div>
          <div className="rounded-xl bg-white border border-orange-100 p-4">
            <p className="font-heading text-2xl font-semibold text-orange-600">Print &amp; go</p>
            <p className="text-sm text-zinc-600 mt-1">no app, no login, no screen time added</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">Best sellers</h2>
        <p className="text-zinc-600 mb-6">The three packs families come back for the most.</p>
        <BestSellers products={bestSellers} />
      </section>

      <section id="packs" className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Our little collection
        </h2>
        <p className="text-zinc-600 mb-6">
          We keep this list small on purpose — every pack here is one we&apos;d actually print
          for our own kids.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-8 max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-2">
            Why printable, not another app?
          </h2>
          <p className="text-zinc-700 leading-relaxed">
            Every parent already knows the fight of pulling a phone away. These packs are
            built to be printed and handed over as paper — something to hold, color outside
            the lines on, and stick on the fridge. No notifications, no autoplay, no next
            episode. Just paper, crayons and a bit of quiet.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Common questions
        </h2>
        <p className="text-zinc-600 mb-6">Everything parents usually ask before their first order.</p>
        <div className="max-w-3xl">
          <Faq items={generalFaq} />
        </div>
      </section>
    </div>
  );
}
