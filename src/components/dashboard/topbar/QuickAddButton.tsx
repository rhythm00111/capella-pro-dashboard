import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { glassButton } from "@/styles/glass";

interface QuickAddButtonProps {
  className?: string;
}

export function QuickAddButton({ className }: QuickAddButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        glassButton,
        "flex items-center justify-center p-2.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Plus className="h-5 w-5 text-foreground" />
      <span className="sr-only">Quick add</span>
    </button>
  );
}
