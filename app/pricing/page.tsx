import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { pricingTiers as tiers, pricingDisclaimers as disclaimers } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Editing rates for short-form, long-form, cinematic, and 3D video work. Every quote is scoped to your project.",
};

const mono = "font-mono text-[10.5px] uppercase tracking-[0.16em]";

/** Rates as a drawing's schedule: one ruled sheet, prices set right like dimensions. */
export default function PricingPage() {
  return (
    <div className="world-grid min-h-screen pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection className="mb-16">
          <p className={cn(mono, "flex items-center gap-3 text-gold")}>
            Pricing <span aria-hidden className="h-px w-7 bg-gold/70" /> <span className="text-cream/70">Rate schedule</span>
          </p>
          <h1 className="mt-8 font-display text-6xl font-normal leading-[0.92] tracking-[-0.025em] text-cream md:text-8xl">
            Rates<em className="font-light italic text-gold">.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75">
            Starting points by project type. Every quote is scoped to your footage and timeline.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="flex flex-col gap-4 border-y border-gold/40 py-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={cn(mono, "text-gold")}>The short version</p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Flexes with video length, complexity, and your situation. No rigid packages — we scope it to what you
                actually need.
              </p>
            </div>
            <p className="font-display text-5xl leading-none text-cream md:text-6xl">
              <span className={cn(mono, "mr-3 align-middle text-muted-foreground")}>from</span>$70
              <span className="text-2xl text-muted-foreground">/video</span>
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <table className="mt-14 w-full border-collapse text-left">
            <caption className="sr-only">Starting rates by project type</caption>
            <thead>
              <tr className="border-b border-line/40">
                <th scope="col" className={cn(mono, "w-12 py-3 font-normal text-muted-foreground")}>No.</th>
                <th scope="col" className={cn(mono, "py-3 font-normal text-muted-foreground")}>Project type</th>
                <th scope="col" className={cn(mono, "py-3 text-right font-normal text-muted-foreground")}>Starting at</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, i) => (
                <tr key={tier.name} className="border-b border-line/20 align-top">
                  <td className={cn(mono, "py-7 text-gold")}>{String(i + 1).padStart(2, "0")}</td>
                  <td className="py-6 pr-6">
                    <p className="font-display text-2xl text-cream md:text-3xl">{tier.name}</p>
                    <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">{tier.description}</p>
                  </td>
                  <td className="whitespace-nowrap py-6 text-right">
                    <p className={cn("font-display text-3xl tabular-nums md:text-4xl", tier.price === "Custom" ? "italic text-gold" : "text-cream")}>
                      {tier.price}
                    </p>
                    {tier.priceNote !== "starting at" && <p className={cn(mono, "mt-2 text-muted-foreground")}>{tier.priceNote}</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-14 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className={cn(mono, "text-muted-foreground")}>Notes</p>
            <ol className="mt-4 space-y-2.5">
              {disclaimers.map((d, i) => (
                <li key={d} className="grid grid-cols-[32px_1fr] text-sm text-cream/70">
                  <span className={cn(mono, "pt-0.5 text-line")}>{String(i + 1).padStart(2, "0")}</span>
                  {d}
                </li>
              ))}
              <li className="grid grid-cols-[32px_1fr] text-sm text-cream/70">
                <span className={cn(mono, "pt-0.5 text-line")}>{String(disclaimers.length + 1).padStart(2, "0")}</span>
                Pricing can change depending on your channel, what you need, and how you record. Final pricing depends on
                footage volume, revision rounds, and turnaround needs.
              </li>
            </ol>
          </div>
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-3 self-start bg-gold px-6 text-sm font-medium text-navy transition-colors hover:bg-cream md:self-end"
          >
            Get a custom quote
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
