import Link from "next/link";
import { getComboProducts, type ComboDef } from "@/lib/bundles";
import ProductVisual from "@/components/ProductVisual";
import AddComboButton from "@/components/AddComboButton";
import Faq from "@/components/Faq";
import { generalFaq } from "@/lib/faq";
import { breadcrumbJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

export default function ComboProductPage({ combo }: { combo: ComboDef }) {
  const comboProducts = getComboProducts(combo);
  const originalTotal = comboProducts.reduce((sum, p) => sum + p.price, 0);
  const totalPages = comboProducts.reduce((sum, p) => sum + p.pageCount, 0);
  const savings = originalTotal - combo.price;
  const baseUrl = getBaseUrl();
  const jsonLd = [
    faqJsonLd(generalFaq),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: combo.fullLabel, url: `${baseUrl}/products/${combo.routeSlug}` },
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
        <span className="text-zinc-700">{combo.fullLabel}</span>
      </nav>

      <div className="max-w-3xl">
        <span className="inline-block rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-sm font-semibold mb-3">
          Combo deal
        </span>
        <h1 className="font-heading text-3xl font-semibold text-zinc-900">{combo.fullLabel}</h1>
        <p className="text-lg text-zinc-600 mt-2">
          {combo.label} — {comboProducts.map((p) => p.cardTitle ?? p.title).join(", ")} —{" "}
          {totalPages} pages in total.
        </p>

        <div className="flex items-baseline gap-3 mt-5">
          <span className="text-3xl font-bold text-orange-600">₹{combo.price}</span>
          <span className="text-lg text-zinc-400 line-through">₹{originalTotal}</span>
          <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-sm font-semibold">
            Save ₹{savings}
          </span>
        </div>

        <div className="mt-5">
          <AddComboButton combo={combo} className="px-6 py-3 text-base" />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-4">
          What&apos;s included
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {comboProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group rounded-xl border border-orange-100 bg-white overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <ProductVisual
                product={product}
                className="aspect-[3/2] w-full"
                emojiClassName="text-4xl"
              />
              <div className="p-2 sm:p-2.5">
                <p className="text-xs sm:text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 group-hover:text-orange-700 transition-colors">
                  {product.cardTitle ?? product.title}
                </p>
                <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                  {product.pageCount} pages · ₹{product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-3xl">
        <section className="mt-8">
          <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
            How the combo works
          </h2>
          <ul className="space-y-2">
            <li className="flex gap-2 text-zinc-700">
              <span className="text-orange-500">✓</span>
              <span>
                One payment of ₹{combo.price} instead of ₹{originalTotal} paid separately
              </span>
            </li>
            <li className="flex gap-2 text-zinc-700">
              <span className="text-orange-500">✓</span>
              <span>
                You get {comboProducts.length} separate download links — one for each pack,
                exactly like buying them individually
              </span>
            </li>
            <li className="flex gap-2 text-zinc-700">
              <span className="text-orange-500">✓</span>
              <span>Instant delivery by email, plus download right away after payment</span>
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl font-semibold text-zinc-900 mb-3">
            Common questions
          </h2>
          <Faq items={generalFaq} />
        </section>
      </div>
    </div>
  );
}
