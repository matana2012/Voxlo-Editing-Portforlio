"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Annotation } from "@/components/ui/Annotation";
import { constructHeadline, drawLines } from "@/lib/motion/blueprint";

const TAGLINE = "Cuts that keep people watching.";

/**
 * The identity station's first viewport — not a centered marketing banner.
 * VOXLO and EDITING are two separate typographic elements at different
 * positions on the sheet, joined by a real construction line, with a
 * title-block panel (tagline + CTAs) framed like a drawing's spec box.
 * Entrance is a sequenced construction: VOXLO draws in, the connector line
 * draws between the two words, EDITING draws in, then the title block
 * settles — never a single centered fade-up.
 */
export function Hero() {
  const voxloRef = useRef<HTMLHeadingElement>(null);
  const editingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const ranOnce = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode's dev-only double-invoke: splitText on
    // mixed markup doesn't round-trip cleanly through split -> revert -> split.
    if (ranOnce.current || !voxloRef.current || !editingRef.current) return;
    ranOnce.current = true;
    constructHeadline(voxloRef.current, { staggerMs: 26, delay: 150 });
    if (lineRef.current) drawLines(lineRef.current, { duration: 650, delay: 620 });
    constructHeadline(editingRef.current, { staggerMs: 26, delay: 950 });
  }, []);

  return (
    <div className="relative min-h-[92svh] w-full overflow-hidden">
      {/* Ambient light — kept subtle so it reads as scene lighting, not a centered glow behind a headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 55% at 30% 25%, rgb(var(--accent) / 0.10), transparent 70%)",
        }}
      />

      {/* Viewport corner brackets — this station frames the whole sheet, not a content box */}
      <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-6">
        {(["tl", "tr", "bl", "br"] as const).map((corner) => (
          <svg
            key={corner}
            className={`absolute h-10 w-10 text-grid ${
              {
                tl: "left-0 top-0",
                tr: "right-0 top-0 -scale-x-100",
                bl: "left-0 bottom-0 -scale-y-100",
                br: "right-0 bottom-0 -scale-100",
              }[corner]
            }`}
            viewBox="0 0 28 28"
            fill="none"
          >
            <path d="M2 12 V2 H12" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        ))}
      </div>

      {/* Construction line joining VOXLO to EDITING — a real drawn connector, not decoration floating free */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M 20,34 L 20,52 L 62,52 L 62,60"
          fill="none"
          className="stroke-grid"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* VOXLO — upper-left */}
      <div className="absolute left-[6%] top-[14%] sm:left-[8%]">
        <Annotation variant="index" className="mb-3 block">
          01 — Identity
        </Annotation>
        <h1
          ref={voxloRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.88] tracking-[-0.02em] text-foreground"
        >
          Voxlo
        </h1>
      </div>

      {/* EDITING — lower-right, offset diagonally from VOXLO */}
      <div className="absolute right-[6%] top-[46%] text-right sm:right-[9%]">
        <h1
          ref={editingRef}
          className="text-ember font-display text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.88] tracking-[-0.02em]"
        >
          Editing.
        </h1>
        <Annotation variant="coordinate" className="mt-3 block">
          Scale 1:1
        </Annotation>
      </div>

      {/* Title block — tagline, audience line, and the two real CTAs, framed like a drawing's spec box */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[6%] left-[6%] w-[min(90vw,420px)] border border-border bg-background/50 p-5 backdrop-blur-sm sm:left-[8%]"
      >
        <Annotation className="mb-2 block">Voxlo-001 · Freelance Creative Editing</Annotation>
        <p className="text-lg font-medium text-foreground">{TAGLINE}</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Built for creators from 1K to 10K subs
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/work">
              View Work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
