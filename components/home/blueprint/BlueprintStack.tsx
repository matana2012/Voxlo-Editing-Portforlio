"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Annotation } from "@/components/ui/Annotation";
import { constructionReveal } from "@/lib/motion/blueprint";
import { STATION_RANGES } from "@/lib/motion/blueprintLayout";

/**
 * The mobile / prefers-reduced-motion path: a genuinely different render,
 * not a slowed-down camera. Same seven stations, same blueprint visual
 * language (grid, corner brackets, connector lines, coordinate labels), same
 * real content — but stacked in a single column with one-shot,
 * useInView-triggered construction reveals instead of scroll-scrubbing.
 * Avoids free 2D panning's disorientation risk on touch and the
 * position:sticky + large-transform compositing issues iOS Safari has a long
 * history with.
 */
export function BlueprintStack({ sections }: { sections: { id: string; node: React.ReactNode }[] }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="blueprint-grid-dense fixed inset-0 -z-10" />
      <div className="absolute left-4 top-20 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 sm:block md:left-6">
        VOXLO / EDIT SYSTEM
      </div>

      {sections.map(({ id, node }, i) => {
        const range = STATION_RANGES.find((r) => r.station.id === id);
        return (
          <div key={id}>
            <StackItem stationLabel={range ? `${String(range.station.hudIndex).padStart(2, "0")} — ${range.station.hudLabel}` : id}>
              {node}
            </StackItem>
            {i < sections.length - 1 && <StackConnector />}
          </div>
        );
      })}
    </div>
  );
}

function StackItem({ stationLabel, children }: { stationLabel: string; children: React.ReactNode }) {
  const bracketsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    if (!inView || !bracketsRef.current || !contentRef.current) return;
    constructionReveal({
      brackets: bracketsRef.current.querySelectorAll<SVGElement>("[data-bracket]"),
      content: contentRef.current,
    });
  }, [inView]);

  return (
    <div ref={inViewRef} className="relative mx-auto max-w-5xl px-6 py-4">
      <div ref={bracketsRef} aria-hidden="true" className="pointer-events-none absolute -inset-2">
        {(["tl", "tr", "bl", "br"] as const).map((corner) => (
          <svg
            key={corner}
            data-bracket
            className={`absolute h-6 w-6 text-grid ${
              { tl: "left-0 top-0", tr: "right-0 top-0 -scale-x-100", bl: "left-0 bottom-0 -scale-y-100", br: "right-0 bottom-0 -scale-100" }[corner]
            }`}
            viewBox="0 0 28 28"
            fill="none"
          >
            <path d="M2 12 V2 H12" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        ))}
      </div>
      <Annotation variant="index" className="mb-4 block">
        {stationLabel}
      </Annotation>
      <div ref={contentRef} className="opacity-0">
        {children}
      </div>
    </div>
  );
}

function StackConnector() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const path = ref.current.querySelector<SVGElement>("[data-connector-line]");
    if (path) constructionReveal({ brackets: [path], content: ref.current });
  }, [inView]);

  return (
    <div className="mx-auto flex max-w-5xl justify-center px-6">
      <svg ref={ref} width="1.5" height="48" viewBox="0 0 1.5 48" aria-hidden="true">
        <line data-connector-line x1="0.75" y1="0" x2="0.75" y2="48" className="stroke-grid/70" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
