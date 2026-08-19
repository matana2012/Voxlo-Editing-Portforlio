"use client";

import { motion, useMotionTemplate, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { featuredPieces } from "@/lib/data/portfolioPieces";
import { ToolTag } from "@/components/work/ToolTag";
import { getYouTubeThumbnail } from "@/lib/utils";
import { useDragScrubber } from "./useDragScrubber";

const EASE = [0.16, 1, 0.3, 1] as const;

const piece = featuredPieces.find((p) => p.tags.includes("before-after"));

// Drop real clips at these paths and both video elements below activate
// automatically — until then this renders a still-frame demo of the same
// mechanic using the existing YouTube thumbnail.
const RAW_SRC = "/video/before-after-raw.mp4";
const GRADED_SRC = "/video/before-after-graded.mp4";
const HAS_VIDEO = false; // flip once the two files above exist in /public/video

export function BeforeAfter() {
  const { value, trackRef, onTrackClick, onDrag, onKeyDown } = useDragScrubber(50);
  const clip = useMotionTemplate`inset(0 0 0 ${value}%)`;
  const left = useMotionTemplate`${value}%`;

  const [reveal, setReveal] = useState(() => Math.round(value.get()));
  useMotionValueEvent(value, "change", (latest) => setReveal(Math.round(latest)));

  if (!piece) return null;
  const thumb = getYouTubeThumbnail(piece.youtubeId ?? "");

  return (
    <section className="px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Before / After</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Drag to see the difference.
          </h2>
        </div>

        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={reveal}
          onClick={onTrackClick}
          onKeyDown={onKeyDown}
          className="relative aspect-video w-full cursor-ew-resize select-none overflow-hidden rounded-xl border border-border bg-black outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {/* Before (raw) — full width, underneath */}
          {HAS_VIDEO ? (
            <video src={RAW_SRC} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <Image
              src={thumb}
              alt="Raw footage"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover grayscale contrast-75 brightness-90"
            />
          )}

          {/* After (graded) — clipped to the reveal position */}
          <motion.div style={{ clipPath: clip }} className="absolute inset-0">
            {HAS_VIDEO ? (
              <video src={GRADED_SRC} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <Image src={thumb} alt="Graded edit" fill sizes="(max-width: 768px) 100vw, 896px" className="object-cover" />
            )}
          </motion.div>

          {/* Handle */}
          <motion.div
            onPan={onDrag}
            style={{ left, x: "-50%" }}
            className="absolute top-0 z-10 flex h-full w-11 -translate-x-1/2 cursor-ew-resize items-center justify-center"
          >
            <div className="pointer-events-none absolute h-full w-px bg-accent/70" />
            <div className="pointer-events-none flex h-9 w-9 items-center justify-center rounded-full border border-accent/50 bg-background/80 backdrop-blur-sm">
              <GripVertical className="h-4 w-4 text-accent" />
            </div>
          </motion.div>

          <span className="pointer-events-none absolute left-3 top-3 text-[10px] uppercase tracking-widest text-white/60">
            Raw
          </span>
          <span className="pointer-events-none absolute right-3 top-3 text-[10px] uppercase tracking-widest text-white/60">
            Graded
          </span>
        </div>

        {piece.tools.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {piece.tools.map((tool) => (
              <ToolTag key={tool} name={tool} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
