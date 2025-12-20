import { cn } from "@/lib/utils";
import { TopBar } from "./topbar/TopBar";
import { DashboardCanvas } from "./main/DashboardCanvas";

interface DashboardShellProps {
  className?: string;
  children?: React.ReactNode;
}

export function DashboardShell({
  className,
  children,
}: DashboardShellProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <TopBar />
      <DashboardCanvas>{children}</DashboardCanvas>
    </div>
  );
}
