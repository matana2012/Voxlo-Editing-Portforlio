"use client";

import { useState } from "react";

interface SocialAvatarProps {
  src: string;
  alt: string;
  initials: string;
}

export function SocialAvatar({ src, alt, initials }: SocialAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-xs font-medium text-muted-foreground select-none">
        {initials}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
