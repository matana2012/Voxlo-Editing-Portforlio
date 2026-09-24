"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useConstructInView, useConstructOnActive } from "../construct";
import { Mono, StationTag } from "../primitives";
import type { Variant } from "./HeroStation";

// Verbatim client messages. Grouped by who said them — nothing added.
const FEATURED = {
  quote: "I genuinely appreciate the amount of effort you did while making of this video",
  channel: "Vincent Global Services",
  pfp: "/vincent_global_pfp.png",
};

const NOTES = [
  {
    channel: "RustyOldMan",
    subs: "10K subscribers",
    pfp: "/rustyoldman_pfp.png",
    quotes: ["I'll use your cut and see how the video does", "Looks good.", "Perfect!"],
  },
  {
    channel: "cilua_",
    subs: "3.5K subscribers",
    pfp: "/cilua_pfp.png",
    quotes: ["I think its pretty damn good", "damn dude that didnt take that long lol"],
  },
];

/** 03 — Testimonials: one quote given the whole stage, the rest kept as margin notes. */
export function ProofStation({ variant, active = false }: { variant: Variant; active?: boolean }) {
  const canvasRef = useConstructOnActive(active);
  const stackRef = useConstructInView();
  const canvas = variant === "canvas";

  return (
    <div
      ref={canvas ? canvasRef : stackRef}
      className={cn(
        "is-pending",
        canvas ? "absolute inset-0 grid grid-cols-[1.25fr_1fr] items-center gap-[6vw] px-[7vw] py-[14vh]" : "px-6 py-20"
      )}
    >
      <figure>
        <StationTag id="proof" />
        <h2 data-reveal className="mt-8">
          <Mono>Words from the edit bay</Mono>
        </h2>
        <blockquote
          data-reveal
          className={cn(
            "relative mt-6 font-display font-light  tracking-[-0.015em] text-cream",
            canvas ? "text-[min(3.9vw,7.2vh)]" : "text-[clamp(1.9rem,8vw,2.6rem)]",
            "leading-[1.08]"
          )}
        >
          <span aria-hidden className="absolute -left-[0.55em] top-0 text-gold">
            &ldquo;
          </span>
          {FEATURED.quote}
          <span aria-hidden className="text-gold">&rdquo;</span>
        </blockquote>
        <figcaption data-reveal className="mt-8 flex items-center gap-4">
          <Avatar src={FEATURED.pfp} name={FEATURED.channel} />
          <span className="text-sm text-cream">{FEATURED.channel}</span>
          <span aria-hidden className="h-px w-10 bg-gold/60" />
          <Mono>Client</Mono>
        </figcaption>
      </figure>

      <div className={cn(canvas ? "" : "mt-16")}>
        {NOTES.map((n) => (
          <figure key={n.channel} data-reveal className="border-t border-line/25 py-6 last:border-b">
            <figcaption className="flex items-center gap-3">
              <Avatar src={n.pfp} name={n.channel} small />
              <span className="text-sm text-cream">{n.channel}</span>
              <Mono className="ml-auto">{n.subs}</Mono>
            </figcaption>
            <ul className="mt-4 space-y-2.5">
              {n.quotes.map((q) => (
                <li key={q}>
                  <blockquote className="font-display text-[clamp(1.15rem,1.45vw,1.45rem)] italic leading-snug text-cream/85">
                    &ldquo;{q}&rdquo;
                  </blockquote>
                </li>
              ))}
            </ul>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Avatar({ src, name, small }: { src: string; name: string; small?: boolean }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full outline outline-1 outline-line/40", small ? "h-7 w-7" : "h-10 w-10")}>
      <Image src={src} alt={`${name} avatar`} fill sizes="40px" loading="eager" className="object-cover" />
    </span>
  );
}
