import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "./site";

// answer accepts ReactNode (not just string) so a page-specific FAQ can
// embed a real <Link> in an answer (e.g. "see our refund policy") — every
// existing FaqItem here still passes a plain string, which is itself a
// valid ReactNode, so nothing about how these render changes.
export type FaqItem = { question: string; answer: ReactNode };

export const generalFaq: FaqItem[] = [
  {
    question: "Do I need to install an app to get my PDF?",
    answer:
      "No. It's a regular PDF file sent to your email — open it on your phone, tablet, or computer with whatever you already use to view PDFs, then print it at home or at any print shop.",
  },
  {
    question: "What if I don't receive the email?",
    answer: `It usually arrives within a few minutes. First check your spam/promotions folder — if it's still not there, email us at ${site.supportEmail} with your order details and we'll resend it right away.`,
  },
  {
    question: "Can I print it more than once?",
    answer:
      "Yes. It's yours to print as many times as you like for your own kids, home, or classroom.",
  },
  {
    question: "Is this a subscription? Will I be charged again?",
    answer:
      "No. It's a one-time payment for one pack — there's no subscription and no recurring charge.",
  },
  {
    question: "What payment methods can I use?",
    answer: "UPI (PhonePe, Google Pay, Paytm), debit/credit cards, and netbanking.",
  },
  {
    question: "What if I'm not happy with my purchase?",
    answer:
      "Since it's an instant digital download, we can't offer refunds for change of mind — but if the file never arrives or won't open, we'll fix it or refund you. See our Refund & Cancellation Policy for details.",
  },
  {
    question: "Which pack should I start with for a 4 year old?",
    answer: (
      <>
        Most parents starting at four go with{" "}
        <Link href="/products/letters-and-words" className="text-orange-600 hover:underline">
          Letters &amp; Words
        </Link>{" "}
        or the{" "}
        <Link href="/products/alphabet-adventures" className="text-orange-600 hover:underline">
          Alphabet Adventures
        </Link>{" "}
        pack. If your child hasn&apos;t held a pencil much yet, start with{" "}
        <Link href="/products/my-first-lines" className="text-orange-600 hover:underline">
          My First Lines
        </Link>{" "}
        instead — it builds the strokes that letters are made of before asking for any letters.
      </>
    ),
  },
  {
    question: "Do these match the CBSE syllabus?",
    answer:
      "They're built around what Indian nursery, LKG and UKG classes typically cover, which overlaps closely with CBSE-pattern preschool material. They're supplementary practice, not a replacement for school books.",
  },
  {
    question: "Can I print these at a shop instead of at home?",
    answer:
      "Yes. Send the PDF to any print shop. A4 paper, black and white is fine for worksheets; colour is only worth it if you want the colour pages. Most parents get a full pack printed for ₹50–150 depending on page count.",
  },
];

// Plain-text mirror of generalFaq for FAQPage schema — one answer above
// embeds real <Link> elements, which JSON-LD can't hold, so this keeps the
// same wording as plain strings. Used everywhere generalFaq feeds schema.
export const generalFaqForSchema: FaqItem[] = generalFaq.map((item) =>
  item.question === "Which pack should I start with for a 4 year old?"
    ? {
        ...item,
        answer:
          "Most parents starting at four go with Letters & Words or the Alphabet Adventures pack. If your child hasn't held a pencil much yet, start with My First Lines instead — it builds the strokes that letters are made of before asking for any letters.",
      }
    : item
);
