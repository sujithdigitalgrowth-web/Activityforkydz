"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

const DEMO_OTP = "12345";

const METHODS = [
  { id: "phonepe", label: "PhonePe", color: "bg-violet-600", dot: "🟣" },
  { id: "gpay", label: "Google Pay", color: "bg-blue-600", dot: "🔵" },
  { id: "paytm", label: "Paytm", color: "bg-sky-600", dot: "🔷" },
] as const;

type Step = "method" | "connecting" | "otp" | "verifying" | "success";

export default function FakeCheckoutModal({
  items,
  total,
  email,
  onClose,
  onPaymentSuccess,
}: {
  items: Product[];
  total: number;
  email: string;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}) {
  const [step, setStep] = useState<Step>("method");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"] | null>(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  const summaryLabel =
    items.length === 1 ? items[0].title : `${items.length} activity packs`;

  function proceedToPay() {
    if (!phoneValid || !method) return;
    setStep("connecting");
    setTimeout(() => setStep("otp"), 1100);
  }

  function verifyOtp() {
    if (otp === DEMO_OTP) {
      setOtpError("");
      setStep("verifying");
      setTimeout(() => {
        setStep("success");
        onPaymentSuccess?.();
      }, 900);
    } else {
      setOtpError("Incorrect OTP. Please try again.");
    }
  }

  const methodInfo = METHODS.find((m) => m.id === method);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-zinc-900 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <p className="font-heading font-semibold">activityforKydz Checkout</p>
            <p className="text-xs text-zinc-400">₹{total} · {summaryLabel}</p>
          </div>
          <span className="text-[10px] uppercase tracking-wide bg-yellow-400 text-zinc-900 font-bold px-2 py-1 rounded">
            Test mode
          </span>
        </div>

        <div className="p-5">
          {step === "method" && (
            <>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Mobile number
              </label>
              <div className="flex items-center rounded-lg border border-zinc-300 px-3 mb-4 focus-within:ring-2 focus-within:ring-orange-400">
                <span className="text-zinc-500 text-sm mr-1">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9876543210"
                  className="w-full py-2 outline-none"
                />
              </div>

              <p className="text-sm font-medium text-zinc-700 mb-2">Pay using</p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`rounded-lg border px-2 py-3 text-sm font-medium flex flex-col items-center gap-1 transition-colors ${
                      method === m.id
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                    }`}
                  >
                    <span className="text-xl">{m.dot}</span>
                    {m.label}
                  </button>
                ))}
              </div>

              <button
                onClick={proceedToPay}
                disabled={!phoneValid || !method}
                className="w-full rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-semibold py-3 transition-colors"
              >
                Pay ₹{total}
              </button>
              <button
                onClick={onClose}
                className="w-full text-center text-sm text-zinc-500 mt-3 hover:text-zinc-700"
              >
                Cancel
              </button>
            </>
          )}

          {step === "connecting" && (
            <div className="py-10 text-center">
              <div className="mx-auto mb-4 h-8 w-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
              <p className="text-zinc-700 font-medium">
                Connecting to {methodInfo?.label}...
              </p>
            </div>
          )}

          {step === "otp" && (
            <>
              <p className="text-sm text-zinc-700 mb-1">
                Enter the OTP sent to <strong>+91 {phone}</strong>
              </p>
              <p className="text-xs text-zinc-400 mb-4">(Demo OTP: {DEMO_OTP})</p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 5));
                  setOtpError("");
                }}
                placeholder="• • • • •"
                className="w-full text-center tracking-[0.5em] text-lg rounded-lg border border-zinc-300 px-3 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {otpError && <p className="text-sm text-red-600 mb-3">{otpError}</p>}
              <button
                onClick={verifyOtp}
                disabled={otp.length !== 5}
                className="w-full rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-semibold py-3 transition-colors"
              >
                Verify &amp; Pay
              </button>
              <button
                onClick={() => setStep("method")}
                className="w-full text-center text-sm text-zinc-500 mt-3 hover:text-zinc-700"
              >
                Back
              </button>
            </>
          )}

          {step === "verifying" && (
            <div className="py-10 text-center">
              <div className="mx-auto mb-4 h-8 w-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
              <p className="text-zinc-700 font-medium">Verifying payment...</p>
            </div>
          )}

          {step === "success" && (
            <div className="py-4 text-center">
              <p className="text-4xl mb-2">✅</p>
              <p className="font-heading font-semibold text-lg text-zinc-900">
                Payment successful!
              </p>
              <p className="text-sm text-zinc-600 mt-1">
                ₹{total} paid via {methodInfo?.label}
              </p>
              <p className="text-sm text-zinc-700 mt-4">
                Delivered to <strong>{email}</strong>
              </p>
              <div className="mt-5 space-y-2 text-left">
                {items.map((item) => (
                  <a
                    key={item.slug}
                    href={`/products/${item.slug}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    <span className="truncate mr-2">{item.title}</span>
                    <span className="shrink-0">Download →</span>
                  </a>
                ))}
              </div>
              <button
                onClick={onClose}
                className="w-full text-center text-sm text-zinc-500 mt-4 hover:text-zinc-700"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
