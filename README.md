# activityforKydz

Printable PDF activity packs for kids (coloring, tracing, learning) with instant
checkout via Razorpay and automatic email delivery of the download link.

## Stack

- Next.js (App Router) + Tailwind CSS
- Razorpay for payment (order creation + webhook-verified capture)
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

1. **Razorpay** — sign up at razorpay.com, complete KYC, grab your test API keys
   from Dashboard → Settings → API Keys. Use test mode until you're ready to go live.
2. **Resend** — sign up at resend.com, verify a sending domain (or use their
   default onboarding domain while testing), and create an API key.
3. Generate a random `DOWNLOAD_SECRET`, e.g. `openssl rand -hex 32`.
4. Fill all of the above into `.env.local` (see `.env.example` for the full list).

## Wiring the webhook (required for delivery to actually fire)

Payment confirmation and email delivery are driven by Razorpay's webhook, not the
browser, so it still works even if the customer closes the tab right after paying.

1. Deploy the app (e.g. to Vercel) or expose your local server with a tunnel
   (e.g. `ngrok http 3000`) to get a public HTTPS URL.
2. In Razorpay Dashboard → Settings → Webhooks, add a webhook pointing to
   `https://yourdomain.com/api/webhooks/razorpay`.
3. Subscribe to the `payment.captured` event.
4. Copy the webhook secret Razorpay gives you into `RAZORPAY_WEBHOOK_SECRET`.

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
