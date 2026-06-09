"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import type { PortfolioVideo } from "@/lib/types";
import { getYouTubeEmbedUrl } from "@/lib/utils";

interface VideoLightboxProps {
  video: PortfolioVideo | null;
  onClose: () => void;
}

export function VideoLightbox({ video, onClose }: VideoLightboxProps) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl bg-[#111111] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Video or placeholder */}
            <div className="aspect-video bg-black w-full">
              {video.youtubeId ? (
                <iframe
                  src={getYouTubeEmbedUrl(video.youtubeId)}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  title={video.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white/30">
                        <polygon points="5,3 19,12 5,21" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-white/30 text-sm">Video coming soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info panel */}
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">{video.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{video.description}</p>
                </div>
                {video.whatWasDone.length > 0 && (
                  <div className="md:w-56 flex-shrink-0">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-4 font-medium">What was done</p>
                    <ul className="space-y-2">
                      {video.whatWasDone.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
