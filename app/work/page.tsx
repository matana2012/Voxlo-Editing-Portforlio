import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PieceGrid } from "@/components/work/PieceGrid";
import { featuredPieces, morePieces } from "@/lib/data/portfolioPieces";

export const metadata: Metadata = {
  title: "Work",
  description: "Portfolio of editing work — gaming, 3D motion, branded content, podcast, and short-form.",
};

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4 font-medium">Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.95]">
            Selected
            <br />
            Work.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Click any piece to see what went into it.
          </p>
        </AnimatedSection>

        {/* Featured */}
        <AnimatedSection delay={0.1}>
          <PieceGrid pieces={featuredPieces} showFilter={false} />
        </AnimatedSection>

        {/* Divider */}
        <div className="my-24 border-t border-border" />

        {/* More Work */}
        <AnimatedSection>
          <PieceGrid pieces={morePieces} title="More Work" showFilter={true} />
        </AnimatedSection>
      </div>
    </div>
  );
}
