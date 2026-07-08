import { Resend } from "resend";
import type { Product } from "./products";

let instance: Resend | null = null;

function getResend(): Resend {
  if (!instance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set");
    instance = new Resend(apiKey);
  }
  return instance;
}

export async function sendDownloadEmail(opts: {
  to: string;
  items: { product: Product; downloadUrl: string }[];
}) {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) throw new Error("RESEND_FROM_EMAIL is not set");

  const { to, items } = opts;
  const subject =
    items.length === 1
      ? `Your download is ready: ${items[0].product.title}`
      : `Your ${items.length} downloads are ready`;

  const rows = items
    .map(
      ({ product, downloadUrl }) => `
      <div style="margin: 20px 0; padding-bottom: 20px; border-bottom: 1px solid #f0e6da;">
        <p style="margin: 0 0 8px;"><strong>${product.title}</strong> (${product.pageCount} pages) ${product.emoji}</p>
        <a href="${downloadUrl}" style="background:#e2661f;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
          Download your PDF
        </a>
      </div>`
    )
    .join("");

  await getResend().emails.send({
    from,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #2d2a26;">
        <h2 style="color:#e2661f;">Thank you for your purchase! 🎉</h2>
        <p>Here ${items.length === 1 ? "is your download" : "are your downloads"}:</p>
        ${rows}
        <p style="font-size: 14px; color: #666;">
          These links are tied to your order, so they're best kept for personal use.
          Print at home and enjoy!
        </p>
        <p style="font-size: 14px; color: #666;">— activityforKydz</p>
      </div>
    `,
  });
}
