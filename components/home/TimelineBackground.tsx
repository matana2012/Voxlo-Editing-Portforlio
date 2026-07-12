"use client";

import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * Scroll-driven "editing timeline" background.
 * Two vertical timeline panels frame the page on the left and right. As you
 * scroll they descend and rotate further into perspective — like two walls of
 * a corridor you're travelling down into. The center stays clear for content.
 * Rendered behind everything; respects prefers-reduced-motion.
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

const ROWS = 34;
const CLIPS_PER_ROW = 7;

function buildColumn(salt: number) {
  return Array.from({ length: ROWS }, (_, r) => {
    const offset = rand(salt * 50 + r) * 60;
    const clips = Array.from({ length: CLIPS_PER_ROW }, (_, c) => {
      const s = salt * 1000 + r * 13 + c;
      return {
        w: 30 + Math.round(rand(s) * 96),
        color: COLORS[Math.floor(rand(s + 7) * COLORS.length)],
        lit: rand(s + 19) > 0.86,
      };
    });
    return { offset, clips };
  });
}

const leftColumn = buildColumn(1);
const rightColumn = buildColumn(2);

interface ColumnProps {
  side: "left" | "right";
  lanes: ReturnType<typeof buildColumn>;
  y: MotionValue<string> | string;
  rotate: MotionValue<number> | number;
}

function Column({ side, lanes, y, rotate }: ColumnProps) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute top-0 h-full ${
        isLeft ? "left-0" : "right-0"
      } hidden w-[34%] overflow-hidden sm:block md:w-[30%]`}
      style={{ perspective: "1300px" }}
    >
      <motion.div
        style={{
          y,
          rotateY: rotate,
          transformOrigin: isLeft ? "left center" : "right center",
          transformStyle: "preserve-3d",
        }}
        className={`absolute top-1/2 flex h-[150%] w-[170%] -translate-y-1/2 flex-col justify-center gap-[10px] opacity-60 will-change-transform ${
          isLeft ? "left-0 items-start" : "right-0 items-end"
        }`}
      >
        {lanes.map((lane, i) => (
          <div
            key={i}
            className={`flex gap-[7px] ${isLeft ? "flex-row" : "flex-row-reverse"}`}
            style={{ transform: `translateX(${isLeft ? "-" : ""}${lane.offset}px)` }}
          >
            {lane.clips.map((clip, j) => (
              <div
                key={j}
                className="h-5 rounded-[3px] md:h-6"
                style={{
                  width: clip.w,
                  backgroundColor: clip.color,
                  boxShadow: clip.lit ? `0 0 12px 1px ${clip.color}` : undefined,
                  opacity: clip.lit ? 1 : 0.92,
                }}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* Fade the inner edge toward the center so text never fights the clips. */}
      <div
        className={`absolute inset-0 ${
          isLeft
            ? "bg-gradient-to-r from-transparent via-background/55 to-background"
            : "bg-gradient-to-l from-transparent via-background/55 to-background"
        }`}
      />
    </div>
  );
}

export function TimelineBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Descend (translate down) and rotate further into perspective while scrolling.
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "-26%"]);
  const rotL = useTransform(scrollYProgress, [0, 1], [26, 46]);
  const rotR = useTransform(scrollYProgress, [0, 1], [-26, -46]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Column
        side="left"
        lanes={leftColumn}
        y={reduceMotion ? "-12%" : y}
        rotate={reduceMotion ? 34 : rotL}
      />
      <Column
        side="right"
        lanes={rightColumn}
        y={reduceMotion ? "-12%" : y}
        rotate={reduceMotion ? -34 : rotR}
      />

      {/* Gentle top/bottom fade so the columns dissolve into the page edges. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
