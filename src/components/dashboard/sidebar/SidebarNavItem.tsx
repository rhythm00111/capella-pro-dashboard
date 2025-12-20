import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebarContext } from "./SidebarContext";
import type { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function SidebarNavItem({ icon: Icon, label, href }: SidebarNavItemProps) {
  const { isCollapsed } = useSidebarContext();
  const location = useLocation();
  const isActive = location.pathname === href || 
    (href === "/dashboard" && location.pathname === "/");

  return (
    <Link
      to={href}
      className={cn(
        "w-full flex items-center gap-3 rounded-lg transition-all duration-200",
        "active:scale-[0.98] relative group",
        isCollapsed ? "px-0 py-2.5 justify-center" : "px-4 py-2.5",
        isActive && !isCollapsed && "bg-white/5 border-l-2 border-white pl-[14px] rounded-l-none",
        isActive && isCollapsed && "bg-white/5 border-l-2 border-white",
        !isActive && "hover:bg-white/5"
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 transition-colors duration-200",
          isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
        )}
        strokeWidth={1.5}
      />

      {!isCollapsed && (
        <span
          className={cn(
            "text-sm transition-colors duration-200",
            isActive ? "text-white font-medium" : "text-zinc-400 group-hover:text-zinc-200"
          )}
        >
          {label}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-zinc-800 rounded-md text-xs text-white
                        opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200
                        shadow-lg z-50 whitespace-nowrap">
          {label}
        </div>
      )}
    </Link>
  );
}
