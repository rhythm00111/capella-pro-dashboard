import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export function SidebarItem({ label, href, icon: Icon, isActive = false }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2 text-[13px] font-normal rounded-md transition-colors duration-150",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        isActive
          ? "text-sidebar-foreground-active bg-sidebar-active"
          : "text-sidebar-foreground hover:text-sidebar-foreground-active hover:bg-sidebar-hover"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full" />
      )}
      <Icon className="h-4 w-4 shrink-0 opacity-70" />
      <span>{label}</span>
    </Link>
  );
}
