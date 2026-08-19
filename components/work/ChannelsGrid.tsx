"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

interface Channel {
  name: string;
  description: string;
  url: string | null;
  pfp: string;
}

const channels: Channel[] = [
  {
    name: "Vincent Global Services",
    description:
      "A professional corporate solutions provider delivering strategic consulting, business operations support, and global growth services.",
    url: null,
    pfp: "/vincent_global_pfp.png",
  },
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
  {
    name: "RustyOldMan",
    description: "Rust YouTuber who makes build tutorials.",
    url: "https://www.youtube.com/@RustyOldMan",
    pfp: "/rustyoldman_pfp.png",
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

      <StaggerContainer className="flex flex-wrap justify-center gap-x-10 gap-y-10 md:gap-x-8 md:gap-y-8">
        {channels.map((channel) => {
          const avatar = (
            <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full border-2 border-border bg-muted transition-all duration-300 group-hover:scale-[1.04] group-hover:border-accent group-hover:shadow-[0_0_55px_-8px_rgba(245,166,35,0.55)] group-focus-visible:border-accent group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-background sm:h-44 sm:w-44 md:h-52 md:w-52">
              <Image
                src={channel.pfp}
                alt={`${channel.name} channel avatar`}
                fill
                sizes="(max-width: 640px) 160px, 208px"
                className="object-cover"
              />
            </div>
          );

          const content = (
            <>
              {avatar}
              <div className="mt-6 flex items-center gap-1.5">
                <h3 className="font-display text-2xl font-semibold text-foreground transition-colors duration-200 group-hover:text-accent">
                  {channel.name}
                </h3>
                {channel.url && (
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                )}
              </div>

              <p className="mt-3 max-w-[28ch] text-[15px] leading-relaxed text-muted-foreground">
                {channel.description}
              </p>
            </>
          );

          return (
            <StaggerItem
              key={channel.name}
              className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.5rem)]"
            >
              {channel.url ? (
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${channel.name} on YouTube (opens in a new tab)`}
                  className="group flex flex-col items-center text-center focus-visible:outline-none"
                >
                  {content}
                </a>
              ) : (
                <div className="group flex flex-col items-center text-center">{content}</div>
              )}
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
