import { cn } from "@/lib/utils";
import { glassButton, glassActive } from "@/styles/glass";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export function SidebarItem({ label, href, icon: Icon, isActive = false }: SidebarItemProps) {
  return (
    <a
      href={href}
      className={cn(
        glassButton,
        "flex items-center gap-3 px-4 py-3 text-sm font-medium",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? cn(glassActive, "text-foreground")
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
