import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={cn(
      "flex items-center gap-2.5 px-3 py-1.5 rounded-md",
      "bg-secondary/30 hover:bg-secondary/40 transition-colors duration-150",
      className
    )}>
      <Search className="h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0" strokeWidth={1.5} />
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent text-[13px] text-foreground/90 placeholder:text-muted-foreground/40 focus:outline-none"
      />
    </div>
  );
}
