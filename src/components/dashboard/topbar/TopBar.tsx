import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass, glassButton } from "@/styles/glass";
import { SearchBar } from "./SearchBar";
import { QuickAddButton } from "./QuickAddButton";
import { UserActions } from "./UserActions";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  return (
    <header
      className={cn(
        glass,
        "fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between px-6",
        className
      )}
    >
      <button
        type="button"
        className={cn(
          glassButton,
          "flex items-center justify-center p-2.5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <Calendar className="h-5 w-5 text-foreground" />
        <span className="sr-only">Calendar</span>
      </button>

      <SearchBar className="w-full max-w-md" />

      <div className="flex items-center gap-3">
        <QuickAddButton />
        <UserActions />
      </div>
    </header>
  );
}
