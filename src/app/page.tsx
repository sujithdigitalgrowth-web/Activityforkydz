import { products, getBestSellers } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryNav from "@/components/CategoryNav";
import BestSellers from "@/components/BestSellers";
import Faq from "@/components/Faq";
import { generalFaq } from "@/lib/faq";

export default function Home() {
  const bestSellers = getBestSellers(3);

  return (
    <div>
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-8">
        <div className="max-w-2xl">
          <p className="text-orange-600 font-semibold mb-3">Hi, we&apos;re activityforKydz 👋</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold leading-tight text-zinc-900">
            Printable activity packs, made so your kid looks up from a screen — not into one.
          </h1>
          <p className="mt-5 text-lg text-zinc-600 leading-relaxed">
            We make simple, print-at-home PDF packs — coloring, tracing and learning pages
            about the things kids already love, from animals to numbers to festivals.
            Buy one, and it lands in your email in minutes. Print it, hand it over, done.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-10">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          Swipe through our packs
        </h2>
        <HeroCarousel products={products} />
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-10">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          Jump straight to a category
        </h2>
        <CategoryNav products={products} />
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-10">
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

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">Best sellers</h2>
        <p className="text-zinc-600 mb-6">The three packs families come back for the most.</p>
        <BestSellers products={bestSellers} />
      </section>

      <section id="packs" className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-1">
          Our little collection
        </h2>
        <p className="text-zinc-600 mb-6">
          We keep this list small on purpose — every pack here is one we&apos;d actually print
          for our own kids.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
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

      <section className="max-w-5xl mx-auto px-6 py-10">
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
