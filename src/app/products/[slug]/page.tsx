import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import BuyBox from "@/components/BuyBox";
import ProductVisual from "@/components/ProductVisual";
import SocialProof from "@/components/SocialProof";
import Faq from "@/components/Faq";
import { generalFaq } from "@/lib/faq";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <ProductVisual
        product={product}
        className="rounded-2xl h-40 sm:h-56 w-full mb-8"
        emojiClassName="text-8xl"
      />

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="font-heading text-3xl font-semibold text-zinc-900">{product.title}</h1>
          <p className="text-lg text-zinc-600 mt-2">{product.tagline}</p>
          <div className="mt-3">
            <SocialProof product={product} />
          </div>

          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 font-medium">
              {product.pageCount} pages
            </span>
            <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 font-medium">
              Ages {product.ageRange}
            </span>
            <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 font-medium">
              Instant PDF download
            </span>
          </div>

          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-2">
              About this pack
            </h2>
            <p className="text-zinc-700 leading-relaxed">{product.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
              What&apos;s inside
            </h2>
            <ul className="space-y-2">
              {product.whatsInside.map((item) => (
                <li key={item} className="flex gap-2 text-zinc-700">
                  <span className="text-orange-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
              Why it&apos;s worth printing
            </h2>
            <ul className="space-y-2">
              {product.whyItMatters.map((item) => (
                <li key={item} className="flex gap-2 text-zinc-700">
                  <span className="text-orange-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
              How delivery works
            </h2>
            <ol className="space-y-2 text-zinc-700 list-decimal list-inside">
              <li>Pay securely with UPI, card or netbanking via Razorpay.</li>
              <li>We email your download link within a minute of payment.</li>
              <li>Open it on any device, print at home, and you&apos;re set.</li>
            </ol>
          </section>

          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
              Common questions
            </h2>
            <Faq items={generalFaq} />
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <BuyBox product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
