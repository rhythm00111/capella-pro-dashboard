import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar/Sidebar";
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
      <Sidebar />
      <TopBar />
      <DashboardCanvas>{children}</DashboardCanvas>
    </div>
  );
}
