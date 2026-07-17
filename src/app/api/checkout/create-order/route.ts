import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getBaseUrl } from "@/lib/seo";
import {
  buildPaymentHash,
  encodeSlugsToUdf,
  generateTxnId,
  getPayuActionUrl,
  getPayuKey,
} from "@/lib/payu";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const slugs = body?.slugs as string[] | undefined;
  const email = body?.email as string | undefined;
  const phoneRaw = body?.phone as string | undefined;

  if (!Array.isArray(slugs) || slugs.length === 0 || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid cart and email are required" }, { status: 400 });
  }

  const phone = (phoneRaw ?? "").replace(/\D/g, "").slice(-10);
  if (phone.length !== 10) {
    return NextResponse.json({ error: "A valid 10-digit phone number is required" }, { status: 400 });
  }

  const uniqueSlugs = [...new Set(slugs)];
  const products = uniqueSlugs.map((slug) => getProductBySlug(slug));
  if (products.some((p) => !p)) {
    return NextResponse.json({ error: "One or more products were not found" }, { status: 404 });
  }

  const amountValue = products.reduce((sum, p) => sum + p!.price, 0);
  const amount = amountValue.toFixed(2);
  const productinfo = products.map((p) => p!.title).join(" + ").slice(0, 100);
  const firstname = (email.split("@")[0].replace(/[^a-zA-Z ]/g, "") || "Customer").slice(0, 60);
  const txnid = generateTxnId();
  const udf = encodeSlugsToUdf(uniqueSlugs);

  const hash = buildPaymentHash({ txnid, amount, productinfo, firstname, email, ...udf });

  const baseUrl = getBaseUrl();

  return NextResponse.json({
    action: getPayuActionUrl(),
    fields: {
      key: getPayuKey(),
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      surl: `${baseUrl}/api/payu/success`,
      furl: `${baseUrl}/api/payu/failure`,
      hash,
      ...udf,
    },
  });
}
