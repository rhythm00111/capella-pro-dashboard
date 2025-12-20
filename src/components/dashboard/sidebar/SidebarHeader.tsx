import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarContext } from "./SidebarContext";

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
      "relative border-b border-zinc-800/30 transition-all duration-300",
      isCollapsed ? "px-3 py-6" : "px-6 py-8"
    )}>
      {/* Collapse/Uncollapse Button */}
      <button
        onClick={toggleCollapsed}
        className={cn(
          "absolute w-7 h-7 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50",
          "text-zinc-400 hover:text-white transition-all duration-200 active:scale-95",
          "flex items-center justify-center",
          isCollapsed ? "top-5 right-2" : "top-6 right-4"
        )}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {isCollapsed ? (
        /* Collapsed: Show only "C" logo */
        <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mt-1">
          <span className="text-white font-bold text-base">C</span>
        </div>
      ) : (
        /* Expanded: Show full header */
        <>
          <div className="text-sm font-bold tracking-[0.25em] text-zinc-400 uppercase mb-10">
            CAPELLA PRO
          </div>
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400">{getGreeting()}</div>
            <div className="text-2xl font-semibold text-white">User Name</div>
            <div className="text-sm text-zinc-500">Your Profession</div>
          </div>
        </>
      )}
    </div>
  );
}
