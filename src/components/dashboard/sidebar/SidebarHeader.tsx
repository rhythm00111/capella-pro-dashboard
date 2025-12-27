import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarContext } from "./SidebarContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function SidebarHeader() {
  const { isCollapsed, toggleCollapsed } = useSidebarContext();

  return (
    <div className={cn(
      "relative border-b border-border transition-all duration-300",
      isCollapsed ? "px-3 py-6" : "px-6 py-8"
    )}>
      {/* Collapse/Uncollapse Button */}
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleCollapsed}
              className={cn(
                "absolute w-6 h-6 rounded-md",
                "bg-transparent hover:bg-secondary",
                "text-muted-foreground hover:text-foreground",
                "transition-all duration-200 active:scale-95",
                "flex items-center justify-center",
                "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                isCollapsed ? "top-5 right-3" : "top-7 right-5"
              )}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isCollapsed ? (
        /* Collapsed: Show only "C" logo */
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto">
          <span className="text-foreground font-semibold text-base">C</span>
        </div>
      ) : (
        /* Expanded: Show full header */
        <>
          {/* Logo */}
          <div className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase mb-8">
            CAPELLA PRO
          </div>
          
          {/* User greeting section */}
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">{getGreeting()}</div>
            <div className="text-xl font-semibold text-foreground">User Name</div>
            <div className="text-sm text-muted-foreground">Your Profession</div>
          </div>
        </>
      )}
    </div>
  );
}