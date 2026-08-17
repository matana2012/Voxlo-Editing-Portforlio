"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent } from "framer-motion";
import { useDragScrubber } from "./useDragScrubber";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Warm clip palette, matching TimelineBackground's — a deliberate callback
// rather than a new decorative element.
const BAR_COLORS = ["#F5A623", "#FF8A3D", "#E8620A", "#C1440E", "#8A2B0A", "#B4531C"];

const STAGES = [
  {
    key: "story",
    label: "Story",
    copy: "Watch the raw footage first. Find the actual arc before touching a single cut.",
  },
  {
    key: "pacing",
    label: "Pacing",
    copy: "Cut for rhythm — trims, holds, and hard cuts placed where attention naturally moves.",
  },
  {
    key: "motion",
    label: "Motion",
    copy: "Fusion for graphics, transitions, and any 3D that needs to sit believably in the frame.",
  },
  {
    key: "sound",
    label: "Sound",
    copy: "Clean dialogue, mixed music and SFX, leveled so nothing in the edit fights for attention.",
  },
] as const;

function StoryVisual() {
  return (
    <div className="space-y-2 font-mono text-xs leading-relaxed text-muted-foreground">
      <p>00:00 — cold open, no music</p>
      <p>00:04 — reveal the stakes</p>
      <p className="text-accent">00:11 — hook lands here</p>
    </div>
  );
}

function PacingVisual() {
  return (
    <div className="flex h-16 items-end gap-1.5">
      {BAR_COLORS.map((color, i) => (
        <div
          key={i}
          className="w-3 rounded-[2px]"
          style={{ height: `${28 + ((i * 37) % 100) * 0.36}px`, backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function MotionVisual() {
  return (
    <div className="flex h-16 items-center gap-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: [0, 8, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          className="h-10 w-10 rounded-[3px] border border-accent/50"
          style={{ background: `linear-gradient(135deg, rgba(245,166,35,0.25), transparent)` }}
        />
      ))}
    </div>
  );
}

function SoundVisual() {
  return (
    <div className="flex h-16 items-end gap-1">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-accent/70"
          animate={{ height: [6, 10 + ((i * 23) % 40), 6] }}
          transition={{ duration: 1.1 + (i % 4) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

const VISUALS = { story: StoryVisual, pacing: PacingVisual, motion: MotionVisual, sound: SoundVisual };

export function ProcessScrubber() {
  const { value, trackRef, onTrackClick, onDrag, onKeyDown } = useDragScrubber(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(value, "change", (latest) => {
    const i = Math.min(STAGES.length - 1, Math.floor((latest / 100) * STAGES.length));
    setActiveIndex(i);
  });

  const active = STAGES[activeIndex];
  const Visual = VISUALS[active.key];
  const left = useMotionTemplate`${value}%`;

  return (
    <section className="px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Process</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            How I get there.
          </h2>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Editing process stage"
          aria-valuemin={0}
          aria-valuemax={STAGES.length - 1}
          aria-valuenow={activeIndex}
          aria-valuetext={active.label}
          onClick={onTrackClick}
          onKeyDown={(e) => onKeyDown(e, 100 / STAGES.length)}
          className="relative h-px w-full cursor-pointer bg-border outline-none"
        >
          <motion.div
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={onDrag}
            style={{ left, x: "-50%" }}
            className="absolute -top-3 z-10 h-6 w-4 cursor-ew-resize"
          >
            <div className="mx-auto h-full w-0.5 bg-accent" />
          </motion.div>
          <div className="absolute inset-y-0 left-0 flex w-full justify-between">
            {STAGES.map((stage, i) => (
              <button
                key={stage.key}
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  value.set((i / (STAGES.length - 1)) * 100);
                }}
                className="group relative -translate-y-1/2"
              >
                <span
                  className={cn(
                    "block h-2.5 w-2.5 rounded-full border transition-colors",
                    i === activeIndex
                      ? "border-accent bg-accent"
                      : "border-muted-foreground/40 bg-background group-hover:border-accent/60"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest transition-colors",
                    i === activeIndex ? "text-accent" : "text-muted-foreground/60"
                  )}
                >
                  {String(i + 1).padStart(2, "0")} {stage.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active stage detail */}
        <div className="mt-16 grid grid-cols-1 items-center gap-8 sm:grid-cols-[auto_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex justify-center sm:justify-start"
            >
              <Visual />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={active.key + "-copy"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="text-sm leading-relaxed text-muted-foreground"
            >
              {active.copy}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
