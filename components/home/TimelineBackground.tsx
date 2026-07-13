"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Scroll-driven "editing timeline" background.
 * Two panels of VERTICAL timeline tracks frame the page left and right. As you
 * scroll they travel downward and rotate further into perspective — like two
 * walls of clips you descend past. The center stays clear for content.
 * Rendered behind everything; respects prefers-reduced-motion.
 */

// Warm cinematic clip palette — ambers, embers, rust and cream to match the brand.
const COLORS = [
  "#F5A623", // amber
  "#FF8A3D", // light orange
  "#E8620A", // burnt orange
  "#C1440E", // rust
  "#8A2B0A", // ember red
  "#7A3410", // deep brown
  "#B4531C", // copper
  "#F5C271", // pale gold
  "#F4EEE4", // cream highlight
];

// Deterministic pseudo-random (identical on server + client → no hydration mismatch).
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const TRACKS = 6;
const CLIPS_PER_TRACK = 26;

function buildColumn(salt: number) {
  return Array.from({ length: TRACKS }, (_, t) => {
    const width = 24 + Math.round(rand(salt * 77 + t) * 26); // track (clip) width
    const offset = rand(salt * 31 + t) * 90; // vertical stagger between tracks
    const clips = Array.from({ length: CLIPS_PER_TRACK }, (_, c) => {
      const s = salt * 1000 + t * 31 + c;
      return {
        h: 44 + Math.round(rand(s) * 120), // vertical clip height
        color: COLORS[Math.floor(rand(s + 7) * COLORS.length)],
        lit: rand(s + 19) > 0.86,
      };
    });
    return { width, offset, clips };
  });
}

const leftColumn = buildColumn(1);
const rightColumn = buildColumn(2);

interface ColumnProps {
  side: "left" | "right";
  tracks: ReturnType<typeof buildColumn>;
  y: MotionValue<string> | string;
  rotate: MotionValue<number> | number;
}

function Column({ side, tracks, y, rotate }: ColumnProps) {
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
        className={`absolute top-1/2 flex -translate-y-1/2 flex-row gap-[9px] opacity-60 will-change-transform ${
          isLeft ? "left-0" : "right-0 flex-row-reverse"
        }`}
      >
        {tracks.map((track, t) => (
          <div
            key={t}
            className="flex flex-col gap-[9px]"
            style={{ transform: `translateY(-${track.offset}px)` }}
          >
            {track.clips.map((clip, j) => (
              <div
                key={j}
                className="rounded-[3px]"
                style={{
                  width: track.width,
                  height: clip.h,
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
  const { scrollYProgress } = useScroll();

  // Travel downward and rotate further into perspective while scrolling.
  // Always scroll-linked — this motion is the signature of the page.
  const y = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);
  const rotL = useTransform(scrollYProgress, [0, 1], [24, 52]);
  const rotR = useTransform(scrollYProgress, [0, 1], [-24, -52]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Column side="left" tracks={leftColumn} y={y} rotate={rotL} />
      <Column side="right" tracks={rightColumn} y={y} rotate={rotR} />

      {/* Gentle top/bottom fade so the columns dissolve into the page edges. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
