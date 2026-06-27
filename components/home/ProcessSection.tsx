"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, FolderOpen, Film, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    Icon: MessageCircle,
    title: "Discovery call",
    description:
      "15–30 min Discord call to understand the project, audience, and goals.",
    timeLabel: "~30 min",
  },
  {
    number: "02",
    Icon: FolderOpen,
    title: "Footage handoff + brief",
    description:
      "Raw footage via Google Drive (or your preferred transfer method) with a written or Loom brief.",
    timeLabel: null,
  },
  {
    number: "03",
    Icon: Film,
    title: "First draft",
    description: "Delivered in 5–8 business days depending on scope.",
    timeLabel: "5–8 days",
  },
  {
    number: "04",
    Icon: CheckCircle2,
    title: "Revisions + final delivery",
    description:
      "Up to 2 rounds of revisions included. Final files delivered in your preferred format.",
    timeLabel: null,
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4 font-medium">
            Process
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[0.95]">
            How it works.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Simple, async-friendly workflow built around your schedule.
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="relative mt-20">

          {/* Connecting line — desktop only */}
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border hidden lg:block pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.07,
                }}
              >
                {/* Step number — sits on the connecting line */}
                <div className="relative z-10 mb-6">
                  <span className="text-5xl font-extralight tabular-nums text-foreground/[0.12] leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <step.Icon className="h-5 w-5 text-accent mb-4" strokeWidth={1.5} />

                {/* Title */}
                <h3 className="font-semibold text-foreground text-[15px] mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Time label */}
                {step.timeLabel && (
                  <span className="mt-4 inline-flex items-center text-[10px] uppercase tracking-widest text-muted-foreground/50 border border-border/50 px-2.5 py-1 rounded-full">
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
