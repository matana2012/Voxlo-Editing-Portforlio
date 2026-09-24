import { cn } from "@/lib/utils";

interface AnnotationProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** "index" prefixes a section marker (§), "coordinate" reads like a drafting coordinate. Omit for a bare technical label. */
  variant?: "index" | "coordinate" | "label";
  children: React.ReactNode;
}

/**
 * A measurement mark / coordinate label / technical annotation — the blueprint's
 * monospace register. Content must be real (a section index, a spec field from
 * portfolioPieces.ts, a runtime/scale note), never decorative filler.
 */
export function Annotation({ variant = "label", children, className, ...props }: AnnotationProps) {
  const prefix = variant === "index" ? "§" : null;

  return (
    <span
      className={cn(
        "font-mono select-none text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
      aria-hidden={variant !== "label" ? undefined : props["aria-hidden"]}
      {...props}
    >
      {prefix}
      {children}
    </span>
  );
}
