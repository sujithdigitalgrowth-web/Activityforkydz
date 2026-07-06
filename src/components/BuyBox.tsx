"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import FakeCheckoutModal from "./FakeCheckoutModal";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

// Set NEXT_PUBLIC_MOCK_PAYMENTS=false once Razorpay keys are live to switch to real payments.
const USE_MOCK_PAYMENTS = process.env.NEXT_PUBLIC_MOCK_PAYMENTS !== "false";

type Status = "idle" | "processing" | "success" | "error";

export default function BuyBox({ product }: { product: Product }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMockCheckout, setShowMockCheckout] = useState(false);

  function validateEmail(): boolean {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage("Please enter a valid email address — that's where your PDF goes.");
      setStatus("error");
      return false;
    }
    return true;
  }

  async function handleBuy() {
    if (!validateEmail()) return;

    if (USE_MOCK_PAYMENTS) {
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
        body: JSON.stringify({ slug: product.slug, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "activityforKydz",
        description: product.title,
        prefill: { email },
        theme: { color: "#e2661f" },
        handler: () => {
          setStatus("success");
        },
        modal: {
          ondismiss: () => {
            setStatus((s) => (s === "success" ? s : "idle"));
          },
        },
      });
      razorpay.open();
    } catch {
      setErrorMessage("Couldn't reach the payment server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
        <p className="text-2xl mb-2">🎉</p>
        <p className="font-semibold text-emerald-900">Payment received!</p>
        <p className="text-sm text-emerald-800 mt-1">
          Your download link is on its way to <strong>{email}</strong>. It usually arrives
          within a minute — check spam if you don&apos;t see it.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-orange-100 shadow-sm p-6">
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-3xl font-bold text-zinc-900">₹{product.price}</span>
        <span className="text-sm text-zinc-500">{product.pageCount} pages · instant download</span>
      </div>

      <label className="block text-sm font-medium text-zinc-700 mb-1">
        Your email (we&apos;ll send the PDF here)
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {status === "error" && (
        <p className="text-sm text-red-600 mb-3">{errorMessage}</p>
      )}

      <button
        onClick={handleBuy}
        disabled={status === "processing"}
        className="w-full rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 transition-colors"
      >
        {status === "processing" ? "Opening payment..." : `Buy now — ₹${product.price}`}
      </button>

      <div className="mt-4 flex items-center justify-center gap-x-4 gap-y-1 flex-wrap text-xs text-zinc-600">
        <span className="flex items-center gap-1">
          <span aria-hidden="true">🔒</span> Secure checkout
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden="true">⚡</span> Instant delivery
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden="true">💬</span> Real support if anything goes wrong
        </span>
      </div>
      <p className="text-xs text-zinc-400 mt-2 text-center">
        Pay via {USE_MOCK_PAYMENTS ? "UPI (PhonePe, Google Pay, Paytm)" : "UPI, cards or netbanking"}.
        No app or account needed.
      </p>

      {showMockCheckout && (
        <FakeCheckoutModal
          product={product}
          email={email}
          onClose={() => setShowMockCheckout(false)}
        />
      )}
    </div>
  );
}
