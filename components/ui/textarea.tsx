import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full bg-transparent border-0 border-b-2 border-border pb-3 text-2xl md:text-3xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent transition-colors duration-200 resize-none min-h-[120px]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
