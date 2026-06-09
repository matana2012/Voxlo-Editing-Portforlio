"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

/*
  Testimonials placeholder — drop in real testimonials when you have them.
  Each item: { quote, name, handle, avatar? }
*/
const testimonials: { quote: string; name: string; handle: string }[] = [
  // Example:
  // {
  //   quote: "Anakin's cuts are genuinely different. The 3D integration work he did for our campaign got 2M views.",
  //   name: "Client Name",
  //   handle: "@clienthandle",
  // },
];

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <AnimatedSection>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/50 mb-12 text-center">
          What clients say
        </p>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <div className="border border-border rounded-2xl p-8 flex flex-col gap-6">
              <p className="text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-medium text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.handle}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
