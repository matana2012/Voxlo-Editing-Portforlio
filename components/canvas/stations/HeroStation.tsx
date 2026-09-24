"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { utils } from "animejs";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { assembleHeadline, construct } from "../construct";
import { prefersReducedMotion } from "@/lib/motion/blueprint";
import { Dimension, Mono } from "../primitives";
import { useCanvasState } from "@/lib/canvas/store";
import { MotionOptIn } from "../MotionOptIn";

export type Variant = "canvas" | "stack";

const SPEC = [
  { k: "Disciplines", v: "3D & motion · Gaming · IRL & branded" },
  { k: "Channels", v: "Ren, @klentbolt, cilua_, RustyOldMan, Vincent Global Services" },
  { k: "Workflow", v: "DaVinci Resolve · Fusion · Fairlight" },
];

/**
 * 01 — the first sheet. Not a centred wordmark: an editorial headline set
 * low-left on the board, a spec block on the right like a drawing's legend,
 * and the start of the route leaving the frame toward Work.
 */
export function HeroStation({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const { goto } = useCanvasState();
  const canvas = variant === "canvas";

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.classList.contains("is-pending")) return;
    if (headRef.current && !prefersReducedMotion()) utils.set(headRef.current.querySelectorAll("[data-line] > span"), { translateY: "130%" });
    construct(el, { delay: 350 });
    if (headRef.current) assembleHeadline(headRef.current, 150);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "is-pending relative",
        canvas ? "absolute inset-0 px-[6vw] pb-[9vh] pt-[15vh]" : "flex min-h-[92svh] flex-col px-6 pb-16 pt-28"
      )}
    >
      {/* Sheet heading */}
      <div data-reveal className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <Mono className="text-gold">01</Mono>
        <Mono className="text-cream/85">Voxlo Editing</Mono>
        <Mono>Freelance video editor — Anakin Matthew</Mono>
      </div>

      <div className={cn(canvas ? "absolute bottom-[12vh] left-[6vw] w-[62vw]" : "mt-auto pt-16")}>
        <h1
          ref={headRef}
          className={cn(
            "font-display font-normal  tracking-[-0.025em] text-cream",
            canvas ? "text-[min(8.4vw,15.5vh)]" : "text-[clamp(3rem,13vw,5.5rem)]",
            "leading-[0.92]"
          )}
        >
          <span data-line>
            <span>Cuts that keep</span>
          </span>
          <span data-line>
            <span>
              people <em className="font-light italic text-gold">watching.</em>
            </span>
          </span>
        </h1>

        <Dimension label="Three genres · one standard" className={cn("mt-[3.2vh]", canvas ? "w-[58%]" : "w-full")} />

        <div data-reveal className={cn("flex flex-wrap items-center gap-x-8 gap-y-4", canvas ? "mt-[4.5vh]" : "mt-10")}>
          {canvas ? (
            <button
              type="button"
              onClick={() => goto?.("work")}
              className="group inline-flex h-12 items-center gap-3 bg-gold px-6 text-sm font-medium text-navy transition-colors hover:bg-cream"
            >
              See the work
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
          ) : (
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-3 bg-gold px-6 text-sm font-medium text-navy transition-colors hover:bg-cream"
            >
              See the work
              <ArrowDownRight className="h-4 w-4" />
            </a>
          )}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border-b border-cream/30 pb-1 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Start a project
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {!canvas && (
        <div className="mt-10">
          <MotionOptIn mode="enable" />
        </div>
      )}

      {/* Legend / spec block */}
      <dl
        className={cn(
          canvas ? "absolute right-[6vw] top-[15vh] w-[min(24vw,360px)]" : "mt-14 w-full",
          "border-t border-line/30"
        )}
      >
        {SPEC.map((row) => (
          <div key={row.k} data-reveal className="grid grid-cols-[92px_1fr] gap-4 border-b border-line/20 py-3.5">
            <dt>
              <Mono>{row.k}</Mono>
            </dt>
            <dd className="text-[13px] leading-snug text-cream/85">{row.v}</dd>
          </div>
        ))}
      </dl>

      {canvas && (
        <div data-reveal aria-hidden className="absolute left-[73.5vw] top-[82vh] flex -translate-y-1/2 items-center gap-3">
          <Mono>Scroll to travel</Mono>
          <ArrowDownRight className="h-3.5 w-3.5 text-gold" />
        </div>
      )}
    </div>
  );
}
