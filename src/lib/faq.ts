import { site } from "./site";

export type FaqItem = { question: string; answer: string };

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
];
