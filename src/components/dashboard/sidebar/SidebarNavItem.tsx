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
        "w-full flex items-center rounded-md transition-all duration-200",
        "relative group",
        isCollapsed ? "px-0 py-2.5 justify-center" : "px-4 py-2.5 gap-3",
        
        // Active state - orange accent
        isActive && [
          "bg-primary/10",
          !isCollapsed && "border-l-2 border-primary pl-[14px]"
        ],
        
        // Collapsed active state
        isActive && isCollapsed && "bg-primary/10",
        
        // Inactive hover state
        !isActive && "hover:bg-secondary"
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-colors duration-200 flex-shrink-0",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground/80"
        )}
        strokeWidth={1.5}
      />

      {/* Label - only show when not collapsed */}
      {!isCollapsed && (
        <span
          className={cn(
            "text-sm transition-colors duration-200",
            isActive ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground/80"
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