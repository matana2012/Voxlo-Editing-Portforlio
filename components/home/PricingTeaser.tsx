"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Annotation } from "@/components/ui/Annotation";
import { pricingTiers } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

// A condensed spec sheet — the low, high, and custom ends of the real rate
// card. Full breakdown lives at /pricing; numbers here are the same source.
const teaserTiers = [pricingTiers[0], pricingTiers[2], pricingTiers[4]];

export function PricingTeaser() {
  return (
    <section className="border-t border-border px-6 py-24 md:py-32">
      <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
        <Annotation variant="index" className="mb-4 block">Rates</Annotation>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Starting points, not fixed packages.
        </h2>
      </AnimatedSection>

      <StaggerContainer className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {teaserTiers.map((tier) => (
          <StaggerItem key={tier.name}>
            <div className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface-1 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {tier.name}
              </p>
              <span
                className={cn(
                  "font-display text-3xl font-semibold leading-none tabular-nums",
                  tier.price === "Custom" ? "text-ember" : "text-foreground"
                )}
              >
                {tier.price}
              </span>
              <p className="text-xs text-muted-foreground/70">{tier.priceNote}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedSection delay={0.1} className="mt-10 text-center">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-base font-semibold text-signal transition-colors hover:text-signal-hover"
        >
          See the full rate card
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimatedSection>
    </section>
  );
}
