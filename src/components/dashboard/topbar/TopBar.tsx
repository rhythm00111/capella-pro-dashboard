import { useState, useRef, useEffect } from "react";
import { Calculator, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { QuickAddButton } from "./QuickAddButton";
import { UserActions } from "./UserActions";
import { CalendarPreview } from "./calendar/CalendarPreview";

interface TopBarProps {
  className?: string;
  isCollapsed?: boolean;
  onOpenCalculator?: () => void;
  onOpenCalendar?: () => void;
}

export function TopBar({ className, isCollapsed, onOpenCalculator, onOpenCalendar }: TopBarProps) {
  const [isCalendarPreviewVisible, setIsCalendarPreviewVisible] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const iconButtonClass = cn(
    "flex items-center justify-center w-8 h-8 rounded-md",
    "text-muted-foreground hover:text-foreground/80",
    "hover:bg-secondary/50 transition-colors duration-150",
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
  );

  const handleCalendarMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsCalendarPreviewVisible(true);
    }, 300);
  };

  const handleCalendarMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleCalendarClick = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsCalendarPreviewVisible(false);
    onOpenCalendar?.();
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed right-0 top-0 z-30 flex h-12 items-center px-4",
        "bg-[hsl(var(--topbar-background))]",
        "border-b border-topbar-border",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "left-16" : "left-64",
        className
      )}
    >
      {/* Left section - Calculator & Calendar */}
      <div className="flex items-center gap-0.5">
        <button 
          type="button" 
          className={iconButtonClass}
          onClick={onOpenCalculator}
        >
          <Calculator className="h-4 w-4" strokeWidth={1.5} />
          <span className="sr-only">Calculator</span>
        </button>
        <div 
          className="relative"
          onMouseEnter={handleCalendarMouseEnter}
          onMouseLeave={handleCalendarMouseLeave}
        >
          <button 
            type="button" 
            className={iconButtonClass}
            onClick={handleCalendarClick}
          >
            <Calendar className="h-4 w-4" strokeWidth={1.5} />
            <span className="sr-only">Calendar</span>
          </button>
          {isCalendarPreviewVisible && (
            <CalendarPreview onClose={() => setIsCalendarPreviewVisible(false)} />
          )}
        </div>
      </div>

      {/* Center section - Search (left-centered) */}
      <div className="flex-1 flex justify-start ml-4">
        <SearchBar className="w-full max-w-xs" />
      </div>

      {/* Right section - Quick Add, Profile, Settings */}
      <div className="flex items-center gap-0.5">
        <QuickAddButton />
        <UserActions />
      </div>
    </header>
  );
}
