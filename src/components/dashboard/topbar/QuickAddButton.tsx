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
        "flex items-center justify-center p-1.5 rounded-md text-muted-foreground",
        "hover:text-foreground hover:bg-secondary/50 transition-colors duration-150",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
    >
      <Plus className="h-4 w-4" />
      <span className="sr-only">Quick add</span>
    </button>
  );
}
