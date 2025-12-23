import { cn } from "@/lib/utils";
import { useSidebarContext } from "./SidebarContext";
import { SidebarNavItem } from "./SidebarNavItem";
import { navigationItems } from "@/constants/navigation";

export function SidebarNav() {
  const { isCollapsed } = useSidebarContext();

  return (
    <nav className={cn(
      "flex-1 py-6 transition-all duration-300",
      isCollapsed ? "px-2" : "px-3"
    )}>
      <div className="space-y-1">
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </nav>
  );
}
