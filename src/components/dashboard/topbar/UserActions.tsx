import { User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { glassButton } from "@/styles/glass";

interface UserActionsProps {
  className?: string;
}

export function UserActions({ className }: UserActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        className={cn(
          glassButton,
          "flex items-center justify-center p-2.5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <User className="h-5 w-5 text-foreground" />
        <span className="sr-only">Profile</span>
      </button>
      
      <button
        type="button"
        className={cn(
          glassButton,
          "flex items-center justify-center p-2.5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <Settings className="h-5 w-5 text-foreground" />
        <span className="sr-only">Settings</span>
      </button>
    </div>
  );
}
