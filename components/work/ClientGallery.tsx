import { ArrowUpRight } from "lucide-react";
import { YouTubePlayer } from "./YouTubePlayer";

interface ClientVideo {
  id: string;
  name: string;
  url: string;
}

// Client videos I've edited — add new entries here and they flow into the gallery.
const clients: ClientVideo[] = [
  { id: "zqv5NnJoDno", name: "klentbolt", url: "https://www.youtube.com/@klentbolt" },
  {
    id: "wqIXwFEtYEk",
    name: "cilua_",
    url: "https://www.youtube.com/channel/UCULfftvB2jLST9E2zO2T7WQ",
  },
  { id: "SjgItP2Z3ik", name: "RustyOldMan", url: "https://www.youtube.com/@RustyOldMan" },
];

export function ClientGallery() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
      {clients.map((client) => (
        <div key={client.id}>
          <YouTubePlayer id={client.id} title={`Video edited for ${client.name}`} />
          <div className="mt-4 flex items-center justify-between gap-3">
            <a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-display text-lg font-semibold text-foreground transition-colors hover:text-accent"
            >
              {client.name}
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/50" />
            </a>
            <span className="rounded-full border border-border bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Client
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
