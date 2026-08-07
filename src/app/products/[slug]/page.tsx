import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import BuyBox from "@/components/BuyBox";
import ProductGallery from "@/components/ProductGallery";
import SocialProof from "@/components/SocialProof";
import Faq from "@/components/Faq";
import ViewItemTracker from "@/components/ViewItemTracker";
import { generalFaq, generalFaqForSchema } from "@/lib/faq";
import { breadcrumbJsonLd, faqJsonLd, getBaseUrl, productJsonLd } from "@/lib/seo";
import {
  getCategoryPage,
  getRelatedProducts,
  PRACTISE_BY_SLUG,
  schoolStageLabel,
} from "@/lib/product-page";

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
    openGraph: {
      title,
      description,
      url: `/products/${product.slug}`,
      type: "website",
    },
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

  const categoryPage = getCategoryPage(product.slug);
  const { related: relatedProducts, combo: relatedCombo } = getRelatedProducts(product);
  const practise = PRACTISE_BY_SLUG[product.slug] ?? [];
  const stage = schoolStageLabel(product.ageRange);

  const baseUrl = getBaseUrl();
  const jsonLd = [
    productJsonLd(product),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: categoryPage.label, url: `${baseUrl}${categoryPage.href}` },
      { name: product.title, url: `${baseUrl}/products/${product.slug}` },
    ]),
    faqJsonLd(generalFaqForSchema),
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
        <Link href={categoryPage.href} className="hover:text-orange-600">
          {categoryPage.label}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-700">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
        <div className="lg:col-span-3">
          {product.galleryImages && product.galleryImages.length > 0 && (
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">
              Look inside the pack
            </p>
          )}
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

        <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/50 p-5 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-sm">
          <div>
            <p className="text-zinc-500">Ages</p>
            <p className="font-medium text-zinc-900">{product.ageRange}</p>
          </div>
          <div>
            <p className="text-zinc-500">Pages</p>
            <p className="font-medium text-zinc-900">{product.pageCount}</p>
          </div>
          <div>
            <p className="text-zinc-500">Format</p>
            <p className="font-medium text-zinc-900">PDF, A4, print-ready</p>
          </div>
          <div>
            <p className="text-zinc-500">School stage</p>
            <p className="font-medium text-zinc-900">{stage}</p>
          </div>
          <div>
            <p className="text-zinc-500">Delivery</p>
            <p className="font-medium text-zinc-900">Emailed instantly</p>
          </div>
          <div>
            <p className="text-zinc-500">Printing</p>
            <p className="font-medium text-zinc-900">Unlimited, forever</p>
          </div>
          <div>
            <p className="text-zinc-500">Price</p>
            <p className="font-medium text-zinc-900">₹{product.price}</p>
          </div>
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

        {practise.length > 0 && (
          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
              What your child will practise
            </h2>
            <ul className="space-y-2">
              {practise.map((item) => (
                <li key={item} className="flex gap-2 text-zinc-700">
                  <span className="text-orange-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

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

        {(relatedProducts.length > 0 || relatedCombo) && (
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
              {relatedCombo && (
                <li>
                  <Link
                    href={`/products/${relatedCombo.routeSlug}`}
                    className="text-orange-600 font-medium hover:underline"
                  >
                    {relatedCombo.fullLabel} — ₹{relatedCombo.price}
                  </Link>
                </li>
              )}
            </ul>
          </section>
        )}

        <section className="mt-8 pt-6 border-t border-orange-100">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-orange-600 font-medium">
            <li>
              <Link href={categoryPage.href} className="hover:underline">
                Browse all {categoryPage.label.toLowerCase()}
              </Link>
            </li>
            <li>
              <Link href="/combos" className="hover:underline">
                Save with a bundle
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
