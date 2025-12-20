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
        "fixed left-0 top-0 z-40 flex h-screen w-56 flex-col bg-sidebar",
        className
      )}
    >
      <SidebarHeader />
      
      {/* Centered navigation */}
      <nav className="flex flex-1 flex-col justify-center px-3 -mt-12">
        <div className="space-y-0.5">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isActive={currentPath === item.href || (currentPath === "/" && item.href === "/dashboard")}
            />
          ))}
        </div>
      </nav>
      
      {/* Bottom spacer for future use */}
      <div className="h-16" />
    </aside>
  );
}
