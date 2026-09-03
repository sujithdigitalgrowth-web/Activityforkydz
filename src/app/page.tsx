import type { Metadata } from "next";
import { COMBOS } from "@/lib/bundles";
import ComboCard from "@/components/ComboCard";
import Faq from "@/components/Faq";
import { generalFaq, generalFaqForSchema } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute string, not a template-relative one: Next.js doesn't apply the
  // root layout's title template to app/page.tsx since they're the same segment.
  title: "Printable Activity Pack Combos for Kids | activityforKydz",
  description:
    "Printable colouring and learning packs for kids, sold as combos only. Get every pack we make for a flat ₹499, or the colouring/learning combo for less. Instant PDF download.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Printable Activity Pack Combos for Kids | activityforKydz",
    description:
      "Printable colouring and learning packs for kids, sold as combos only. Get every pack we make for a flat ₹499, or the colouring/learning combo for less. Instant PDF download.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaqForSchema)) }}
      />

      <section className="max-w-[1400px] mx-auto px-6 pt-10 pb-2">
        <h1 className="font-heading text-2xl sm:text-4xl font-semibold text-zinc-900 text-center max-w-3xl mx-auto">
          Screen-Free Activity Packs, Sold as Combos
        </h1>
        <p className="text-center text-xs sm:text-sm text-zinc-600 mt-3 max-w-2xl mx-auto">
          <span className="font-semibold text-orange-600">Instant</span> email delivery ·{" "}
          <span className="font-semibold text-orange-600">Unlimited</span> printing ·{" "}
          <span className="font-semibold text-orange-600">3</span> flat prices, nothing to pick
          one by one
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 pt-8 pb-10">
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {COMBOS.map((combo) => (
            <ComboCard key={combo.routeSlug} combo={combo} showBuyNow />
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-4">
            Why printable, not another app?
          </h2>
          <ul className="space-y-2.5">
            <li className="flex gap-2 text-zinc-700">
              <span className="text-orange-500 shrink-0" aria-hidden="true">✓</span>
              <span>Works without the internet — download once, print whenever</span>
            </li>
            <li className="flex gap-2 text-zinc-700">
              <span className="text-orange-500 shrink-0" aria-hidden="true">✓</span>
              <span>One purchase, unlimited copies — reprint for a second child, or a redo</span>
            </li>
            <li className="flex gap-2 text-zinc-700">
              <span className="text-orange-500 shrink-0" aria-hidden="true">✓</span>
              <span>No subscription, no in-app purchases, no login</span>
            </li>
            <li className="flex gap-2 text-zinc-700">
              <span className="text-orange-500 shrink-0" aria-hidden="true">✓</span>
              <span>A finished page goes on the wall — twenty minutes on an app leaves nothing</span>
            </li>
            <li className="flex gap-2 text-zinc-700">
              <span className="text-orange-500 shrink-0" aria-hidden="true">✓</span>
              <span>Thick, crayon-proof outlines built to survive a heavy three-year-old hand</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="font-heading text-2xl font-semibold text-zinc-900 mb-6">
          Buy, check your email, print
        </h2>
        <ol className="grid sm:grid-cols-3 gap-5 max-w-4xl list-none">
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">1. Pick a combo</span>
            <p className="text-zinc-700 mt-1.5 text-sm">
              Colouring, learning or everything — see what&apos;s inside first.
            </p>
          </li>
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">2. Pay by UPI or card</span>
            <p className="text-zinc-700 mt-1.5 text-sm">
              Standard Indian payment methods, no account needed.
            </p>
          </li>
          <li className="rounded-2xl border border-orange-100 bg-white p-5">
            <span className="text-orange-600 font-heading font-semibold">3. PDFs land in your inbox</span>
            <p className="text-zinc-700 mt-1.5 text-sm">
              Usually within a minute. Save them, print again anytime.
            </p>
          </li>
        </ol>
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
