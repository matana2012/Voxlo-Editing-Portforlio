"use client";

import { animate, createTimeline, svg, stagger, splitText, utils, type JSAnimation, type Timeline } from "animejs";

/**
 * The Voxlo Blueprint's motion vocabulary. Anime.js owns real construction
 * choreography — line-draws, corner brackets, headline assembly, connector
 * lines between stations — either triggered once (useInView) or, inside the
 * blueprint canvas, scrubbed directly to scroll progress via `scrub: true`
 * (see useScrollScrubbedAnimation.ts for the bridge). Framer Motion keeps
 * owning "when does this enter" / the camera transform itself.
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (document.documentElement.classList.contains("force-motion")) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Draws one or more SVG strokes on, as if inked by a drafting pen.
 * `scrub: true` creates the animation paused at progress 0 (still painting
 * the correct undrawn starting frame) for external driving via `.progress =`
 * — see useScrollScrubbedAnimation. Without `scrub`, it autoplays once.
 */
export function drawLines(
  target: string | SVGElement | SVGElement[] | NodeListOf<SVGElement>,
  opts: { duration?: number; delay?: number; staggerMs?: number; ease?: string; scrub?: boolean } = {}
): JSAnimation | void {
  if (prefersReducedMotion()) {
    utils.set(target, { opacity: 1 });
    return;
  }
  const drawable = svg.createDrawable(target as never);
  return animate(drawable, {
    draw: ["0 0", "0 1"],
    ease: opts.scrub ? "linear" : opts.ease ?? "inOutQuad",
    duration: opts.duration ?? 1100,
    delay: opts.staggerMs ? stagger(opts.staggerMs, { start: opts.delay ?? 0 }) : opts.delay ?? 0,
    autoplay: !opts.scrub,
  });
}

/**
 * The signature "station under construction" entrance: corner brackets draw
 * on as real strokes (not a fade/scale imitation), then the content fades
 * and lifts. `scrub: true` pauses the timeline at progress 0 for external
 * driving (see useScrollScrubbedAnimation); otherwise it plays once, paired
 * with an existing useInView trigger.
 */
export function constructionReveal(
  scope: {
    brackets?: SVGElement[] | NodeListOf<SVGElement>;
    content: string | Element | Element[] | NodeListOf<Element>;
  },
  opts: { bracketDuration?: number; contentDuration?: number; contentDelay?: number; scrub?: boolean } = {}
): Timeline | void {
  if (prefersReducedMotion()) {
    if (scope.brackets) utils.set(scope.brackets, { opacity: 1 });
    utils.set(scope.content, { opacity: 1, translateY: 0 });
    return;
  }

  const tl = createTimeline({ defaults: { ease: opts.scrub ? "linear" : "outQuad" }, autoplay: !opts.scrub });

  if (scope.brackets && scope.brackets.length > 0) {
    const drawable = svg.createDrawable(scope.brackets as never);
    tl.add(drawable, {
      draw: ["0 0", "0 1"],
      duration: opts.bracketDuration ?? 420,
    });
  }

  tl.add(
    scope.content,
    {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: opts.contentDuration ?? 620,
    },
    opts.contentDelay ?? (scope.brackets ? "-=150" : 0)
  );

  return tl;
}

/** Etches the technical grid in behind a section — a subtle opacity ramp, never a loop. */
export function etchGrid(
  target: string | Element | Element[],
  opts: { duration?: number; delay?: number; toOpacity?: number } = {}
): JSAnimation | void {
  if (prefersReducedMotion()) {
    utils.set(target, { opacity: opts.toOpacity ?? 1 });
    return;
  }
  return animate(target, {
    opacity: [0, opts.toOpacity ?? 1],
    duration: opts.duration ?? 900,
    delay: opts.delay ?? 0,
    ease: "inOutSine",
  });
}

/** Staggered pop-in for a group of measurement marks / coordinate labels. */
export function popInAnnotations(
  target: string | Element[] | NodeListOf<Element>,
  opts: { staggerMs?: number; delay?: number } = {}
): JSAnimation | void {
  if (prefersReducedMotion()) {
    utils.set(target, { opacity: 1 });
    return;
  }
  return animate(target, {
    opacity: [0, 1],
    translateY: [4, 0],
    duration: 320,
    delay: stagger(opts.staggerMs ?? 60, { start: opts.delay ?? 0 }),
    ease: "outQuad",
  });
}

/**
 * Splits a headline into characters and staggers them in as if drafted
 * stroke-by-stroke. Runs once (paired with the Identity station's arrival),
 * not scrubbed — a headline that reverses mid-word as you scroll up reads as
 * broken, not deliberate. Returns the splitter so the caller can `.revert()`
 * it on unmount (restores the original, unsplit text node).
 */
export function constructHeadline(
  target: Element,
  opts: { staggerMs?: number; duration?: number; delay?: number } = {}
) {
  // accessible:true (the default) leaves a second, visible display:block copy
  // of the original text for screen readers, meant to be hidden with the
  // caller's own sr-only styling. We don't have that, so it duplicated
  // on-screen — accessible:false skips it; the split chars carry the text.
  const splitter = splitText(target, { chars: true, words: false, lines: false, accessible: false });
  if (prefersReducedMotion()) {
    utils.set(splitter.chars, { opacity: 1 });
    return splitter;
  }
  animate(splitter.chars, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: opts.duration ?? 480,
    delay: stagger(opts.staggerMs ?? 18, { start: opts.delay ?? 0 }),
    ease: "outQuad",
  });
  return splitter;
}
