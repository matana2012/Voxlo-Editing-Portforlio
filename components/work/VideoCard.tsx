"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import type { PortfolioVideo } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/utils";

interface VideoCardProps {
  video: PortfolioVideo;
  onClick: (video: PortfolioVideo) => void;
  featured?: boolean;
}

export function VideoCard({ video, onClick, featured = false }: VideoCardProps) {
  const thumbnail = video.thumbnail ?? (video.youtubeId ? getYouTubeThumbnail(video.youtubeId) : null);

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer rounded-xl overflow-hidden border border-border hover:border-white/20 transition-colors duration-300"
      onClick={() => onClick(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(video); }}
      aria-label={`View ${video.title}`}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden bg-white/5 ${featured ? "aspect-video" : "aspect-video"}`}>
        {thumbnail && !video.placeholder ? (
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                <Play className="h-5 w-5 text-white/20 ml-0.5" />
              </div>
              <p className="text-white/20 text-xs">Coming soon</p>
            </div>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Play className="h-6 w-6 text-white ml-1" />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-sm text-white/70 px-2.5 py-1 rounded-full border border-white/10">
            {video.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-accent transition-colors duration-200">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}
