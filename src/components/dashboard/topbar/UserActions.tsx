import { User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserActionsProps {
  className?: string;
}

export function UserActions({ className }: UserActionsProps) {
  const iconButtonClass = cn(
    "flex items-center justify-center w-9 h-9 rounded-md",
    "text-muted-foreground hover:text-foreground",
    "hover:bg-secondary transition-all duration-150",
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "active:scale-95"
  );

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button type="button" className={iconButtonClass}>
        <User className="h-5 w-5" strokeWidth={1.5} />
        <span className="sr-only">Profile</span>
      </button>
      <button type="button" className={iconButtonClass}>
        <Settings className="h-5 w-5" strokeWidth={1.5} />
        <span className="sr-only">Settings</span>
      </button>
    </div>
  );
}