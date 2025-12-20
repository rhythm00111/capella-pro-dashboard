import { navigationItems } from "@/constants/navigation";
import { SidebarNavItem } from "./SidebarNavItem";
import { useSidebarContext } from "./SidebarContext";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const { isCollapsed } = useSidebarContext();

  return (
    <nav className={cn(
      "flex-1 py-10 transition-all duration-300",
      isCollapsed ? "px-2" : "px-4"
    )}>
      <div className="space-y-3">
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>
    </nav>
  );
}
