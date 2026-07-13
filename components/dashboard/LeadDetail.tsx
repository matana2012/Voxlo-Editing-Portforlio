"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Clock, DollarSign, Film, MessageSquare } from "lucide-react";
import type { Lead } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

interface LeadDetailProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusUpdate?: (id: string, status: Lead["status"]) => void;
}

export function LeadDetail({ lead, onClose, onStatusUpdate }: LeadDetailProps) {
  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#111111] border-l border-border z-50 overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-[#111111] z-10">
              <h2 className="font-semibold text-foreground">{lead.name}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <StatusBadge
                  leadId={lead.id}
                  status={lead.status}
                  onUpdate={(s) => onStatusUpdate?.(lead.id, s)}
                />
                <span className="text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <Field icon={<Mail className="h-4 w-4" />} label="Email" value={lead.email} />
                {lead.project_type && <Field icon={<Film className="h-4 w-4" />} label="Project type" value={lead.project_type} />}
                {lead.budget && <Field icon={<DollarSign className="h-4 w-4" />} label="Budget" value={lead.budget} />}
                {lead.timeline && <Field icon={<Clock className="h-4 w-4" />} label="Timeline" value={lead.timeline} />}
                {lead.message && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                      <MessageSquare className="h-4 w-4" />
                      <span>Notes</span>
                    </div>
                    <p className="text-sm text-foreground bg-white/3 rounded-lg px-4 py-3 leading-relaxed border border-border">
                      {lead.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-5 border-t border-border">
              <a
                href={`mailto:${lead.email}?subject=Re: Your Voxlo Editing Inquiry&body=Hi ${lead.name},%0D%0A%0D%0AThanks for reaching out! I'd love to discuss your ${lead.project_type ?? "project"} further.%0D%0A%0D%0ABest,%0D%0AAnakin`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-accent text-[#0B0A09] text-sm font-medium hover:bg-accent-hover transition-colors active:scale-[0.98]"
              >
                <Mail className="h-4 w-4" />
                Reply via Email
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-muted-foreground/50">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground/50 mb-0.5">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}
