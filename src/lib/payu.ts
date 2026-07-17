import { createHash, randomBytes, timingSafeEqual } from "crypto";

type UdfFields = {
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
};

function getConfig() {
  const key = process.env.PAYU_MERCHANT_KEY;
  const salt = process.env.PAYU_SALT;
  if (!key || !salt) {
    throw new Error("PAYU_MERCHANT_KEY / PAYU_SALT are not set");
  }
  const mode = process.env.PAYU_MODE === "production" ? "production" : "test";
  return { key, salt, mode };
}

export function getPayuKey(): string {
  return getConfig().key;
}

export function getPayuActionUrl(): string {
  const { mode } = getConfig();
  return mode === "production" ? "https://secure.payu.in/_payment" : "https://test.payu.in/_payment";
}

export function generateTxnId(): string {
  return `t${Date.now().toString(36)}${randomBytes(5).toString("hex")}`;
}

// PayU request hash: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
export function buildPaymentHash(
  params: {
    txnid: string;
    amount: string;
    productinfo: string;
    firstname: string;
    email: string;
  } & UdfFields
): string {
  const { key, salt } = getConfig();
  const { txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5 } = params;
  const raw = [
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
    "",
    "",
    "",
    "",
    "",
    salt,
  ].join("|");
  return createHash("sha512").update(raw).digest("hex");
}

// PayU response (reverse) hash: sha512(salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
export function verifyResponseHash(
  params: {
    status: string;
    txnid: string;
    amount: string;
    productinfo: string;
    firstname: string;
    email: string;
    hash: string;
  } & UdfFields
): boolean {
  const { key, salt } = getConfig();
  const { status, txnid, amount, productinfo, firstname, email, hash, udf1, udf2, udf3, udf4, udf5 } = params;
  const raw = [
    salt,
    status,
    "",
    "",
    "",
    "",
    "",
    udf5,
    udf4,
    udf3,
    udf2,
    udf1,
    email,
    firstname,
    productinfo,
    amount,
    txnid,
    key,
  ].join("|");
  const expected = createHash("sha512").update(raw).digest("hex").toLowerCase();
  const given = hash.trim().toLowerCase();

  const expectedBuf = Buffer.from(expected);
  const givenBuf = Buffer.from(given);
  if (expectedBuf.length !== givenBuf.length) return false;
  return timingSafeEqual(expectedBuf, givenBuf);
}

// Cart slugs don't fit in a single udf field (255 char cap), so they're joined
// and chunked across udf1-udf5 — the same 5 fields PayU echoes back on the
// success/failure callback and includes in the response hash.
const CHUNK_SIZE = 240;
const UDF_KEYS = ["udf1", "udf2", "udf3", "udf4", "udf5"] as const;

export function encodeSlugsToUdf(slugs: string[]): UdfFields {
  const joined = slugs.join(",");
  const fields: UdfFields = { udf1: "", udf2: "", udf3: "", udf4: "", udf5: "" };

  let i = 0;
  let index = 0;
  while (i < joined.length && index < UDF_KEYS.length) {
    fields[UDF_KEYS[index]] = joined.slice(i, i + CHUNK_SIZE);
    i += CHUNK_SIZE;
    index += 1;
  }

  return fields;
}

export function decodeSlugsFromUdf(fields: Partial<UdfFields>): string[] {
  const joined = UDF_KEYS.map((k) => fields[k] ?? "").join("");
  return joined ? joined.split(",").filter(Boolean) : [];
}
