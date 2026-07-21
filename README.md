# activityforKydz

Printable PDF activity packs for kids (coloring, tracing, learning) with instant
checkout via Razorpay and automatic email delivery of the download link.

## Stack

- Next.js (App Router) + Tailwind CSS
- Razorpay Checkout (JS modal) for payment, confirmed server-to-server via webhook
- Resend for transactional email
- No database: download links are HMAC-signed and tied to a real Razorpay order id

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in real values, see below
npm run dev
```

Open http://localhost:3000. Without real Razorpay/Resend keys the storefront and
product pages work fully; only the actual "Buy now" payment step needs live keys.

## Getting the accounts you need

1. **Razorpay** — sign up at razorpay.com, complete KYC, grab your test API
   key/secret from the Razorpay Dashboard → Settings → API Keys. Use the
   `rzp_test_...` key while testing, then switch to the live key once KYC is
   approved.
2. **Resend** — sign up at resend.com, verify a sending domain (or use their
   default onboarding domain while testing), and create an API key.
3. Generate a random `DOWNLOAD_SECRET`, e.g. `openssl rand -hex 32`.
4. Fill all of the above into `.env.local` (see `.env.example` for the full list).

## How the payment flow works

Razorpay Checkout is a client-side JS modal, not a redirect:

1. `/api/checkout/create-order` creates a Razorpay order server-side for the
   cart total (cart slugs packed into `notes.items_0`, `items_1`, ...).
2. The browser opens the Razorpay Checkout modal (`checkout.razorpay.com/v1/
   checkout.js`, loaded in `layout.tsx`) with that order id.
3. On successful payment, Razorpay's `handler` callback fires client-side to
   update the UI — but actual email delivery is driven by the webhook below,
   not this callback, so it still fires even if the customer closes the tab.

## Wiring the webhook (required for delivery to actually fire)

Email delivery is driven by Razorpay's server-to-server webhook, not the
browser callback, so it still works even if the customer closes the tab right
after paying.

1. Deploy the app (e.g. to Vercel) or expose your local server with a tunnel
   (e.g. `ngrok http 3000`) to get a public HTTPS URL.
2. In Razorpay Dashboard → Settings → Webhooks, add a webhook pointing to
   `https://yourdomain.com/api/webhooks/razorpay`, subscribed to the
   `payment.captured` event.
3. Set the webhook secret you choose there as `RAZORPAY_WEBHOOK_SECRET` in
   your environment — the webhook payload is authenticated with an HMAC-SHA256
   signature using that secret.

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
point the Razorpay webhook at the deployed URL.

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
