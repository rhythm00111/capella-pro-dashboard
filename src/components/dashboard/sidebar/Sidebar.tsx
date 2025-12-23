import { cn } from "@/lib/utils";
import { useSidebarContext } from "./SidebarContext";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isCollapsed } = useSidebarContext();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen",
        "bg-[hsl(var(--sidebar-background))]",
        "border-r border-sidebar-border",
        "flex flex-col transition-all duration-300 ease-in-out z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader />
      <SidebarNav />
    </aside>
  );
}
