import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { glassInput } from "@/styles/glass";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={cn(glassInput, "flex items-center gap-3 px-4 py-2.5", className)}>
      <Search className="h-4 w-4 text-muted-foreground shrink-0" />
      <input
        type="text"
        placeholder="Search anything..."
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}
