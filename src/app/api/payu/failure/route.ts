import { NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/seo";

// PayU redirects the customer's browser here with a POST when payment fails
// or is cancelled. No hash check is needed to decide the outcome — a failure
// tells the customer nothing sensitive, so we just bounce them back to retry.
export async function POST() {
  const url = new URL("/checkout", getBaseUrl());
  url.searchParams.set("payu_status", "failed");
  return NextResponse.redirect(url, { status: 303 });
}
