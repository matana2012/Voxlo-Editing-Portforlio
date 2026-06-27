"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import type { PortfolioPiece } from "@/lib/data/portfolioPieces";

interface PieceCardProps {
  piece: PortfolioPiece;
  isSelected: boolean;
  onClick: (piece: PortfolioPiece) => void;
}

export function PieceCard({ piece, isSelected, onClick }: PieceCardProps) {
  const isClickable = !piece.placeholder;

  return (
    <motion.div
      whileHover={isClickable ? { scale: 1.02, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" } : {}}
      whileTap={isClickable ? { scale: 0.99 } : {}}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl overflow-hidden border transition-colors duration-300 ${
        isClickable ? "cursor-pointer" : "cursor-default"
      } ${
        isSelected
          ? "border-accent/60 shadow-[0_0_0_1px_hsl(var(--accent)/0.25)]"
          : "border-border hover:border-white/20"
      }`}
      onClick={() => isClickable && onClick(piece)}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => { if (isClickable && e.key === "Enter") onClick(piece); }}
      aria-label={isClickable ? `${isSelected ? "Close" : "View"} ${piece.title}` : undefined}
      aria-expanded={isClickable ? isSelected : undefined}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-white/5 aspect-video group">
        {piece.thumbnailUrl && !piece.placeholder ? (
          <Image
            src={piece.thumbnailUrl}
            alt={piece.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <Play className="h-5 w-5 text-white/20 ml-0.5" />
            </div>
            {piece.client !== "Personal Project" && (
              <p className="text-white/30 text-xs font-medium">{piece.client}</p>
            )}
            <p className="text-white/20 text-xs">Coming soon</p>
          </div>
        )}

        {/* Play overlay — only for real pieces */}
        {isClickable && piece.thumbnailUrl && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Play className="h-6 w-6 text-white ml-1" />
            </div>
          </div>
        )}

        {/* Category tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {piece.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-sm text-white/70 px-2.5 py-1 rounded-full border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3
          className={`font-semibold text-sm leading-snug line-clamp-2 transition-colors duration-200 ${
            isSelected
              ? "text-accent"
              : isClickable
              ? "text-foreground group-hover:text-accent"
              : "text-foreground/40"
          }`}
        >
          {piece.placeholder && piece.client !== "Personal Project"
            ? piece.client
            : piece.title}
        </h3>
        {!piece.placeholder && (
          <p className="text-xs text-muted-foreground mt-1">
            {piece.client}
            {piece.runtime && (
              <span className="text-muted-foreground/40"> · {piece.runtime}</span>
            )}
          </p>
        )}
      </div>
    </motion.div>
  );
}
