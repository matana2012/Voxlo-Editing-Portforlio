"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function ContactStrip() {
  return (
    <section className="border-t border-border px-6 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Have a video in mind?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Send it over. I&apos;ll tell you what I&apos;d change.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Get in touch
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimatedSection>
    </section>
  );
}
