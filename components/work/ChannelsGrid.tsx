"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

interface Channel {
  name: string;
  description: string;
  url: string;
  pfp: string;
}

const channels: Channel[] = [
  {
    name: "cilua_",
    // TODO: replace with the real channel description (awaiting from client).
    description: "— description coming soon —",
    url: "https://www.youtube.com/channel/UCULfftvB2jLST9E2zO2T7WQ",
    pfp: "/cilua_pfp.png",
  },
  {
    name: "Klentbolt",
    description: "Gaming channel prioritizing vlogs and gaming with friends.",
    url: "https://www.youtube.com/@klentbolt",
    pfp: "/klentbolt_pfp.png",
  },
  {
    name: "Alex Fishy",
    description: "Gaming channel focused mainly on gameplay and fun gaming footage.",
    url: "https://www.youtube.com/@Alex_Fishy",
    pfp: "/alex_fishy_pfp.png",
  },
];

export function ChannelsGrid() {
  return (
    <section aria-labelledby="channels-heading" className="mb-24">
      <h2
        id="channels-heading"
        className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8"
      >
        Channels
      </h2>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {channels.map((channel) => (
          <StaggerItem key={channel.name}>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${channel.name} on YouTube (opens in a new tab)`}
              className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-white/[0.02] p-8 text-center transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* Circular avatar — object-cover crops any aspect ratio to a circle */}
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border border-border bg-white/5">
                <Image
                  src={channel.pfp}
                  alt={`${channel.name} channel avatar`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <h3 className="text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-accent">
                  {channel.name}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>

              <p className="max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
                {channel.description}
              </p>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
