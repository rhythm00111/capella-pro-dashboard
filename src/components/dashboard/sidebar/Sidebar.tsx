import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";
import { navigationItems } from "@/constants/navigation";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen w-56 flex-col bg-sidebar border-r border-sidebar-border",
        className
      )}
    >
      <SidebarHeader />
      
      <div className="mx-4 h-px bg-border/50" />
      
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navigationItems.map((item) => (
          <SidebarItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={currentPath === item.href || (currentPath === "/" && item.href === "/dashboard")}
          />
        ))}
      </nav>
    </aside>
  );
}
