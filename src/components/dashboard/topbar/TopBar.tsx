import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { QuickAddButton } from "./QuickAddButton";
import { UserActions } from "./UserActions";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  const iconButtonClass = cn(
    "flex items-center justify-center p-1.5 rounded-md text-muted-foreground",
    "hover:text-foreground hover:bg-secondary/50 transition-colors duration-150",
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
  );

  return (
    <header
      className={cn(
        "fixed left-56 right-0 top-0 z-30 flex h-12 items-center justify-between px-5 bg-background/80 backdrop-blur-sm border-b border-border/50",
        className
      )}
    >
      <button type="button" className={iconButtonClass}>
        <Calendar className="h-4 w-4" />
        <span className="sr-only">Calendar</span>
      </button>

      <SearchBar className="w-full max-w-sm" />

      <div className="flex items-center gap-1">
        <QuickAddButton />
        <UserActions />
      </div>
    </header>
  );
}
