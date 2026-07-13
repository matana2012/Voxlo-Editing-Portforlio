"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

/*
  Testimonials placeholder — drop in real testimonials when you have them.
  Each item: { quote, name, handle }
*/
const testimonials: { quote: string; name: string; handle: string }[] = [
  // {
  //   quote: "The retention on my videos jumped the moment Voxlo took over the edit.",
  //   name: "Creator Name",
  //   handle: "@handle",
  // },
];

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <AnimatedSection className="mb-14 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
          What creators say
        </p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Words from the edit bay.
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <figure className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-muted/30 p-8">
              <span aria-hidden className="font-display text-5xl leading-none text-accent/50">
                &ldquo;
              </span>
              <blockquote className="flex-1 leading-relaxed text-foreground">{t.quote}</blockquote>
              <figcaption>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.handle}</p>
              </figcaption>
            </figure>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
