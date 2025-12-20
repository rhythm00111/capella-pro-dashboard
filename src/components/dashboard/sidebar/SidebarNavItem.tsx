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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling to parent - fixes collapse bug
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-lg transition-all duration-200",
        "active:scale-[0.98] relative group",
        isCollapsed ? "px-0 py-3 justify-center" : "px-4 py-3",
        
        // Active state - teal accent
        isActive && !isCollapsed && [
          "bg-teal-500/10",
          "border-l-2 border-teal-500",
          "pl-[14px]",
          "rounded-l-none",
          "active:bg-teal-500/20",
          "active:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
        ],
        isActive && isCollapsed && [
          "bg-teal-500/10",
          "border-l-2 border-teal-500",
          "active:bg-teal-500/20",
          "active:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
        ],
        
        // Inactive state
        !isActive && "hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 transition-colors duration-200",
          isActive ? "text-teal-400" : "text-zinc-500 group-hover:text-zinc-300"
        )}
        strokeWidth={1.5}
      />

      {!isCollapsed && (
        <span
          className={cn(
            "text-sm transition-colors duration-200",
            isActive ? "text-teal-400 font-medium" : "text-zinc-400 group-hover:text-zinc-200"
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
