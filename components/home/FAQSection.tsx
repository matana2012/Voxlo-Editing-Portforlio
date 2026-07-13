"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const faqs = [
  {
    q: "What's your turnaround time?",
    a: "2–5 days depending on video length. I'll give you a firm estimate before we start.",
  },
  {
    q: "How many revisions are included?",
    a: "Currently unlimited — we keep refining until you're genuinely happy with the cut.",
  },
  {
    q: "What files do you need from me?",
    a: "Raw footage, any music or SFX preferences, and rough timestamps for the key moments you want to hit.",
  },
  {
    q: "How does payment work?",
    a: "Half up front on longer projects, full on delivery for standard videos. PayPal or Venmo.",
  },
  {
    q: "What software do you use?",
    a: "DaVinci Resolve 21 — Fusion for motion graphics and Fairlight for audio.",
  },
  {
    q: "Do you work with channels under 10K subs?",
    a: "Yes — that's my main focus. Growing creators are exactly who I build for.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-lg font-medium text-foreground md:text-xl">{q}</span>
        <Plus
          className={`h-5 w-5 flex-shrink-0 text-accent transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <AnimatedSection className="mb-10 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">FAQ</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Good questions.
        </h2>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <div className="border-t border-border">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
