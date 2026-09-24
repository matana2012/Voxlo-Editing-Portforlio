"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { TimelineScrollContext } from "@/components/home/TimelineScrollContext";
import { BlueprintConnectors } from "./BlueprintConnectors";
import {
  CAMERA_PROGRESS_STOPS,
  CAMERA_X_STOPS,
  CAMERA_Y_STOPS,
  STATIONS,
  TOTAL_SCROLL_VH,
  stationAtProgress,
} from "@/lib/motion/blueprintLayout";

/**
 * The blueprint's spatial engine: a tall spacer drives one scroll subscription,
 * a sticky viewport frames a fixed 100vh window, and the canvas inside it pans
 * under a scroll-linked transform so the seven stations read as one large
 * technical drawing the visitor travels through — not a stacked page.
 *
 * Rule enforced by this file's existence: nothing inside <BlueprintCanvas>
 * may call its own useScroll({ target }) — that measures layout position
 * (offsetTop), which does not track this component's own transform. Every
 * consumer reads a slice of the one shared progress value via
 * useTimelineScroll(), provided below.
 */
export function BlueprintCanvas({ children }: { children: React.ReactNode }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: spacerRef, offset: ["start start", "end end"] });

  const camXvw = useTransform(scrollYProgress, CAMERA_PROGRESS_STOPS, CAMERA_X_STOPS);
  const camYvh = useTransform(scrollYProgress, CAMERA_PROGRESS_STOPS, CAMERA_Y_STOPS);
  const negX = useTransform(camXvw, (v) => -v);

  // Directly scroll-linked, no spring smoothing — the standard, robust
  // pattern for scroll-driven camera work. Native scroll already provides
  // the perceived smoothness; a value-spring here proved unreliable at
  // tracking a continuously-changing target during fast/programmatic scroll.
  const canvasTransform = useMotionTemplate`translate3d(${negX}vw, calc(50vh - ${camYvh}vh), 0)`;

  // Mount-gated HUD readout — avoids binding a live MotionValue into SSR'd
  // text (the exact hydration-mismatch bug from the previous round).
  const [mounted, setMounted] = useState(false);
  const [currentStation, setCurrentStation] = useState(STATIONS[0]);
  useEffect(() => setMounted(true), []);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentStation(stationAtProgress(latest));
  });

  return (
    <TimelineScrollContext.Provider value={scrollYProgress}>
      <div ref={spacerRef} style={{ height: `${TOTAL_SCROLL_VH}vh` }} className="relative">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ transform: canvasTransform, willChange: "transform" }}
          >
            <div
              aria-hidden="true"
              className="blueprint-grid-dense absolute left-0 top-0"
              style={{ width: "100vw", height: `${TOTAL_SCROLL_VH}vh` }}
            />
            <BlueprintConnectors />
            {children}
          </motion.div>

          {/* Fixed HUD chrome — persistent, does not pan with the canvas. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute left-4 top-20 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 sm:block md:left-6">
              VOXLO / EDIT SYSTEM
            </div>
            <div className="absolute bottom-6 right-4 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 sm:block md:right-6">
              {mounted ? `${String(currentStation.hudIndex).padStart(2, "0")} / ${currentStation.hudLabel}` : "01 / IDENTITY"}
            </div>
          </div>

          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </TimelineScrollContext.Provider>
  );
}
