"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

type Testimonial = {
  quote: string;
  channel: string;
  subs?: string;
  pfp: string;
  placeholder?: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote: "I genuinely appreciate the amount of effort you did while making of this video",
    channel: "Vincent Global Services",
    pfp: "/vincent_global_pfp.png",
  },
  {
    quote: "damn dude that didnt take that long lol",
    channel: "cilua_",
    subs: "3.5K subscribers",
    pfp: "/cilua_pfp.png",
  },
  {
    quote: "I think its pretty damn good",
    channel: "cilua_",
    subs: "3.5K subscribers",
    pfp: "/cilua_pfp.png",
  },
  {
    quote: "Looks good.",
    channel: "RustyOldMan",
    subs: "10K subscribers",
    pfp: "/rustyoldman_pfp.png",
  },
  {
    quote: "Perfect!",
    channel: "RustyOldMan",
    subs: "10K subscribers",
    pfp: "/rustyoldman_pfp.png",
  },
  {
    quote: "I'll use your cut and see how the video does",
    channel: "RustyOldMan",
    subs: "10K subscribers",
    pfp: "/rustyoldman_pfp.png",
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
              <figcaption className="flex items-center gap-3 border-t border-border pt-5">
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                  <Image src={t.pfp} alt={`${t.channel} avatar`} fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <p className="font-display text-base font-medium text-foreground">{t.channel}</p>
                  {t.subs && <p className="mt-0.5 text-sm text-muted-foreground">{t.subs}</p>}
                </div>
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
