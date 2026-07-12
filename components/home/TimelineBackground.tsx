"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-driven "editing timeline" background.
 * Rows of colored clips (like a video editor's timeline), tilted into
 * perspective, that wheel downward as the page scrolls and settle at the end.
 * Rendered behind all content at low opacity so foreground text stays readable.
 */

// Palette pulled from the showreel timeline — vivid clip colors.
const COLORS = [
  "#EC4899", // pink
  "#8B5CF6", // purple
  "#3B82F6", // blue (accent)
  "#60A5FA", // light blue
  "#22C55E", // green
  "#4ADE80", // light green
  "#F97316", // orange
  "#06B6D4", // cyan
  "#E5E7EB", // white
];

// Deterministic pseudo-random (identical on server + client → no hydration mismatch).
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const LANES = 14;
const CLIPS_PER_LANE = 18;

// Precompute lanes deterministically at module load.
const lanes = Array.from({ length: LANES }, (_, l) => {
  const offset = rand(l * 3.3) * 160; // horizontal stagger per lane
  const clips = Array.from({ length: CLIPS_PER_LANE }, (_, c) => {
    const s = l * 100 + c;
    return {
      w: 36 + Math.round(rand(s) * 150), // clip width px
      color: COLORS[Math.floor(rand(s + 7) * COLORS.length)],
      lit: rand(s + 19) > 0.82, // a few "highlighted" white-ish clips
    };
  });
  return { offset, clips };
});

export function TimelineBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Progress of the whole page scroll (0 at top, 1 at bottom).
  const { scrollYProgress } = useScroll();

  // Wheel the timeline plane downward and roll it slightly as you scroll.
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "-46%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0.08, 0.24, 0.24, 0.14]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Tilted, scroll-driven timeline plane */}
      <motion.div
        style={
          reduceMotion
            ? { opacity: 0.14, transform: "rotateX(58deg) rotateZ(-3deg)" }
            : { y, rotate, opacity, transformPerspective: 1000 }
        }
        className="absolute left-1/2 top-1/2 flex w-[180%] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 will-change-transform [transform:rotateX(58deg)]"
      >
        {lanes.map((lane, i) => (
          <div
            key={i}
            className="flex gap-2"
            style={{ transform: `translateX(-${lane.offset}px)` }}
          >
            {lane.clips.map((clip, j) => (
              <div
                key={j}
                className="h-6 rounded-[3px] md:h-7"
                style={{
                  width: clip.w,
                  backgroundColor: clip.color,
                  boxShadow: clip.lit
                    ? `0 0 12px 1px ${clip.color}`
                    : undefined,
                  opacity: clip.lit ? 1 : 0.9,
                }}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* Readability scrims: darken center + fade edges so text stays legible. */}
      <div className="absolute inset-0 bg-background/62" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_72%)]" />
    </div>
  );
}
