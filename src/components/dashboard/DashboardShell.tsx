import { cn } from "@/lib/utils";
import { SidebarProvider, useSidebarContext } from "./sidebar/SidebarContext";
import { Sidebar } from "./sidebar/Sidebar";
import { TopBar } from "./topbar/TopBar";
import { DashboardCanvas } from "./main/DashboardCanvas";

interface DashboardShellProps {
  className?: string;
  children?: React.ReactNode;
}

function DashboardContent({ className, children }: DashboardShellProps) {
  const { isCollapsed } = useSidebarContext();

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sidebar />
      <TopBar isCollapsed={isCollapsed} />
      <DashboardCanvas isCollapsed={isCollapsed}>{children}</DashboardCanvas>
    </div>
  );
}

export function DashboardShell({ className, children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardContent className={className}>{children}</DashboardContent>
    </SidebarProvider>
  );
}
