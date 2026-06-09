import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        new: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
        contacted: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
        quoted: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
        won: "bg-green-500/15 text-green-400 border border-green-500/30",
        lost: "bg-red-500/15 text-red-400 border border-red-500/30",
        archived: "bg-white/10 text-muted-foreground border border-white/10",
      },
    },
    defaultVariants: {
      variant: "new",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
