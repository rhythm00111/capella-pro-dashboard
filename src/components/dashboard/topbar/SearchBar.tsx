import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={cn("flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-secondary/50", className)}>
      <Search className="h-3.5 w-3.5 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}
