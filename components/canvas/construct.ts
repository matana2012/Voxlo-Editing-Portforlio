"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger, svg, utils } from "animejs";
import { prefersReducedMotion } from "@/lib/motion/blueprint";

/**
 * Construction choreography (Anime.js). Inside a station:
 *   [data-draw]   SVG strokes that ink themselves in (brackets, rules, dimension lines)
 *   [data-reveal] elements that settle into place after the lines, in DOM order
 *
 * Until a station is constructed its container carries `.is-pending`, which
 * hides those elements (with a CSS fallback that reveals them anyway if JS
 * never runs). Plays once per station — a drawing is built, not un-built.
 */
export function construct(root: HTMLElement, opts: { delay?: number } = {}) {
  const draws = Array.from(root.querySelectorAll<SVGGeometryElement>("[data-draw]"));
  const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (prefersReducedMotion()) {
    root.classList.remove("is-pending");
    return;
  }

  utils.set(reveals, { opacity: 0, translateY: 14 });
  root.classList.remove("is-pending");

  const tl = createTimeline({ delay: opts.delay ?? 0, defaults: { ease: "outQuart" } });
  if (draws.length) {
    tl.add(svg.createDrawable(draws as never), { draw: ["0 0", "0 1"], duration: 900, ease: "inOutQuart", delay: stagger(70) }, 0);
  }
  if (reveals.length) {
    tl.add(reveals, { opacity: [0, 1], translateY: [14, 0], duration: 760, delay: stagger(65) }, draws.length ? 220 : 0);
  }
  // Content must never be left invisible: if the timeline is stalled (e.g. a
  // backgrounded tab pauses the engine), jump it to its finished state.
  window.setTimeout(() => {
    if (!tl.completed) tl.complete();
  }, 1600 + reveals.length * 65 + (opts.delay ?? 0));
  return tl;
}

/** Splits a headline's lines (children marked [data-line]) and lifts them up from behind a mask. */
export function assembleHeadline(root: HTMLElement, delay = 0) {
  const lines = root.querySelectorAll<HTMLElement>("[data-line] > span");
  if (prefersReducedMotion() || !lines.length) return;
  const anim = animate(lines, { translateY: ["130%", "0%"], duration: 1100, delay: stagger(110, { start: delay }), ease: "outExpo" });
  window.setTimeout(() => {
    if (!anim.completed) anim.complete();
  }, 1800 + delay);
}

/** Constructs `ref` the first time `active` becomes true. */
export function useConstructOnActive(active: boolean, opts: { delay?: number } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current || !ref.current) return;
    done.current = true;
    construct(ref.current, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return ref;
}

/** Stacked layout: constructs when the section scrolls into view. */
export function useConstructInView() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          construct(el);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
