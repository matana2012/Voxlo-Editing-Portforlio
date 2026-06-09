export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost" | "archived";

export interface Lead {
  id: string;
  name: string;
  email: string;
  project_type: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface PortfolioVideo {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  youtubeId: string | null;
  thumbnail: string | null;
  whatWasDone: string[];
  featured: boolean;
  placeholder?: boolean;
}

export type VideoCategory = "3d" | "gaming" | "irl" | "short-form" | "long-form" | "branded" | "before-after";
