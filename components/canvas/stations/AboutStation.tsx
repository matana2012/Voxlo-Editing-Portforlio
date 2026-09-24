"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConstructInView, useConstructOnActive } from "../construct";
import { Mono, StationTag } from "../primitives";
import type { Variant } from "./HeroStation";

// From the About page — the founder's own working principles.
const PRINCIPLES = [
  { label: "Craft over speed", text: "Every project gets the time it needs to be genuinely good. Not done-fast. Done-right." },
  { label: "Edit with intent", text: "Every cut, every transition, every hold has a reason." },
  { label: "Think like the audience", text: "I edit for whoever's watching. If it doesn't hold their attention, it changes." },
  { label: "Adapt to the creator", text: "Minimal and clean or high-energy and loud — whatever the content actually needs." },
];

/** 04 — Who I am. The quietest sheet on the board: a person, not a pitch. */
export function AboutStation({ variant, active = false }: { variant: Variant; active?: boolean }) {
  const canvasRef = useConstructOnActive(active);
  const stackRef = useConstructInView();
  const canvas = variant === "canvas";

  return (
    <div
      ref={canvas ? canvasRef : stackRef}
      className={cn(
        "is-pending",
        canvas ? "absolute inset-0 grid grid-cols-[1.1fr_1fr] items-center gap-[7vw] px-[7vw] py-[14vh]" : "px-6 py-20"
      )}
    >
      <div>
        <StationTag id="about" />
        <h2
          data-reveal
          className={cn(
            "mt-8 font-display font-normal  tracking-[-0.025em] text-cream",
            canvas ? "text-[min(6.6vw,12.5vh)]" : "text-[clamp(3rem,14vw,4.5rem)]",
            "leading-[0.92]"
          )}
        >
          Anakin
          <br />
          <em className="font-light italic text-gold">Matthew.</em>
        </h2>
        <p data-reveal className="mt-8 max-w-[42ch] text-[16px] leading-relaxed text-cream/80">
          I edit under the name Voxlo. It&apos;s just me — no team, no account manager, no template pipeline. Every
          project on this board went through my hands, start to finish.
        </p>
        <Link
          data-reveal
          href="/about"
          className="group mt-8 inline-flex items-center gap-2 border-b border-cream/30 pb-1 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
        >
          More about how I work
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className={cn(canvas ? "" : "mt-14")}>
        <Mono data-reveal className="mb-5 block">
          How I work
        </Mono>
        <ol>
          {PRINCIPLES.map((p, i) => (
            <li key={p.label} data-reveal className="grid grid-cols-[36px_1fr] border-t border-line/25 py-4 last:border-b">
              <Mono className="pt-1 text-gold">{String(i + 1).padStart(2, "0")}</Mono>
              <div>
                <p className="text-[15px] font-medium text-cream">{p.label}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
