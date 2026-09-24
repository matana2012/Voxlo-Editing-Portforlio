export interface PricingTier {
  name: string;
  price: string;
  priceNote: string;
  description: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Short-form / Reels",
    price: "$30",
    priceNote: "starting at",
    description:
      "TikTok, Reels, Shorts — hook-first structure, beat sync, format optimization (9:16).",
  },
  {
    name: "Mid-length video",
    price: "$75",
    priceNote: "starting at",
    description:
      "Up to ~15 min. Full narrative edit, B-roll integration, dynamic captions.",
  },
  {
    name: "Long-form",
    price: "$200",
    priceNote: "starting at",
    description:
      "30+ min. Pacing, retention structure, chapter markers, full audio mix.",
  },
  {
    name: "Cinematic / branded",
    price: "$300",
    priceNote: "starting at",
    description:
      "Brand-forward content, licensed music sync, motion logo, color identity.",
  },
  {
    name: "Custom 3D / Motion",
    price: "Custom",
    priceNote: "quoted per project",
    description:
      "Blender integration, motion graphics, 3D compositing into live footage.",
  },
];

export const pricingDisclaimers: string[] = [
  "Rush delivery (under 3 business days) is available for an additional fee.",
  "50% deposit required before work begins.",
  "Additional revision rounds beyond 2 are billed at an hourly rate.",
];
