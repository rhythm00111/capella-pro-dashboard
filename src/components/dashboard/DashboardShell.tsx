import { useState } from "react";
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
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sidebar />
      <TopBar 
        isCollapsed={isCollapsed} 
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenCalendar={() => setIsCalendarOpen(true)}
      />
      <DashboardCanvas 
        isCollapsed={isCollapsed}
        isCalculatorOpen={isCalculatorOpen}
        isCalendarOpen={isCalendarOpen}
        onCloseCalculator={() => setIsCalculatorOpen(false)}
        onCloseCalendar={() => setIsCalendarOpen(false)}
      >
        {children}
      </DashboardCanvas>
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
