"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { HeroStation } from "./stations/HeroStation";
import { WorkStation } from "./stations/WorkStation";
import { ProofStation } from "./stations/ProofStation";
import { AboutStation } from "./stations/AboutStation";
import { ContactStation } from "./stations/ContactStation";

/**
 * Mobile / reduced-motion composition. Same five stations in the same order,
 * same visual language — but the route becomes a single vertical rail down
 * the left edge instead of a board the camera pans across. No off-screen
 * canvas, no horizontal travel.
 */
export function StackedHome() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const sections = [
    { id: "top", node: <HeroStation variant="stack" />, label: "Voxlo", Tag: "header" as const },
    { id: "work", node: <WorkStation variant="stack" />, label: "Work", Tag: "section" as const },
    { id: "proof", node: <ProofStation variant="stack" />, label: "Testimonials", Tag: "section" as const },
    { id: "about", node: <AboutStation variant="stack" />, label: "Who I am", Tag: "section" as const },
    { id: "contact", node: <ContactStation variant="stack" />, label: "Get in touch", Tag: "section" as const },
  ];

  return (
    <div ref={ref} className="world-grid relative mx-auto max-w-3xl overflow-hidden border-x border-line/15 sm:pl-6">
      <div aria-hidden className="absolute bottom-0 left-3 top-24 w-px bg-line/25 sm:left-6" />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-3 top-24 w-px origin-top bg-gold sm:left-6"
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
      />
      {sections.map(({ id, node, label, Tag }, i) => (
        <Tag key={id} id={id} aria-label={label} className="relative scroll-mt-16">
          {i > 0 && (
            <span aria-hidden className="absolute left-3 top-[5.2rem] h-2 w-2 -translate-x-1/2 rotate-45 border border-gold bg-navy sm:left-0" />
          )}
          {node}
        </Tag>
      ))}
    </div>
  );
}
