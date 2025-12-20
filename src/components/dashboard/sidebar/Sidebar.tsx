import { cn } from "@/lib/utils";
import { useSidebarContext } from "./SidebarContext";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isCollapsed } = useSidebarContext();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#0d0d0d] border-r border-zinc-900/50",
        "flex flex-col transition-all duration-300 ease-in-out z-40",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      <SidebarHeader />
      <SidebarNav />
      {/* Bottom section reserved for future use */}
      <div className="h-16" />
    </aside>
  );
}
