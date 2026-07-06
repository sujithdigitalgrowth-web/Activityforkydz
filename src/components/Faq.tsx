"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-orange-100 rounded-2xl border border-orange-100 bg-white overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-orange-50/50 transition-colors"
            >
              <span className="font-medium text-zinc-900">{item.question}</span>
              <span className="text-orange-500 text-xl leading-none shrink-0">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm text-zinc-600 leading-relaxed">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
