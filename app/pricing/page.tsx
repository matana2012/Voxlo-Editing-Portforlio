import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing | Voxlo Editing",
  description:
    "Editing rates for short-form, long-form, cinematic, and 3D video work. Every quote is scoped to your project.",
};

const tiers = [
  {
    name: "Short-form / Reels",
    price: "$60",
    priceNote: "starting at",
    description:
      "TikTok, Reels, Shorts — hook-first structure, beat sync, format optimization (9:16).",
  },
  {
    name: "Mid-length video",
    price: "$150",
    priceNote: "starting at",
    description:
      "Up to ~15 min. Full narrative edit, B-roll integration, dynamic captions.",
  },
  {
    name: "Long-form",
    price: "$250",
    priceNote: "starting at",
    description:
      "30+ min. Pacing, retention structure, chapter markers, full audio mix.",
  },
  {
    name: "Cinematic / branded",
    price: "$400",
    priceNote: "starting at",
    description:
      "Brand-forward content, licensed music sync, motion logo, color identity.",
  },
  {
    name: "Custom 3D / Motion",
    price: "Custom",
    priceNote: "quoted per project",
    description:
      "Blender integration, motion graphics, 3D compositing into live footage.",
  },
];

const disclaimers = [
  "Rush delivery (under 3 business days) is available for an additional fee.",
  "50% deposit required before work begins.",
  "Additional revision rounds beyond 2 are billed at an hourly rate.",
];

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Pricing
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[0.9] tracking-tight text-foreground md:text-7xl">
            <span className="text-ember">Rates.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Starting points by project type. Every quote is scoped to your footage and timeline.
          </p>
        </AnimatedSection>

        {/* Tier grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-muted/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  {tier.name}
                </p>

                <div>
                  <span
                    className={cn(
                      "font-display text-4xl font-semibold leading-none tabular-nums",
                      tier.price === "Custom" ? "text-ember" : "text-foreground"
                    )}
                  >
                    {tier.price}
                  </span>
                  <p className="text-xs text-muted-foreground/60 mt-1.5">{tier.priceNote}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Disclaimers + CTA */}
        <AnimatedSection delay={0.2} className="mt-14">
          <div className="max-w-2xl">
            <ul className="space-y-2.5 mb-5">
              {disclaimers.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-muted-foreground/30 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground/60">{d}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground/40 mb-8">
              Final pricing depends on footage volume, revision rounds, and turnaround needs.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0B0A09] transition-all duration-200 hover:scale-[1.03] hover:bg-accent-hover active:scale-[0.98]"
            >
              Get a custom quote →
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
