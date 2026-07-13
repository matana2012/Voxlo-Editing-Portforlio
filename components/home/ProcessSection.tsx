"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Film, RefreshCw, PackageCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    Icon: Upload,
    title: "Send your footage",
    description:
      "Drop raw footage in my Google Drive with any music/SFX notes and rough timestamps for the key moments.",
    timeLabel: "Your Drive",
  },
  {
    number: "02",
    Icon: Film,
    title: "First draft in days",
    description: "I deliver a full first cut in 2–5 business days, depending on video length.",
    timeLabel: "2–5 days",
  },
  {
    number: "03",
    Icon: RefreshCw,
    title: "Unlimited revisions",
    description: "We refine it together until you're genuinely happy — no revision caps.",
    timeLabel: "Unlimited",
  },
  {
    number: "04",
    Icon: PackageCheck,
    title: "Delivered your way",
    description: "Final files exported in your formats, ready to upload on your schedule.",
    timeLabel: null,
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Process</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.0] tracking-tight text-foreground md:text-6xl">
            How it works.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Four steps, zero friction — built around your schedule, not mine.
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="relative mt-16 md:mt-20">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px lg:block"
            style={{
              background: "linear-gradient(to right, transparent, rgba(245,166,35,0.35), transparent)",
            }}
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <div className="relative z-10 mb-6">
                  <span className="font-display text-5xl font-semibold leading-none text-accent/30">
                    {step.number}
                  </span>
                </div>

                <step.Icon className="mb-4 h-5 w-5 text-accent" strokeWidth={1.5} />

                <h3 className="mb-2 text-base font-semibold text-foreground">{step.title}</h3>

                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                {step.timeLabel && (
                  <span className="mt-4 inline-flex items-center rounded-full border border-accent/25 px-2.5 py-1 text-[10px] uppercase tracking-widest text-accent/80">
                    {step.timeLabel}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
