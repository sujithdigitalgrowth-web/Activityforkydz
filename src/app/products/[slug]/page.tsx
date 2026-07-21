import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import BuyBox from "@/components/BuyBox";
import ProductGallery from "@/components/ProductGallery";
import SocialProof from "@/components/SocialProof";
import Faq from "@/components/Faq";
import ViewItemTracker from "@/components/ViewItemTracker";
import { generalFaq } from "@/lib/faq";
import { breadcrumbJsonLd, faqJsonLd, getBaseUrl, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = product.seoTitle ?? `${product.title} — Printable PDF (${product.pageCount} Pages)`;
  const description =
    product.seoDescription ??
    `${product.tagline}. ${product.pageCount} printable pages for ages ${product.ageRange}, instant PDF download for ₹${product.price}. No app needed — print at home.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title, description },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = (product.relatedSlugs ?? [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && !p?.comingSoon);

  const baseUrl = getBaseUrl();
  const jsonLd = [
    productJsonLd(product),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: product.title, url: `${baseUrl}/products/${product.slug}` },
    ]),
    faqJsonLd(generalFaq),
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewItemTracker product={product} />

      <nav className="text-sm text-zinc-500 mb-4">
        <Link href="/" className="hover:text-orange-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-700">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
        <div className="lg:col-span-3">
          <ProductGallery product={product} mainClassName="rounded-2xl aspect-[16/9] w-full" />
        </div>
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 h-full">
            <BuyBox product={product} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl">
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

        <p className="text-zinc-700 leading-relaxed mt-6">{product.description}</p>

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

        {product.longDescription && (
          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
              More about this pack
            </h2>
            <p className="text-zinc-700 leading-relaxed">{product.longDescription}</p>
          </section>
        )}

        <section className="mt-8">
          <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
            Common questions
          </h2>
          <Faq items={generalFaq} />
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
              You might also like
            </h2>
            <ul className="space-y-2">
              {relatedProducts.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/products/${related.slug}`}
                    className="text-orange-600 font-medium hover:underline"
                  >
                    {related.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
