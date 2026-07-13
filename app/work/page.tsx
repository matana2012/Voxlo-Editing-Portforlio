import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PieceGrid } from "@/components/work/PieceGrid";
import { ChannelsGrid } from "@/components/work/ChannelsGrid";
import { featuredPieces } from "@/lib/data/portfolioPieces";

export const metadata: Metadata = {
  title: "Work",
  description: "Channels I edit for, plus a selection of gaming, 3D, cinematic, and branded editing work.",
};

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Portfolio</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.9] tracking-tight text-foreground md:text-7xl">
            Selected
            <br />
            <span className="text-ember">Work.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            The creators I edit for — and the cuts that keep their audiences watching.
          </p>
        </AnimatedSection>

        {/* Channels — the main work, first thing you see */}
        <AnimatedSection delay={0.1}>
          <ChannelsGrid />
        </AnimatedSection>

        {/* Divider */}
        <div className="my-24 border-t border-border" />

        {/* Featured pieces — scroll down to reach the individual edits */}
        <AnimatedSection>
          <PieceGrid pieces={featuredPieces} title="Featured Edits" showFilter={false} />
        </AnimatedSection>
      </div>
    </div>
  );
}
