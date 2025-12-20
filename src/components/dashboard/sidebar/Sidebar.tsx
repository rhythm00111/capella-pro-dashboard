import { cn } from "@/lib/utils";
import { glassSidebar } from "@/styles/glass";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";
import { Divider } from "../common/Divider";
import { navigationItems } from "@/constants/navigation";

interface SidebarProps {
  className?: string;
  activeHref?: string;
}

export function Sidebar({ className, activeHref = "/dashboard" }: SidebarProps) {
  return (
    <aside
      className={cn(
        glassSidebar,
        "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col",
        className
      )}
    >
      <SidebarHeader />
      
      <Divider className="mx-4" />
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationItems.map((item) => (
          <SidebarItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={item.href === activeHref}
          />
        ))}
      </nav>
    </aside>
  );
}
