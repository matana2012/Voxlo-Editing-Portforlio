"use client";

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
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted">
      <div className="p-4 sm:p-6 md:p-8">

        {/* ── Video player (autoplays when opened) ──────────────── */}
        {piece.youtubeId ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${piece.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={piece.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-border bg-black/40">
            <p className="text-sm text-muted-foreground">Video coming soon</p>
          </div>
        )}

        {/* ── Meta row ──────────────────────────────────────────── */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {piece.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  {CATEGORY_LABELS[tag] ?? tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {piece.title}
            </h2>

            {/* Client · Runtime */}
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
              {piece.clientUrl ? (
                <a
                  href={piece.clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 transition-colors hover:text-foreground"
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
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            aria-label="Close details"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── What was done + Tools / Result ───────────────────── */}
        {(piece.whatWasDone.length > 0 || piece.tools.length > 0 || piece.result) && (
          <>
            <div className="my-6 border-t border-border" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              {piece.whatWasDone.length > 0 && (
                <div>
                  <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                    What was done
                  </p>
                  <ul className="space-y-3">
                    {piece.whatWasDone.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                        <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(piece.tools.length > 0 || piece.result) && (
                <div className="space-y-6">
                  {piece.tools.length > 0 && (
                    <div>
                      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                        Tools
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {piece.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs text-foreground/80"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {piece.result && (
                    <div>
                      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                        Result
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{piece.result}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
