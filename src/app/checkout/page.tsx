"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProductBySlug, type Product } from "@/lib/products";
import { getCartPricing } from "@/lib/pricing";
import ProductVisual from "@/components/ProductVisual";
import CartAddOns from "@/components/CartAddOns";
import FakeCheckoutModal from "@/components/FakeCheckoutModal";
import { pushDataLayer, toDataLayerItems } from "@/lib/gtm";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

// Set NEXT_PUBLIC_MOCK_PAYMENTS=false once Razorpay keys are live to switch to real payments.
const USE_MOCK_PAYMENTS = process.env.NEXT_PUBLIC_MOCK_PAYMENTS !== "false";

type Status = "idle" | "processing" | "success" | "error";

export default function CheckoutPage() {
  const { slugs, clear } = useCart();
  const items = slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const pricing = getCartPricing(items);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMockCheckout, setShowMockCheckout] = useState(false);
  // Snapshot of what's being paid for, taken at "Pay" time so it survives clear()
  // once payment succeeds (the live cart empties, but the modal/success screen
  // still need to show what was just bought).
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const checkoutPricing = getCartPricing(checkoutItems);

  useEffect(() => {
    if (items.length === 0) return;
    pushDataLayer({
      event: "begin_checkout",
      ecommerce: {
        currency: "INR",
        value: pricing.total,
        items: toDataLayerItems(items),
      },
    });
    // Fire once when the checkout page loads (covers "Proceed to checkout",
    // "Buy now" and "Pay now" — they all land here), not on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== "success" || !orderId || checkoutItems.length === 0) return;
    const flagKey = `ga_purchase_tracked_${orderId}`;
    if (sessionStorage.getItem(flagKey)) return;
    sessionStorage.setItem(flagKey, "1");
    pushDataLayer({
      event: "purchase",
      ecommerce: {
        transaction_id: orderId,
        currency: "INR",
        value: checkoutPricing.total,
        items: toDataLayerItems(checkoutItems),
      },
    });
  }, [status, orderId, checkoutItems, checkoutPricing.total]);

  function validateEmail(): boolean {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage("Please enter a valid email address — that's where your PDFs go.");
      setStatus("error");
      return false;
    }
    return true;
  }

  async function handlePay() {
    if (!validateEmail()) return;
    const snapshot = items;
    setCheckoutItems(snapshot);

    pushDataLayer({
      event: "add_payment_info",
      ecommerce: {
        currency: "INR",
        value: getCartPricing(snapshot).total,
        items: toDataLayerItems(snapshot),
      },
    });

    if (USE_MOCK_PAYMENTS) {
      setOrderId(`mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
      setErrorMessage("");
      setShowMockCheckout(true);
      return;
    }

    setStatus("processing");
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: snapshot.map((p) => p.slug), email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setOrderId(data.orderId);

      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "activityforKydz",
        description: snapshot.length === 1 ? snapshot[0].title : `${snapshot.length} activity packs`,
        prefill: { email },
        theme: { color: "#e2661f" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/checkout/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            if (!verifyRes.ok) {
              setErrorMessage("We couldn't verify your payment. If money was deducted, it will be refunded automatically — please contact support.");
              setStatus("error");
              return;
            }
            setStatus("success");
            clear();
          } catch {
            setErrorMessage("We couldn't verify your payment. If money was deducted, it will be refunded automatically — please contact support.");
            setStatus("error");
          }
        },
        modal: {
          ondismiss: () => {
            setStatus((s) => (s === "success" ? s : "idle"));
          },
        },
      });
      razorpay.on("payment.failed", () => {
        setErrorMessage("Payment failed. Please try again or use a different payment method.");
        setStatus("error");
      });
      razorpay.open();
    } catch {
      setErrorMessage("Couldn't reach the payment server. Please try again.");
      setStatus("error");
    }
  }

  let content: React.ReactNode;

  if (status === "success") {
    content = (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h1 className="font-heading text-2xl font-semibold text-emerald-900">
          Payment received!
        </h1>
        <p className="text-zinc-600 mt-2">
          Your download link{checkoutItems.length === 1 ? "" : "s are"} on the way to{" "}
          <strong>{email}</strong>. It usually arrives within a minute — check spam if you
          don&apos;t see it.
        </p>
        <Link
          href="/#packs"
          className="inline-block mt-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 transition-colors"
        >
          Browse more packs
        </Link>
      </div>
    );
  } else if (items.length === 0) {
    content = (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-5xl mb-4">🧾</p>
        <h1 className="font-heading text-2xl font-semibold text-zinc-900">
          Nothing to check out yet
        </h1>
        <p className="text-zinc-600 mt-2">Add a few packs to your cart first.</p>
        <Link
          href="/#packs"
          className="inline-block mt-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 transition-colors"
        >
          Browse packs
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-heading text-2xl font-semibold text-zinc-900 mb-6">Checkout</h1>

        <div className="grid md:grid-cols-5 gap-6 md:gap-8">
          <div className="md:col-span-3">
            <h2 className="font-heading text-lg font-semibold text-zinc-900 mb-3">
              Order summary
            </h2>
            <div className="space-y-3">
              {items.map((product) => {
                const isFree = product.slug === pricing.freeSlug;
                return (
                  <div
                    key={product.slug}
                    className="flex items-center gap-4 rounded-xl border border-orange-100 bg-white p-3"
                  >
                    <ProductVisual
                      product={product}
                      className="rounded-lg h-16 w-20 shrink-0"
                      emojiClassName="text-3xl"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-zinc-900 truncate">
                        {product.title}
                      </p>
                      <p className="text-sm text-zinc-500">{product.pageCount} pages</p>
                      {isFree && (
                        <span className="inline-block mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                          🎁 Free pack
                        </span>
                      )}
                    </div>
                    {isFree ? (
                      <span className="font-bold shrink-0">
                        <span className="text-zinc-400 line-through text-sm mr-1.5">
                          ₹{product.price}
                        </span>
                        <span className="text-emerald-600">FREE</span>
                      </span>
                    ) : (
                      <span className="font-bold text-orange-600 shrink-0">₹{product.price}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {pricing.discount === 0 && items.length < 3 && (
              <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1.5 mt-3">
                🎁 Add {3 - items.length} more pack{3 - items.length === 1 ? "" : "s"} — buy 2,
                get 1 free!
              </p>
            )}

            <div className="mt-4 md:mt-6">
              <CartAddOns />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="md:sticky md:top-24 rounded-2xl bg-white border border-orange-100 shadow-sm p-4 sm:p-5">
              {pricing.discount > 0 ? (
                <>
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>Subtotal</span>
                    <span>₹{pricing.subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-emerald-600 font-medium mt-1">
                    <span>🎁 Buy 2, get 1 free</span>
                    <span>-₹{pricing.discount}</span>
                  </div>
                  <div className="flex items-baseline justify-between mt-1.5 mb-3">
                    <span className="text-2xl font-bold text-zinc-900">₹{pricing.total}</span>
                    <span className="text-sm text-zinc-500">
                      {items.length} pack{items.length === 1 ? "" : "s"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-2xl font-bold text-zinc-900">₹{pricing.total}</span>
                  <span className="text-sm text-zinc-500">
                    {items.length} pack{items.length === 1 ? "" : "s"}
                  </span>
                </div>
              )}

              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Your email (we&apos;ll send the PDFs here)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              {status === "error" && <p className="text-sm text-red-600 mb-3">{errorMessage}</p>}

              <button
                onClick={handlePay}
                disabled={status === "processing"}
                className="w-full rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-2.5 transition-colors"
              >
                {status === "processing" ? "Opening payment..." : `Pay ₹${pricing.total}`}
              </button>

              <div className="mt-3 flex items-center justify-center gap-x-3 gap-y-1 flex-wrap text-xs text-zinc-600">
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">🔒</span> Secure checkout
                </span>
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">⚡</span> Instant delivery
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1.5 text-center">
                Pay via {USE_MOCK_PAYMENTS ? "UPI (PhonePe, Google Pay, Paytm)" : "UPI, cards or netbanking"}.
                No app or account needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {content}
      {showMockCheckout && (
        <FakeCheckoutModal
          items={checkoutItems}
          total={checkoutPricing.total}
          email={email}
          onClose={() => setShowMockCheckout(false)}
          onPaymentSuccess={() => {
            setStatus("success");
            clear();
          }}
        />
      )}
    </>
  );
}
