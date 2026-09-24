"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export interface DialogVideo {
  id: string;
  title: string;
  /** Small technical label for the header, e.g. "V1 · 01 — Ren". */
  label: string;
}

/**
 * The viewing room. Opens over the board without touching it: scroll is
 * locked (not reset) while open, so closing returns the camera to exactly
 * where it was, and focus goes back to the clip that opened it.
 */
export function VideoDialog({ video, onClose }: { video: DialogVideo | null; onClose: () => void }) {
  return (
    <Dialog.Root open={video !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-navy-deep/95" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-[81] w-[min(92vw,calc(80svh*16/9),1280px)] -translate-x-1/2 -translate-y-1/2 focus:outline-none"
        >
          {video && (
            <>
              <div className="mb-3 flex items-center justify-between gap-6">
                <Dialog.Title className="flex min-w-0 items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em]">
                  <span className="shrink-0 text-gold">{video.label}</span>
                  <span aria-hidden className="h-px w-6 shrink-0 bg-line/50" />
                  <span className="truncate normal-case tracking-normal text-cream/80">{video.title}</span>
                </Dialog.Title>
                <Dialog.Close className="flex shrink-0 items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream/70 transition-colors hover:text-gold">
                  Close <X className="h-3.5 w-3.5" />
                </Dialog.Close>
              </div>
              <div className="relative">
                {/* Registration marks, same language as the lit clip on the board */}
                <span aria-hidden className="absolute -left-2 -top-2 h-3 w-3 border-l border-t border-gold" />
                <span aria-hidden className="absolute -right-2 -top-2 h-3 w-3 border-r border-t border-gold" />
                <span aria-hidden className="absolute -bottom-2 -left-2 h-3 w-3 border-b border-l border-gold" />
                <span aria-hidden className="absolute -bottom-2 -right-2 h-3 w-3 border-b border-r border-gold" />
                <div className="aspect-video w-full bg-black">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={video.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                </div>
              </div>
              <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Esc to close</p>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
