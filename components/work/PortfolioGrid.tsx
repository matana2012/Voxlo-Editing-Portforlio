"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VideoCard } from "./VideoCard";
import { VideoLightbox } from "./VideoLightbox";
import type { PortfolioVideo, VideoCategory } from "@/lib/types";

const FILTER_LABELS: { label: string; value: VideoCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "3D", value: "3d" },
  { label: "Gaming", value: "gaming" },
  { label: "IRL", value: "irl" },
  { label: "Short-Form", value: "short-form" },
  { label: "Long-Form", value: "long-form" },
  { label: "Branded", value: "branded" },
];

interface PortfolioGridProps {
  videos: PortfolioVideo[];
  title?: string;
  showFilter?: boolean;
}

export function PortfolioGrid({ videos, title, showFilter = false }: PortfolioGridProps) {
  const [active, setActive] = useState<VideoCategory | "all">("all");
  const [lightbox, setLightbox] = useState<PortfolioVideo | null>(null);

  const filtered = active === "all" ? videos : videos.filter((v) => v.category === active);

  return (
    <>
      <div>
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8">
            {title}
          </h2>
        )}

        {showFilter && (
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTER_LABELS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === f.value
                    ? "bg-accent text-[#0B0A09]"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <VideoCard video={video} onClick={setLightbox} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <VideoLightbox video={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
