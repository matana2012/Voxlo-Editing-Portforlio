"use client";

import { useState } from "react";

interface SoftwareLogoProps {
  src: string;
  name: string;
}

/**
 * Renders a software logo image, falling back to a styled initials tile if the
 * file isn't present yet (so the page looks finished before every logo lands).
 */
export function SoftwareLogo({ src, name }: SoftwareLogoProps) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (failed) {
    return <span className="font-display text-xl font-semibold text-accent">{initials}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      className="h-full w-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}
