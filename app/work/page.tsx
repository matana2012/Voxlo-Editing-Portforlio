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
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4 font-medium">Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.95]">
            Selected
            <br />
            Work.
          </h1>
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
