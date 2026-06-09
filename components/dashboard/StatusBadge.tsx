"use client";

import { useState } from "react";
import type { LeadStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "archived", label: "Archived" },
];

interface StatusBadgeProps {
  leadId: string;
  status: LeadStatus;
  onUpdate?: (status: LeadStatus) => void;
}

export function StatusBadge({ leadId, status, onUpdate }: StatusBadgeProps) {
  const [current, setCurrent] = useState(status);
  const [open, setOpen] = useState(false);
  const supabase = createClient();

  async function updateStatus(next: LeadStatus) {
    setOpen(false);
    setCurrent(next);
    onUpdate?.(next);
    await supabase
      .from("leads")
      .update({ status: next, updated_at: new Date().toISOString() })
      .eq("id", leadId);
  }

  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen((v) => !v)}>
        <Badge variant={current}>{current.charAt(0).toUpperCase() + current.slice(1)}</Badge>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#1a1a1a] border border-border rounded-xl shadow-xl z-10 py-1 min-w-[140px]">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateStatus(opt.value)}
              className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
