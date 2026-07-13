"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

const capabilities = [
  {
    index: "01",
    label: "Gaming & Creator",
    description:
      "Highlight reels, montages, commentary cuts and vlogs — paced for the algorithm and built to keep watch-time high.",
    href: "/services#gaming",
    signature: true,
  },
  {
    index: "02",
    label: "Long-Form Retention",
    description:
      "30-minute narratives cut from hours of footage. Structure, rhythm and hooks that hold viewers to the last frame.",
    href: "/services#irl",
    signature: false,
  },
  {
    index: "03",
    label: "Cinematic & Branded",
    description:
      "Motion graphics, 3D integration, color and sound design for branded pieces that look genuinely expensive.",
    href: "/services#3d",
    signature: false,
  },
];

export function CapabilityStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <AnimatedSection className="mb-14 max-w-2xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
          What I do
        </p>
        <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-5xl">
          Three lanes, one obsession — <span className="text-ember">keeping people watching.</span>
        </h2>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {capabilities.map((cap) => (
          <StaggerItem key={cap.label}>
            <Link
              href={cap.href}
              className="group flex h-full min-h-[300px] flex-col justify-between rounded-2xl border border-border bg-muted/30 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-muted/60"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-5xl font-semibold text-accent/25 transition-colors duration-300 group-hover:text-accent/60">
                    {cap.index}
                  </span>
                  {cap.signature && (
                    <span className="rounded-full border border-accent/30 px-3 py-1 text-[10px] uppercase tracking-widest text-accent">
                      Signature
                    </span>
                  )}
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {cap.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 group-hover:text-accent">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
