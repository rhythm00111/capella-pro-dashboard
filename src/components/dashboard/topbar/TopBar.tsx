import { useState } from "react";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { QuickAddButton } from "./QuickAddButton";
import { UserActions } from "./UserActions";
import { CalculatorModal } from "./calculator/CalculatorModal";
import { CalendarButton } from "./calendar/CalendarButton";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const iconButtonClass = cn(
    "flex items-center justify-center p-2 rounded-md text-muted-foreground",
    "hover:text-foreground hover:bg-secondary/60 transition-all duration-200",
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
  );

  return (
    <>
      <header
        className={cn(
          "fixed left-56 right-0 top-0 z-30 flex h-11 items-center justify-between px-4 bg-topbar-background/80 backdrop-blur-sm border-b border-topbar-border/50",
          className
        )}
      >
        {/* Left section - Calculator & Calendar */}
        <div className="flex items-center gap-1">
          <button 
            type="button" 
            className={iconButtonClass}
            onClick={() => setIsCalculatorOpen(true)}
          >
            <Calculator className="h-4 w-4" />
            <span className="sr-only">Calculator</span>
          </button>
          <CalendarButton />
        </div>

        {/* Center section - Search */}
        <SearchBar className="w-full max-w-sm" />

        {/* Right section - Quick Add, Profile, Settings */}
        <div className="flex items-center gap-1">
          <QuickAddButton />
          <UserActions />
        </div>
      </header>

      <CalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
}
