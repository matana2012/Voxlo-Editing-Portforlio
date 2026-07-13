"use client";

import { Quote } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

/**
 * Elevated testimonial cards. Placeholders for now — replace `quote`, `channel`
 * and `subs` with real client words as they approve them (set placeholder:false).
 */
type Testimonial = {
  quote: string;
  channel: string;
  subs: string;
  placeholder?: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote: "A line about how the edit lifted retention and views will live right here.",
    channel: "Creator channel",
    subs: "1K–10K subscribers",
    placeholder: true,
  },
  {
    quote: "A short, punchy quote from a happy creator goes here once approved.",
    channel: "Creator channel",
    subs: "1K–10K subscribers",
    placeholder: true,
  },
  {
    quote: "Another client's words about turnaround, quality, or the vibe of working together.",
    channel: "Creator channel",
    subs: "1K–10K subscribers",
    placeholder: true,
  },
];

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <AnimatedSection className="mb-12 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Testimonials</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Words from the edit bay.
        </h2>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <StaggerItem key={i}>
            <figure className="relative flex h-full flex-col gap-6 rounded-2xl border border-border bg-muted/30 p-8">
              <Quote className="h-7 w-7 text-accent/70" strokeWidth={1.5} />
              <blockquote
                className={`flex-1 text-lg leading-relaxed ${
                  t.placeholder ? "text-muted-foreground/70" : "text-foreground"
                }`}
              >
                {t.quote}
              </blockquote>
              <figcaption className="border-t border-border pt-5">
                <p className="font-display text-base font-medium text-foreground">{t.channel}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{t.subs}</p>
              </figcaption>
              {t.placeholder && (
                <span className="absolute right-5 top-5 rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground/60">
                  Coming soon
                </span>
              )}
            </figure>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
