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
    description: "A marathon gaming channel that creates great and informational content.",
    url: "https://www.youtube.com/channel/UCULfftvB2jLST9E2zO2T7WQ",
    pfp: "/cilua_pfp.png",
  },
  {
    name: "Klentbolt",
    description: "Gaming channel prioritizing vlogs and gaming with friends.",
    url: "https://www.youtube.com/@klentbolt",
    pfp: "/klentbolt_pfp.jpg",
  },
  {
    name: "Alex Fishy",
    description: "Gaming channel focused mainly on gameplay and fun gaming footage.",
    url: "https://www.youtube.com/@Alex_Fishy",
    pfp: "/alex_fishy_pfp.jpg",
  },
  {
    name: "MarqNova",
    description: "Minecraft toy channel posting high-retention videos with strong storytelling.",
    url: "https://www.youtube.com/@marqnova",
    pfp: "/marq_nova_pfp.jpg",
  },
];

export function ChannelsGrid() {
  return (
    <section aria-labelledby="channels-heading">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
        The creators
      </p>
      <h2
        id="channels-heading"
        className="mb-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
      >
        Channels
      </h2>
      <p className="mb-12 max-w-lg text-muted-foreground md:mb-16">
        The creators I edit for. This is the main work.
      </p>

      <StaggerContainer className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {channels.map((channel) => (
          <StaggerItem key={channel.name}>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${channel.name} on YouTube (opens in a new tab)`}
              className="group flex flex-col items-center text-center focus-visible:outline-none"
            >
              {/* Large circular avatar — object-cover crops any aspect ratio to a circle */}
              <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full border-2 border-border bg-muted transition-all duration-300 group-hover:scale-[1.04] group-hover:border-accent group-hover:shadow-[0_0_55px_-8px_rgba(245,166,35,0.55)] group-focus-visible:border-accent group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-background sm:h-44 sm:w-44 md:h-52 md:w-52">
                <Image
                  src={channel.pfp}
                  alt={`${channel.name} channel avatar`}
                  fill
                  sizes="(max-width: 640px) 160px, 208px"
                  className="object-cover"
                />
              </div>

              <div className="mt-6 flex items-center gap-1.5">
                <h3 className="font-display text-2xl font-semibold text-foreground transition-colors duration-200 group-hover:text-accent">
                  {channel.name}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>

              <p className="mt-3 max-w-[28ch] text-[15px] leading-relaxed text-muted-foreground">
                {channel.description}
              </p>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
