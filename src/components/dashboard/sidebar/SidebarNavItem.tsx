import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarContext } from "./SidebarContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    e.stopPropagation();
  };

  const linkContent = (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(
        "w-full flex items-center rounded-md transition-all duration-150",
        "relative group",
        isCollapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5 gap-3",
        
        // Active state - subtle, earned accent
        isActive && [
          "bg-secondary/80",
          !isCollapsed && "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-4 before:bg-foreground/60 before:rounded-full"
        ],
        
        // Inactive state - very subtle hover
        !isActive && "hover:bg-secondary/40"
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 transition-colors duration-150 flex-shrink-0",
          isActive ? "text-foreground/90" : "text-muted-foreground group-hover:text-foreground/70"
        )}
        strokeWidth={1.5}
      />

      {/* Label - only show when not collapsed */}
      {!isCollapsed && (
        <span
          className={cn(
            "text-[13px] transition-colors duration-150",
            isActive ? "text-foreground/90 font-medium" : "text-sidebar-foreground group-hover:text-foreground/70"
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );

  // Show tooltip when collapsed
  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs font-normal">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return linkContent;
}
