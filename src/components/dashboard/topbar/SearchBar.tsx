import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 h-10 px-4 rounded-lg",
        "bg-secondary/50 border border-border",
        "text-muted-foreground",
        "transition-colors duration-200",
        "focus-within:bg-secondary focus-within:border-border",
        className
      )}
    >
      <Search className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}