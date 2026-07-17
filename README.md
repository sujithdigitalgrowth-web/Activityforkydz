# activityforKydz

Printable PDF activity packs for kids (coloring, tracing, learning) with instant
checkout via PayU and automatic email delivery of the download link.

## Stack

- Next.js (App Router) + Tailwind CSS
- PayU hosted checkout for payment (redirect-based; request/response authenticated
  with a SHA-512 hash, confirmed server-to-server via webhook)
- Resend for transactional email
- No database: download links are HMAC-signed and tied to a real PayU transaction id

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in real values, see below
npm run dev
```

Open http://localhost:3000. Without real PayU/Resend keys the storefront and
product pages work fully; only the actual "Buy now" payment step needs live keys.

## Getting the accounts you need

1. **PayU** — sign up at payu.in, complete KYC, grab your test merchant key/salt
   from the PayU Dashboard → Settings. Use `PAYU_MODE=test` (test.payu.in) until
   you're ready to go live, then switch to `PAYU_MODE=production`.
2. **Resend** — sign up at resend.com, verify a sending domain (or use their
   default onboarding domain while testing), and create an API key.
3. Generate a random `DOWNLOAD_SECRET`, e.g. `openssl rand -hex 32`.
4. Fill all of the above into `.env.local` (see `.env.example` for the full list).

## How the payment flow works

PayU's hosted checkout is a plain HTML form POST, not a JS SDK modal:

1. `/api/checkout/create-order` builds the transaction (txnid, amount, cart
   slugs packed into `udf1`-`udf5`) and signs it with `sha512(key|txnid|amount|
   productinfo|firstname|email|udf1..5||||||salt)`.
2. The browser auto-submits a hidden form to PayU's hosted payment page.
3. After payment, PayU POSTs the result back to `/api/payu/success` or
   `/api/payu/failure`, which verify the reverse hash and redirect the browser
   to `/checkout?payu_status=success|failed` to update the UI.

## Wiring the webhook (required for delivery to actually fire)

Email delivery is driven by PayU's server-to-server webhook, not the browser
redirect, so it still works even if the customer closes the tab right after
paying.

1. Deploy the app (e.g. to Vercel) or expose your local server with a tunnel
   (e.g. `ngrok http 3000`) to get a public HTTPS URL.
2. In PayU Dashboard → Settings → Webhooks, add a webhook pointing to
   `https://yourdomain.com/api/webhooks/payu`.
3. No separate webhook secret is needed — the payload is authenticated with
   the same `PAYU_SALT` reverse-hash formula as the success/failure redirect.

## Content

Everything about a product — title, price, page count, description, category —
lives in one file: `src/lib/products.ts`. It's an array, so adding, removing, or
completely changing categories later is just editing that array; no other code
needs to change.

The actual downloadable files are read from `public/products/<slug>.pdf`. Right
now those PDFs are auto-generated placeholders (see
`scripts/generate-placeholder-pdfs.js`) — **replace each one with the real
activity pack before launch.** Also update `rating` / `purchaseCount` in
`products.ts` honestly once you have real reviews and orders; don't launch with
invented numbers.

### Adding real cover images

Right now every card/carousel slide shows an emoji on a color gradient — that's
the `emoji` + `accent` fields on each product. To swap in a real cover photo
once you have one:

1. Drop the image in `public/products/`, e.g. `public/products/animal-friends-cover.jpg`.
2. Set `image: "/products/animal-friends-cover.jpg"` on that product in `products.ts`.

That's it — every card, the carousel, and the product page all read from the
same `image` field and will automatically show the photo instead of the emoji.
Any aspect ratio works (it's cropped to fill), but a roughly 4:3 or 16:9 photo,
at least 800px wide, will look sharpest. Leave `image` unset on any product you
don't have a photo for yet — it just falls back to the emoji placeholder.

## Deploying

Push to a GitHub repo and import it in Vercel (free tier is enough at this scale).
Set all the `.env.example` variables as Vercel project environment variables, then
point the PayU webhook at the deployed URL.

**Important for SEO**: set `NEXT_PUBLIC_SITE_URL` in Vercel's project environment
variables to your real domain (e.g. `https://activityforkydz.com`), not the
`.vercel.app` one. It drives the sitemap, robots.txt, canonical URLs, and Open
Graph tags — if it's wrong, Google will index the wrong URLs.

## SEO

What's already in place:

- Per-page `<title>`/description, canonical URLs, and Open Graph tags for every
  route (`src/app/**/page.tsx`), targeting searches like "printable coloring
  pages for kids", "Ganesh Chaturthi coloring pages", and "activity pack for
  kids pdf".
- Auto-generated `/sitemap.xml` and `/robots.txt` (`src/app/sitemap.ts`,
  `src/app/robots.ts`) that stay in sync with `products.ts` automatically —
  add a product there and it's in the sitemap on the next deploy.
- Structured data (JSON-LD): `Organization`/`WebSite` sitewide, `Product` +
  `BreadcrumbList` + `FAQPage` on every product page (`src/lib/seo.ts`).
- Auto-generated Open Graph share images (no image upload needed) — a branded
  default for the homepage and a per-product one showing its emoji, title and
  price, so links shared in WhatsApp/social show a proper preview card
  (`src/app/opengraph-image.tsx`, `src/app/products/[slug]/opengraph-image.tsx`).

**Deliberately left out**: `Product` structured data does not include
`aggregateRating`/`review` fields, because the `rating`/`purchaseCount` values
in `products.ts` are still placeholders. Marking up fabricated reviews in
structured data (as opposed to just showing them in the UI) is something
Google explicitly treats as spam and can trigger a manual action on the whole
site. Add real rating data to `productJsonLd()` in `src/lib/seo.ts` once you
have actual reviews — not before.

**Next steps once you have a live domain**: submit the sitemap in
[Google Search Console](https://search.google.com/search-console) and
[Bing Webmaster Tools](https://www.bing.com/webmasters), and request indexing
for the homepage and a couple of product pages to speed up the first crawl.
