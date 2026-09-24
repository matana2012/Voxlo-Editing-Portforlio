"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConstructInView, useConstructOnActive } from "../construct";
import { Mono, StationTag } from "../primitives";
import type { Variant } from "./HeroStation";

const EMAIL = "griersonanakin@gmail.com";
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/_voxlo_/" },
  { label: "TikTok", href: "https://www.tiktok.com/@_voxlo_" },
  { label: "X", href: "https://x.com/clypz__" },
];

/** 05 — Get in touch. The end of the route, finished with the drawing's title block. */
export function ContactStation({ variant, active = false }: { variant: Variant; active?: boolean }) {
  const canvasRef = useConstructOnActive(active);
  const stackRef = useConstructInView();
  const canvas = variant === "canvas";

  return (
    <div
      ref={canvas ? canvasRef : stackRef}
      className={cn("is-pending", canvas ? "absolute inset-0 flex flex-col justify-center px-[7vw] pb-[24vh] pt-[10vh]" : "px-6 pb-24 pt-20")}
    >
      <StationTag id="contact" />
      <h2
        data-reveal
        className={cn(
          "mt-8 font-display font-normal  tracking-[-0.025em] text-cream",
          canvas ? "text-[min(7vw,13vh)]" : "text-[clamp(2.8rem,13vw,4.5rem)]",
            "leading-[0.94]"
          )}
      >
        Have a video
        <br />
        <em className="font-light italic text-gold">in mind?</em>
      </h2>

      <div className={cn("flex gap-10", canvas ? "mt-[5vh] items-end justify-between" : "mt-10 flex-col")}>
        <div data-reveal>
          <p className="text-lg text-cream/80">Send it over. I&apos;ll tell you what I&apos;d change.</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-3 bg-gold px-6 text-sm font-medium text-navy transition-colors hover:bg-cream"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="border-b border-cream/30 pb-1 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Title block */}
        <dl data-reveal className={cn("grid grid-cols-2 border border-line/35 text-left", canvas ? "w-[min(30vw,420px)]" : "w-full")}>
          <Cell k="Project" v="Voxlo Editing" />
          <Cell k="Drawn by" v="Anakin Matthew" />
          <Cell k="Sheet" v="05 of 05" />
          <div className="border-l border-t border-line/35 px-4 py-3">
            <dt>
              <Mono>Follow</Mono>
            </dt>
            <dd className="mt-2 flex gap-3 text-[13px]">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-cream transition-colors hover:text-gold">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-line/35 px-4 py-3 [&:nth-child(2)]:border-l [&:nth-child(3)]:border-t">
      <dt>
        <Mono>{k}</Mono>
      </dt>
      <dd className="mt-2 text-[13px] text-cream">{v}</dd>
    </div>
  );
}
