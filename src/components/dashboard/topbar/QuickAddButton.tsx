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
        "flex items-center justify-center w-9 h-9 rounded-md",
        "bg-primary text-primary-foreground",
        "hover:bg-primary/90",
        "transition-all duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "active:scale-95",
        className
      )}
    >
      <Plus className="h-5 w-5" strokeWidth={2} />
      <span className="sr-only">Add new</span>
    </button>
  );
}