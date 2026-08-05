// Abandoned-cart logging via a Google Apps Script Web App standing in for a
// database — there's no DB in this project. See
// src/app/api/cart-capture/README.md for the Apps Script source and the
// one-time Google Sheet setup.

type LogAbandonedCartInput = {
  cartId: string;
  phone: string;
  email: string;
  items: string[]; // product slugs
  amount: number;
};

async function postToSheet(body: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.CART_CAPTURE_SHEET_WEBHOOK_URL;
  const secret = process.env.CART_CAPTURE_SHEET_SECRET;
  if (!webhookUrl || !secret) {
    console.error("CART_CAPTURE_SHEET_WEBHOOK_URL / CART_CAPTURE_SHEET_SECRET are not set");
    return;
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, ...body }),
  });
  if (!res.ok) {
    throw new Error(`Cart-capture sheet webhook responded ${res.status}`);
  }
  // Apps Script Web Apps always answer with HTTP 200, even for errors it
  // catches itself (e.g. a secret mismatch) — the real result is in the
  // JSON body, so res.ok alone isn't enough to call this a success.
  const data = await res.json().catch(() => null);
  if (!data?.ok) {
    throw new Error(`Cart-capture sheet webhook returned an error: ${data?.error ?? "unknown"}`);
  }
}

export async function logAbandonedCart(input: LogAbandonedCartInput): Promise<void> {
  await postToSheet({
    action: "create",
    cartId: input.cartId,
    phone: input.phone,
    email: input.email,
    items: input.items.join(", "),
    amount: input.amount,
    status: "pending",
    createdAt: new Date().toISOString(),
    reminderSent: false,
  });
}

export async function markAbandonedCartCompleted(cartId: string): Promise<void> {
  await postToSheet({ action: "complete", cartId });
}
