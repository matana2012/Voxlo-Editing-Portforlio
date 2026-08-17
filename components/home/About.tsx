"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

// Deliberately the quietest section on the page — a real person, not a
// brand pitch. No motion tricks, no cards.
export function About() {
  return (
    <section className="px-6 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-2xl">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent">Who's editing</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Anakin Grierson.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I edit under the name Voxlo. It's just me — no team, no account manager, no
          template pipeline. Every project on this page went through my hands, start
          to finish.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          More about how I work
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </AnimatedSection>
    </section>
  );
}
