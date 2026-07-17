import { NextResponse } from "next/server";
import { verifyResponseHash } from "@/lib/payu";
import { getBaseUrl } from "@/lib/seo";

// PayU redirects the customer's browser here with a POST after a successful
// payment. The hash is verified so this can't be spoofed by just visiting the
// URL, but email delivery itself is driven by the webhook (see
// /api/webhooks/payu), not this handler — mirrors the previous Razorpay setup
// where the client-side callback only updates the UI.
export async function POST(req: Request) {
  const form = await req.formData();
  const get = (k: string) => (form.get(k) ?? "").toString();

  const status = get("status");
  const txnid = get("txnid");
  const amount = get("amount");
  const productinfo = get("productinfo");
  const firstname = get("firstname");
  const email = get("email");
  const hash = get("hash");
  const udf1 = get("udf1");
  const udf2 = get("udf2");
  const udf3 = get("udf3");
  const udf4 = get("udf4");
  const udf5 = get("udf5");

  const url = new URL("/checkout", getBaseUrl());

  const valid = verifyResponseHash({
    status,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    hash,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
  });

  if (valid && status === "success" && txnid) {
    url.searchParams.set("payu_status", "success");
    url.searchParams.set("txnid", txnid);
    if (email) url.searchParams.set("email", email);
  } else {
    url.searchParams.set("payu_status", "failed");
  }

  return NextResponse.redirect(url, { status: 303 });
}
