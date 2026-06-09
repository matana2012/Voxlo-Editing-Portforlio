import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeThumbnail(videoId: string, quality: "hq" | "maxres" = "maxres") {
  return `https://img.youtube.com/vi/${videoId}/${quality === "maxres" ? "maxresdefault" : "hqdefault"}.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`;
}
