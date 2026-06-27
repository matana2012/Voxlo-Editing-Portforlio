"use client";

import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import type { PortfolioPiece } from "@/lib/data/portfolioPieces";

interface PieceDetailProps {
  piece: PortfolioPiece;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  "3d": "3D",
  gaming: "Gaming",
  irl: "IRL",
  "short-form": "Short-Form",
  "long-form": "Long-Form",
  branded: "Branded",
  "before-after": "Before / After",
};

export function PieceDetail({ piece, onClose }: PieceDetailProps) {
  const youtubeHref = piece.youtubeId
    ? `https://www.youtube.com/watch?v=${piece.youtubeId}`
    : undefined;

  return (
    <div className="rounded-2xl border border-border bg-white/[0.03] overflow-hidden">
      <div className="p-6 md:p-8">

        {/* ── Header: thumbnail + meta ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-7">

          {/* Thumbnail */}
          {piece.thumbnailUrl && (
            <a
              href={youtubeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex-shrink-0 w-full sm:w-56 md:w-64 aspect-video rounded-xl overflow-hidden"
              aria-label={`Watch ${piece.title} on YouTube`}
            >
              <Image
                src={piece.thumbnailUrl}
                alt={piece.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 256px"
              />
              {youtubeHref && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5">
                  <span className="text-white text-sm font-medium">Watch</span>
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              )}
            </a>
          )}

          {/* Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {piece.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest bg-white/5 text-muted-foreground px-2.5 py-1 rounded-full border border-border"
                    >
                      {CATEGORY_LABELS[tag] ?? tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-foreground leading-tight">
                  {piece.title}
                </h2>

                {/* Client · Runtime */}
                <p className="mt-2 text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {piece.clientUrl ? (
                    <a
                      href={piece.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
                    >
                      {piece.client}
                      <ArrowUpRight className="h-3 w-3 opacity-50" />
                    </a>
                  ) : (
                    <span>{piece.client}</span>
                  )}
                  {piece.runtime && (
                    <>
                      <span className="text-muted-foreground/30">·</span>
                      <span>{piece.runtime}</span>
                    </>
                  )}
                </p>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                aria-label="Close details"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────── */}
        <div className="border-t border-border my-6" />

        {/* ── What was done + Tools / Result ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* What was done */}
          {piece.whatWasDone.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4">
                What was done
              </p>
              <ul className="space-y-3">
                {piece.whatWasDone.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Right col: Tools + Result */}
          {(piece.tools.length > 0 || piece.result) && (
            <div className="space-y-6">
              {piece.tools.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4">
                    Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {piece.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs text-foreground/80 bg-white/5 border border-border px-3 py-1.5 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {piece.result && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-4">
                    Result
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{piece.result}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
