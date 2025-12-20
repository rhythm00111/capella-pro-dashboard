import { User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserActionsProps {
  className?: string;
}

export function UserActions({ className }: UserActionsProps) {
  const buttonClass = cn(
    "flex items-center justify-center p-1.5 rounded-md text-muted-foreground",
    "hover:text-foreground hover:bg-secondary/50 transition-colors duration-150",
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
  );

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button type="button" className={buttonClass}>
        <User className="h-4 w-4" />
        <span className="sr-only">Profile</span>
      </button>
      
      <button type="button" className={buttonClass}>
        <Settings className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </button>
    </div>
  );
}
