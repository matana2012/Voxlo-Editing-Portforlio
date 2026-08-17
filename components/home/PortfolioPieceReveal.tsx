"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Plus, X } from "lucide-react";
import type { PortfolioPiece } from "@/lib/data/portfolioPieces";
import { CATEGORY_LABELS } from "@/lib/data/portfolioPieces";
import { YouTubePlayer } from "@/components/work/YouTubePlayer";
import { ToolTag } from "@/components/work/ToolTag";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Hand-authored entrance presets — pieces enter differently from each
// other by composition, not by reusing one shared variant on a loop.
const VARIANTS = [
  { initial: { opacity: 0, x: -64, scale: 0.96 }, align: "left" as const },
  { initial: { opacity: 0, x: 64, scale: 0.96 }, align: "right" as const },
  { initial: { opacity: 0, y: 72, scale: 1.04 }, align: "left" as const },
  { initial: { opacity: 0, y: 72, rotate: -1.5 }, align: "right" as const },
];

interface PortfolioPieceRevealProps {
  piece: PortfolioPiece;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function PortfolioPieceReveal({ piece, index, isExpanded, onToggle }: PortfolioPieceRevealProps) {
  const variant = VARIANTS[index % VARIANTS.length];
  const detailItems = piece.whatWasDone.slice(0, 3);
  const showTools = detailItems.length === 0 && piece.tools.length > 0;

  return (
    <motion.div
      layout
      initial={variant.initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: EASE, layout: { duration: 0.5, ease: EASE } }}
      className={cn(
        "mx-auto grid w-full max-w-5xl gap-8 py-16 md:py-24",
        isExpanded ? "grid-cols-1" : variant.align === "right" ? "md:grid-cols-[1fr_1.1fr] md:items-center" : "md:grid-cols-[1.1fr_1fr] md:items-center"
      )}
    >
      {/* Video / thumbnail */}
      <motion.div
        layout
        className={cn(!isExpanded && variant.align === "right" ? "md:order-2" : undefined)}
      >
        <YouTubePlayer
          id={piece.youtubeId ?? ""}
          title={piece.title}
          poster={piece.thumbnailUrl}
          linkUrl={piece.videoUrl}
        />
      </motion.div>

      {/* Meta */}
      <div className={cn(!isExpanded && variant.align === "right" ? "md:order-1" : undefined)}>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {piece.tags.map((tag) => (
            <span
              key={tag}
              className="border-b border-accent/30 pb-0.5 text-[10px] uppercase tracking-widest text-accent"
            >
              {CATEGORY_LABELS[tag] ?? tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
          {piece.title}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          {piece.clientUrl ? (
            <a
              href={piece.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              {piece.client}
              <ArrowUpRight className="h-3 w-3 opacity-50" />
            </a>
          ) : (
            piece.client
          )}
          {piece.runtime && <span className="text-muted-foreground/40">· {piece.runtime}</span>}
        </p>

        {!showTools && detailItems.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {detailItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {showTools && (
          <div className="mt-6 flex flex-wrap gap-2">
            {piece.tools.map((tool) => (
              <ToolTag key={tool} name={tool} />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onToggle}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          {isExpanded ? (
            <>
              <X className="h-4 w-4" /> Close
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> What I did on this one
            </>
          )}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-6 overflow-hidden border-t border-border pt-6"
          >
            {piece.whatWasDone.length > 0 && (
              <ul className="space-y-2.5">
                {piece.whatWasDone.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {piece.tools.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {piece.tools.map((tool) => (
                  <ToolTag key={tool} name={tool} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
