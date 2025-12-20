import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={cn("flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-secondary/40", className)}>
      <Search className="h-3.5 w-3.5 text-muted-foreground/60" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
      />
    </div>
  );
}
