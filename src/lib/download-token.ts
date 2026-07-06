import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) throw new Error("DOWNLOAD_SECRET is not set");
  return secret;
}

export function signDownload(orderId: string, slug: string): string {
  return createHmac("sha256", getSecret()).update(`${orderId}:${slug}`).digest("hex");
}

export function verifyDownload(orderId: string, slug: string, signature: string): boolean {
  const expected = Buffer.from(signDownload(orderId, slug));
  const given = Buffer.from(signature);
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}
