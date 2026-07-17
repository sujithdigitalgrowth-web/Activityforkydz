import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { signDownload } from "@/lib/download-token";
import { sendDownloadEmail } from "@/lib/email";
import { getBaseUrl } from "@/lib/seo";
import { decodeSlugsFromUdf, verifyResponseHash } from "@/lib/payu";

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

  if (!valid) {
    return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
  }

  if (status === "success" && email && txnid) {
    const slugs = decodeSlugsFromUdf({ udf1, udf2, udf3, udf4, udf5 });
    const siteUrl = getBaseUrl();

    const items = slugs
      .map((slug) => getProductBySlug(slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((product) => {
        const sig = signDownload(txnid, product.slug);
        const downloadUrl = `${siteUrl}/api/download/${product.slug}?oid=${encodeURIComponent(txnid)}&sig=${sig}`;
        return { product, downloadUrl };
      });

    if (items.length > 0) {
      try {
        await sendDownloadEmail({ to: email, items });
      } catch (err) {
        console.error("Failed to send download email", err);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
