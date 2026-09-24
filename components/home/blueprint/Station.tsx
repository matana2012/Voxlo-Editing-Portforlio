"use client";

import { useRef } from "react";
import { useTransform } from "framer-motion";
import { useTimelineScroll } from "@/components/home/TimelineScrollContext";
import { Annotation } from "@/components/ui/Annotation";
import { cn } from "@/lib/utils";
import { constructionReveal } from "@/lib/motion/blueprint";
import { useScrollScrubbedAnimation } from "./useScrollScrubbedAnimation";
import { STATION_RANGE_BY_ID } from "@/lib/motion/blueprintLayout";

const CORNERS = ["tl", "tr", "bl", "br"] as const;
type Corner = (typeof CORNERS)[number];

const CORNER_CLASS: Record<Corner, string> = {
  tl: "left-0 top-0",
  tr: "right-0 top-0 -scale-x-100",
  bl: "left-0 bottom-0 -scale-y-100",
  br: "right-0 bottom-0 -scale-100",
};

interface StationProps {
  id: string;
  children: React.ReactNode;
  /**
   * Which edge of the panel anchors to the station's canvas X — "center"
   * reproduces the old centered-block behavior; "left"/"right" pin an edge
   * instead, so the panel sits off to one side of the canvas rather than
   * every station landing dead-center on the camera. Different stations
   * should use different values — that variety IS the point.
   */
  align?: "left" | "right" | "center";
  /** Hero/Identity only: a full-canvas-width stage for its own internal asymmetric layout, not a content "panel" at all. */
  fullBleed?: boolean;
}

/**
 * A positioned station on the blueprint canvas: real (top/x) placement from
 * the layout table, corner brackets that draw on as strokes, and the
 * existing content component rendered untouched as children. The
 * construction reveal is scrubbed directly to camera arrival, not
 * triggered-once — it plays forward AND backward as the camera passes,
 * matching genuine spatial travel rather than a one-shot page animation.
 */
export function Station({ id, children, align = "center", fullBleed = false }: StationProps) {
  const range = STATION_RANGE_BY_ID.get(id);
  if (!range) throw new Error(`Unknown blueprint station id: ${id}`);
  const { station, revealRange, startVh, chunkVh } = range;

  // The very first station is on-screen the instant the page loads — there's
  // no scroll-driven "arrival" for it to react to, so its base visibility
  // doesn't depend on the scrub system at all (only stations reached by
  // actually scrolling need a hidden starting state to reveal from).
  const isFirstStation = station.hudIndex === 1;

  const bracketsHostRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Guaranteed non-null: Station only ever renders inside BlueprintCanvas's provider.
  const cameraProgress = useTimelineScroll()!;
  const localProgress = useTransform(cameraProgress, revealRange, [0, 1]);

  useScrollScrubbedAnimation(
    localProgress,
    () =>
      !isFirstStation && bracketsHostRef.current && contentRef.current
        ? constructionReveal(
            {
              brackets: bracketsHostRef.current.querySelectorAll<SVGElement>("[data-bracket]"),
              content: contentRef.current,
            },
            { scrub: true }
          )
        : undefined,
    [id]
  );

  // The station's panel edge that anchors to canvas X — center/left/right
  // produce genuinely different compositions, not a cosmetic tweak.
  const edgeTransform =
    align === "left"
      ? `translateX(${station.xVw}vw)`
      : align === "right"
      ? `translateX(calc(-100% + ${station.xVw}vw))`
      : `translateX(calc(-50% + ${station.xVw}vw))`;

  return (
    <div
      className="absolute left-1/2"
      style={{
        top: `${startVh}vh`,
        minHeight: `${chunkVh}vh`,
        width: fullBleed ? "min(98vw, 1800px)" : "min(88vw, 760px)",
        transform: edgeTransform,
      }}
    >
      {!fullBleed && (
        <div ref={bracketsHostRef} aria-hidden="true" className="pointer-events-none absolute -inset-5">
          {CORNERS.map((corner) => (
            <svg
              key={corner}
              data-bracket
              className={`absolute h-7 w-7 text-grid ${CORNER_CLASS[corner]}`}
              viewBox="0 0 28 28"
              fill="none"
            >
              <path d="M2 12 V2 H12" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          ))}
        </div>
      )}

      {!fullBleed && (
        <Annotation
          variant="index"
          className={cn("mb-4 block", align === "right" && "text-right")}
        >
          {String(station.hudIndex).padStart(2, "0")} — {station.hudLabel}
        </Annotation>
      )}

      <div ref={contentRef} className={isFirstStation ? "" : "opacity-0"}>
        {children}
      </div>
    </div>
  );
}
