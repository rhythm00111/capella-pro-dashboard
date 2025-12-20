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
        "group relative flex items-center gap-3 px-3 py-2.5 text-[13px] font-normal rounded-md transition-all duration-200",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        isActive
          ? "text-sidebar-foreground-active bg-sidebar-active"
          : "text-sidebar-foreground hover:text-sidebar-foreground-active hover:bg-sidebar-hover"
      )}
    >
      {/* Premium left accent indicator */}
      <span 
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-full transition-all duration-200",
          isActive 
            ? "bg-primary opacity-100" 
            : "bg-transparent opacity-0 group-hover:bg-muted-foreground/30 group-hover:opacity-100"
        )} 
      />
      <Icon className="h-[15px] w-[15px] shrink-0 opacity-60" />
      <span className="font-light tracking-wide">{label}</span>
    </Link>
  );
}
