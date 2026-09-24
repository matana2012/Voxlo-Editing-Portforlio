"use client";

import { useRef } from "react";
import { useTransform, type MotionValue } from "framer-motion";
import { useTimelineScroll } from "@/components/home/TimelineScrollContext";
import { Annotation } from "@/components/ui/Annotation";
import { drawLines } from "@/lib/motion/blueprint";
import { useScrollScrubbedAnimation } from "./useScrollScrubbedAnimation";
import { CONNECTORS, TOTAL_SCROLL_VH, type ConnectorDef } from "@/lib/motion/blueprintLayout";

/** Anchor point for a connector: horizontal offset from canvas center (vw), vertical position (vh). */
function anchorOf(range: ConnectorDef["from"] | ConnectorDef["to"]) {
  return { x: 50 + range.station.xVw, y: range.centerYVh };
}

function buildDoglegPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midY = (from.y + to.y) / 2;
  return `M ${from.x},${from.y} L ${from.x},${midY} L ${to.x},${midY} L ${to.x},${to.y}`;
}

/**
 * The SVG's viewBox is non-uniformly scaled (x-units track vw, y-units track
 * vh — two axes with very different px-per-unit ratios). `vector-effect:
 * non-scaling-stroke` keeps line strokes a crisp, undistorted screen-pixel
 * width regardless of that scale. Text does NOT get the same exemption, so
 * the dimension labels are rendered as ordinary positioned DOM elements
 * alongside the SVG, never inside a <foreignObject>, which would stretch.
 */
function Connector({ def, cameraProgress }: { def: ConnectorDef; cameraProgress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement>(null);
  const from = anchorOf(def.from);
  const to = anchorOf(def.to);
  const path = buildDoglegPath(from, to);

  const segmentProgress = useTransform(cameraProgress, def.drawRange, [0, 1]);

  useScrollScrubbedAnimation(segmentProgress, () =>
    pathRef.current ? drawLines(pathRef.current, { scrub: true }) : undefined
  );

  return (
    <path
      ref={pathRef}
      d={path}
      className="stroke-grid/70"
      fill="none"
      strokeWidth={1.25}
      vectorEffect="non-scaling-stroke"
    />
  );
}

/** Real DOM dimension label + tick marks at a connector's midpoint, positioned in plain vw/vh CSS. */
function ConnectorLabel({ def }: { def: ConnectorDef }) {
  const from = anchorOf(def.from);
  const to = anchorOf(def.to);
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${midX}vw`, top: `${midY}vh` }}
    >
      <Annotation className="whitespace-nowrap bg-background/60 px-1">
        Δ {def.deltaVh}vh
      </Annotation>
    </div>
  );
}

/**
 * One shared SVG spanning the whole canvas, coordinate-matched to it:
 * viewBox x-units = vw (0-100), y-units = vh (0-TOTAL_SCROLL_VH). Every
 * connector's line-draw progress is scrubbed directly to camera travel
 * through its gap — not triggered once — via useScrollScrubbedAnimation.
 */
export function BlueprintConnectors() {
  const cameraProgress = useTimelineScroll();
  if (!cameraProgress) return null;

  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0"
        style={{ width: "100vw", height: `${TOTAL_SCROLL_VH}vh` }}
        viewBox={`0 0 100 ${TOTAL_SCROLL_VH}`}
        preserveAspectRatio="none"
      >
        {CONNECTORS.map((def) => (
          <Connector key={def.id} def={def} cameraProgress={cameraProgress} />
        ))}
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-0 w-0">
        {CONNECTORS.map((def) => (
          <ConnectorLabel key={def.id} def={def} />
        ))}
      </div>
    </>
  );
}
