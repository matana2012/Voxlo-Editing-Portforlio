import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PieceGrid } from "@/components/work/PieceGrid";
import { ChannelsGrid } from "@/components/work/ChannelsGrid";
import { YouTubePlayer } from "@/components/work/YouTubePlayer";
import { ToolTag } from "@/components/work/ToolTag";
import { featuredPieces } from "@/lib/data/portfolioPieces";

const CILUA_URL = "https://www.youtube.com/channel/UCULfftvB2jLST9E2zO2T7WQ";

const LATEST_CUT_TOOLS = ["DaVinci Resolve", "DaVinci Fusion", "Fairlight", "Claude"];
const BEST_WORK_TOOLS = [
  "DaVinci Resolve",
  "DaVinci Fusion",
  "Fairlight",
  "Photopea",
  "OBS",
  "Flashback",
  "Claude",
];

export const metadata: Metadata = {
  title: "Work",
  description: "Channels I edit for, plus a selection of gaming, 3D, cinematic, and branded editing work.",
};

function ToolTags({ tools }: { tools: string[] }) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
        Made with
      </p>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <ToolTag key={tool} name={tool} />
        ))}
      </div>
    </div>
  );
}

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

        {/* Recently edited — big showcase */}
        <AnimatedSection>
          <section aria-labelledby="recent-heading">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Recently edited
            </p>
            <h2
              id="recent-heading"
              className="mb-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
            >
              Latest cut for{" "}
              <a
                href={CILUA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ember hover:underline"
              >
                cilua_
              </a>
            </h2>
            <p className="mb-6 max-w-lg text-muted-foreground">
              A video I recently edited for client cilua_.
            </p>
            <ToolTags tools={LATEST_CUT_TOOLS} />
            <YouTubePlayer id="wqIXwFEtYEk" title="Recently edited video for cilua_" />
          </section>
        </AnimatedSection>

        {/* Divider */}
        <div className="my-24 border-t border-border" />

        {/* Best work — the flagship showcase */}
        <AnimatedSection>
          <section aria-labelledby="best-heading">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
              My best work
            </p>
            <h2
              id="best-heading"
              className="mb-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
            >
              The one I&apos;m <span className="text-ember">proudest</span> of.
            </h2>
            <p className="mb-6 max-w-xl text-muted-foreground">
              Showcases storytelling, editing, Fusion effects, color grading, and 4K footage.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {["Storytelling", "Editing", "Fusion effects", "Color grading", "4K footage"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5 text-xs font-medium text-foreground/80"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>
            <ToolTags tools={BEST_WORK_TOOLS} />
            <YouTubePlayer id="zqv5NnJoDno" title="My best work showcase" />
          </section>
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
