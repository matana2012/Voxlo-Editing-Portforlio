import type { Metadata } from "next";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import { SocialAvatar } from "@/components/social/SocialAvatar";

export const metadata: Metadata = {
  title: "Social | Voxlo Editing",
  description: "Follow Voxlo Editing on Instagram, TikTok, and X.",
};

// ── Platform logo SVGs ────────────────────────────────────────────────────────

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="url(#ig-grad)" />
    </svg>
  );
}

function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.971-1.166-1.956-1.288-2.644h.005C16.37 1.307 16.387 1 16.387 1h-3.634v14.283c0 .19-.004.377-.012.562a3.162 3.162 0 01-.035.32 2.807 2.807 0 01-.816 1.626 2.745 2.745 0 01-1.926.785 2.757 2.757 0 01-2.754-2.754 2.757 2.757 0 012.754-2.754c.27 0 .53.04.776.113V9.48a6.393 6.393 0 00-.776-.048 6.4 6.4 0 00-6.4 6.4 6.4 6.4 0 006.4 6.4 6.4 6.4 0 006.4-6.4V9.123a9.8 9.8 0 005.73 1.826V7.32a5.54 5.54 0 01-3.773-1.758z" />
    </svg>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const socials = [
  {
    platform: "Instagram",
    handle: "@_voxlo_",
    url: "https://www.instagram.com/_voxlo_/",
    bio: ["13 | Building a video editing biz from $0 📹", "$700/$5k", "Hire me for Editing ↓"],
    // Save your monkey-at-PC photo to public/avatar-social.jpg
    avatarSrc: "/avatar-social.jpg",
    Logo: InstagramLogo,
    logoBg: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600",
    logoColor: "text-white",
    accentColor: "border-pink-500/20",
    labelColor: "text-pink-400",
  },
  {
    platform: "TikTok",
    handle: "@_voxlo_",
    url: "https://www.tiktok.com/@_voxlo_",
    bio: ["13 | Building a video editing biz from $0 📹", "$700/$5k", "Documenting everything ↓"],
    avatarSrc: "/avatar-social.jpg",
    Logo: TikTokLogo,
    logoBg: "bg-black",
    logoColor: "text-white",
    accentColor: "border-white/10",
    labelColor: "text-white/60",
  },
  {
    platform: "X",
    handle: "@clypz__",
    url: "https://x.com/clypz__",
    bio: [
      "short form editor",
      "i turn your clips into content that actually gets views",
      'dm me "edit" for a free sample',
    ],
    // Save your monkey-at-cafe photo to public/avatar-twitter.jpg
    avatarSrc: "/avatar-twitter.jpg",
    Logo: XLogo,
    logoBg: "bg-black",
    logoColor: "text-white",
    accentColor: "border-white/10",
    labelColor: "text-white/60",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SocialPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4 font-medium">
            Social
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.95]">
            Find me.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Gaming edits, behind-the-scenes, and the occasional iced coffee.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {socials.map((s) => (
            <StaggerItem key={s.platform}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col h-full rounded-2xl border ${s.accentColor} bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden`}
              >
                {/* Platform header bar */}
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    {/* Logo badge */}
                    <div className={`w-8 h-8 rounded-lg ${s.logoBg} flex items-center justify-center flex-shrink-0`}>
                      <s.Logo className={`w-4 h-4 ${s.logoColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-none">
                        {s.platform}
                      </p>
                      <p className={`text-xs mt-0.5 ${s.labelColor}`}>{s.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>

                {/* Avatar + bio body */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <SocialAvatar
                      src={s.avatarSrc}
                      alt={`${s.platform} profile photo`}
                      initials="VE"
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-1 flex-1">
                    {s.bio.map((line, i) => (
                      <p
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Follow button */}
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:gap-2 transition-all duration-200">
                      Follow
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Subtext */}
        <AnimatedSection delay={0.3} className="mt-14 text-center">
          <p className="text-sm text-muted-foreground/40">
            DMs open on all platforms for project inquiries.
          </p>
        </AnimatedSection>

      </div>
    </div>
  );
}
