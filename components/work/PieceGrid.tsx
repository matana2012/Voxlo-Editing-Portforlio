"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PieceCard } from "./PieceCard";
import { PieceDetail } from "./PieceDetail";
import type { PortfolioPiece, PieceCategory } from "@/lib/data/portfolioPieces";

const FILTERS: { label: string; value: PieceCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "3D", value: "3d" },
  { label: "Gaming", value: "gaming" },
  { label: "IRL", value: "irl" },
  { label: "Short-Form", value: "short-form" },
  { label: "Long-Form", value: "long-form" },
  { label: "Branded", value: "branded" },
];

interface PieceGridProps {
  pieces: PortfolioPiece[];
  title?: string;
  showFilter?: boolean;
}

export function PieceGrid({ pieces, title, showFilter = false }: PieceGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<PieceCategory | "all">("all");

  const filtered =
    filter === "all" ? pieces : pieces.filter((p) => p.tags.includes(filter));

  const selectedPiece = filtered.find((p) => p.id === selectedId) ?? null;

  function handleCardClick(piece: PortfolioPiece) {
    setSelectedId((prev) => (prev === piece.id ? null : piece.id));
  }

  function handleFilterChange(value: PieceCategory | "all") {
    setFilter(value);
    setSelectedId(null);
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8">
          {title}
        </h2>
      )}

      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f.value
                  ? "bg-accent text-[#0B0A09]"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Thumbnail grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((piece) => (
            <motion.div
              key={piece.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <PieceCard
                piece={piece}
                isSelected={selectedId === piece.id}
                onClick={handleCardClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Inline detail panel — slides in below the grid */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            key="detail-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <PieceDetail piece={selectedPiece} onClose={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
