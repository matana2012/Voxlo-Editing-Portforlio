"use client";

import { useEffect, useState } from "react";
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

  // Close on Escape + lock body scroll while the modal is open.
  useEffect(() => {
    if (!selectedPiece) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedPiece]);

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

      {/* Detail modal — centered overlay, video autoplays on open */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            key="detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-6 md:p-10"
            onClick={() => setSelectedId(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPiece.title}
          >
            <motion.div
              key="detail-panel"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="my-auto w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <PieceDetail piece={selectedPiece} onClose={() => setSelectedId(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
