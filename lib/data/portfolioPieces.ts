// Edit piece info here. Each piece is rendered on the Work page.
// Set placeholder: true to show an empty "Coming soon" slot with no click behavior.

export type PieceCategory =
  | "3d"
  | "gaming"
  | "irl"
  | "short-form"
  | "long-form"
  | "branded"
  | "before-after";

export interface PortfolioPiece {
  id: string;
  title: string;
  client: string;
  clientUrl?: string;
  runtime?: string;
  tags: PieceCategory[];
  whatWasDone: string[];
  tools: string[];
  result?: string;
  thumbnailUrl: string | null;
  youtubeId: string | null;
  featured: boolean;
  placeholder?: boolean;
}

// ── Featured grid (shown first, no filter) ───────────────────────────────────

export const featuredPieces: PortfolioPiece[] = [
  {
    id: "forza-gold-wristband",
    title: "I Don't Play Racing Games. So I Got the GOLD Wristband in Forza Horizon 6",
    client: "@klentbolt",
    clientUrl: "https://www.youtube.com/@klentbolt",
    runtime: "28:43",
    tags: ["gaming", "long-form"],
    whatWasDone: [
      "Color graded 4K HDR footage with custom LUT",
      "Designed 3D animated intro in Fusion",
      "Cleaned and mixed dialogue audio in Fairlight to −14 LUFS",
      "Built motion graphics for chapter transitions",
      "Edited 8 hours of raw footage into 28-minute narrative",
    ],
    tools: ["DaVinci Resolve", "Blender", "CapCut", "Photopea", "Claude"],
    thumbnailUrl: "https://img.youtube.com/vi/bAd-krnnVqQ/maxresdefault.jpg",
    youtubeId: "bAd-krnnVqQ",
    featured: true,
  },
  {
    id: "siege-graphic",
    title: "Siege Graphic",
    client: "Personal Project",
    tags: ["3d", "gaming"],
    whatWasDone: [],
    tools: [],
    thumbnailUrl: "https://img.youtube.com/vi/wls_o-J-Qpc/maxresdefault.jpg",
    youtubeId: "wls_o-J-Qpc",
    featured: true,
  },
  {
    id: "before-after-reel",
    title: "Before / After Reel",
    client: "Personal Project",
    tags: ["before-after"],
    whatWasDone: [
      "Color grading & LUT design",
      "Pacing & rhythm editing",
      "Motion graphics overlay",
      "Sound design & mixing",
    ],
    tools: ["DaVinci Resolve"],
    thumbnailUrl: "https://img.youtube.com/vi/vWj_U8HI53c/maxresdefault.jpg",
    youtubeId: "vWj_U8HI53c",
    featured: true,
  },
  {
    id: "shortform-reels",
    title: "Short-Form / Reels Edit",
    client: "Personal Project",
    tags: ["short-form"],
    whatWasDone: [],
    tools: [],
    thumbnailUrl: null,
    youtubeId: null,
    featured: true,
    placeholder: true,
  },
  {
    id: "cinematic-branded",
    title: "Cinematic Branded Edit",
    client: "Personal Project",
    tags: ["branded"],
    whatWasDone: [
      "Brand identity integration",
      "Cinematic color palette",
      "Licensed music sync",
      "Motion logo animation",
    ],
    tools: ["DaVinci Resolve"],
    thumbnailUrl: "https://img.youtube.com/vi/FukLaMhIYCw/maxresdefault.jpg",
    youtubeId: "FukLaMhIYCw",
    featured: true,
  },
  {
    id: "podcast-talking-head",
    title: "Podcast / Talking Head Edit",
    client: "Personal Project",
    tags: ["long-form"],
    whatWasDone: [
      "Multi-cam sync & cut",
      "Filler word removal",
      "Dynamic captions",
      "Audio enhancement",
    ],
    tools: ["DaVinci Resolve"],
    thumbnailUrl: "https://img.youtube.com/vi/jg2ni-c-bmc/maxresdefault.jpg",
    youtubeId: "jg2ni-c-bmc",
    featured: true,
  },
  {
    id: "3d-motion",
    title: "3D Motion Integration",
    client: "Personal Project",
    tags: ["3d"],
    whatWasDone: [
      "3D asset compositing in Blender",
      "Motion tracking & integration",
      "Depth-of-field matching",
      "VFX cleanup",
    ],
    tools: ["DaVinci Resolve", "Blender"],
    thumbnailUrl: "https://img.youtube.com/vi/CMsSkVDEuB0/maxresdefault.jpg",
    youtubeId: "CMsSkVDEuB0",
    featured: true,
  },
];

// ── More Work grid (filterable) ───────────────────────────────────────────────

export const morePieces: PortfolioPiece[] = [
  {
    id: "gd-triplec1-project",
    title: "Coming Soon",
    client: "@Gd_TripleC1",
    clientUrl: "https://www.youtube.com/@Gd_TripleC1",
    tags: ["gaming"],
    whatWasDone: [],
    tools: [],
    thumbnailUrl: null,
    youtubeId: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "klentbolt-project",
    title: "Coming Soon",
    client: "@klentbolt",
    clientUrl: "https://www.youtube.com/@klentbolt",
    tags: ["gaming"],
    whatWasDone: [],
    tools: [],
    thumbnailUrl: null,
    youtubeId: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "more-3d-1",
    title: "3D Product Visualization",
    client: "Personal Project",
    tags: ["3d"],
    whatWasDone: [],
    tools: [],
    thumbnailUrl: null,
    youtubeId: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "more-irl-1",
    title: "IRL / Lifestyle Vlog",
    client: "Personal Project",
    tags: ["irl"],
    whatWasDone: [],
    tools: [],
    thumbnailUrl: null,
    youtubeId: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "more-shortform-1",
    title: "Short-Form Pack",
    client: "Personal Project",
    tags: ["short-form"],
    whatWasDone: [],
    tools: [],
    thumbnailUrl: null,
    youtubeId: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "more-branded-1",
    title: "Brand Campaign",
    client: "Personal Project",
    tags: ["branded"],
    whatWasDone: [],
    tools: [],
    thumbnailUrl: null,
    youtubeId: null,
    featured: false,
    placeholder: true,
  },
];
