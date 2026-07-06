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
  product: Product;
  downloadUrl: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) throw new Error("RESEND_FROM_EMAIL is not set");

  const { to, product, downloadUrl } = opts;

  await getResend().emails.send({
    from,
    to,
    subject: `Your download is ready: ${product.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #2d2a26;">
        <h2 style="color:#e2661f;">Thank you for your purchase! ${product.emoji}</h2>
        <p>Here's your download for <strong>${product.title}</strong> (${product.pageCount} pages).</p>
        <p style="margin: 24px 0;">
          <a href="${downloadUrl}" style="background:#e2661f;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
            Download your PDF
          </a>
        </p>
        <p style="font-size: 14px; color: #666;">
          This link is tied to your order, so it's best kept for personal use.
          Print at home and enjoy!
        </p>
        <p style="font-size: 14px; color: #666;">— activityforKydz</p>
      </div>
    `,
  });
}
