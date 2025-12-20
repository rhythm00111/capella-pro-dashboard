import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Wallet,
  Users,
  FileText,
  Presentation,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    label: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    label: "Whiteboard",
    href: "/whiteboard",
    icon: Presentation,
  },
];
