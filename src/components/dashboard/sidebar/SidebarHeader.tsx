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
      "relative border-b border-sidebar-border transition-all duration-300",
      isCollapsed ? "px-3 py-6" : "px-6 py-8"
    )}>
      {/* Collapse/Uncollapse Button - improved discoverability */}
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleCollapsed}
              className={cn(
                "absolute w-6 h-6 rounded-md",
                "bg-transparent hover:bg-secondary/60",
                "text-muted-foreground hover:text-foreground/80",
                "transition-all duration-200 active:scale-95",
                "flex items-center justify-center",
                "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring/50",
                isCollapsed ? "top-5 right-3" : "top-7 right-5"
              )}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
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
        <div className="w-9 h-9 rounded-lg bg-secondary/40 flex items-center justify-center mx-auto">
          <span className="text-foreground/90 font-medium text-sm tracking-tight">C</span>
        </div>
      ) : (
        /* Expanded: Show full header */
        <>
          {/* Logo - calm, not bold */}
          <div className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
            CAPELLA PRO
          </div>
          
          {/* User greeting section */}
          <div className="space-y-1">
            <div className="text-[13px] text-muted-foreground font-normal">{getGreeting()}</div>
            <div className="text-lg font-medium text-foreground/90 tracking-tight">User Name</div>
            <div className="text-[13px] text-muted-foreground/70 font-normal">Your Profession</div>
          </div>
        </>
      )}
    </div>
  );
}
