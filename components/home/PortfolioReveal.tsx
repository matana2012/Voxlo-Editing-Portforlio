"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { featuredPieces } from "@/lib/data/portfolioPieces";
import { PortfolioPieceReveal } from "./PortfolioPieceReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

// Real, shippable pieces only — the before/after piece gets its own
// dedicated section further down the page, not a duplicate slot here.
const pieces = featuredPieces.filter((p) => !p.placeholder && !p.tags.includes("before-after"));

export function PortfolioReveal() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="work" className="relative px-6 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">Selected work</p>
        <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-5xl">
          Real cuts. <span className="text-ember">Real channels.</span>
        </h2>
      </motion.div>

      <div className="mx-auto max-w-5xl divide-y divide-border">
        {pieces.map((piece, index) => (
          <PortfolioPieceReveal
            key={piece.id}
            piece={piece}
            index={index}
            isExpanded={expandedId === piece.id}
            onToggle={() => setExpandedId((prev) => (prev === piece.id ? null : piece.id))}
          />
        ))}
      </div>
    </section>
  );
}
