"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Inbox } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { LeadDetail } from "./LeadDetail";
import { LeadRowSkeleton } from "@/components/ui/SkeletonCard";
import { createClient } from "@/lib/supabase/client";

const STATUS_FILTERS: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "archived", label: "Archived" },
];

export function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const supabase = createClient();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  function handleStatusUpdate(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    if (selectedLead?.id === id) setSelectedLead((l) => l ? { ...l, status } : l);
  }

  const counts: Record<string, number> = { all: leads.length };
  leads.forEach((l) => {
    counts[l.status] = (counts[l.status] ?? 0) + 1;
  });

  const filtered = leads.filter((l) => {
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.project_type ?? "").toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border space-y-4">
        <h1 className="text-xl font-bold text-foreground">Leads Inbox</h1>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Search by name, email, or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                statusFilter === f.value
                  ? "bg-accent text-white"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              }`}
            >
              {f.label}
              {counts[f.value] > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${statusFilter === f.value ? "bg-white/20" : "bg-white/10"}`}>
                  {counts[f.value]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Leads */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <LeadRowSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-white/3 flex items-center justify-center border border-border">
              <Inbox className="h-7 w-7 text-muted-foreground/30" />
            </div>
            <p className="text-muted-foreground font-medium">No leads yet</p>
            <p className="text-sm text-muted-foreground/50">
              {search || statusFilter !== "all" ? "Try adjusting your filters." : "New submissions will appear here."}
            </p>
          </div>
        ) : (
          filtered.map((lead) => (
            <button
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`w-full text-left px-6 py-4 border-b border-border hover:bg-white/3 transition-colors flex items-center gap-4 ${selectedLead?.id === lead.id ? "bg-white/5" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-sm text-foreground truncate">{lead.name}</span>
                  <StatusBadge leadId={lead.id} status={lead.status} onUpdate={(s) => handleStatusUpdate(lead.id, s)} />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="truncate">{lead.email}</span>
                  {lead.project_type && (
                    <>
                      <span className="text-border">·</span>
                      <span className="truncate">{lead.project_type}</span>
                    </>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground/40 flex-shrink-0">
                {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </button>
          ))
        )}
      </div>

      <LeadDetail
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
