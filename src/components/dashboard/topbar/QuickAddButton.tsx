import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAddButtonProps {
  className?: string;
}

export function QuickAddButton({ className }: QuickAddButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-md",
        "text-muted-foreground hover:text-foreground/80",
        "hover:bg-secondary/50 transition-colors duration-150",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring/50",
        className
      )}
    >
      <Plus className="h-4 w-4" strokeWidth={1.5} />
      <span className="sr-only">Quick add</span>
    </button>
  );
}
