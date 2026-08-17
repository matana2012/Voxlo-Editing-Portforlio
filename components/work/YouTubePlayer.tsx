"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getYouTubeThumbnail } from "@/lib/utils";

interface YouTubePlayerProps {
  id: string;
  title: string;
  /** Optional poster override (defaults to the YouTube maxres thumbnail). */
  poster?: string | null;
  /**
   * When set, the player never embeds an inline iframe — clicking the
   * thumbnail opens this URL in a new tab instead. Use for YouTube Shorts,
   * whose cover frames don't render reliably inside an embedded player.
   */
  linkUrl?: string;
}

/**
 * Click-to-play YouTube facade: shows the thumbnail with a play button, then
 * swaps in the real (autoplaying) iframe on click. Keeps pages light — no
 * iframe loads until the visitor actually wants to watch.
 */
export function YouTubePlayer({ id, title, poster, linkUrl }: YouTubePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const thumb = poster ?? getYouTubeThumbnail(id);

  const thumbnail = (
    <>
      <Image
        src={thumb}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 1024px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/45" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <Play className="ml-1 h-7 w-7 text-white" fill="currentColor" />
      </span>
    </>
  );

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
      {linkUrl ? (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute inset-0 h-full w-full"
          aria-label={`Watch video: ${title} (opens in a new tab)`}
        >
          {thumbnail}
        </a>
      ) : playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {thumbnail}
        </button>
      )}
    </div>
  );
}
