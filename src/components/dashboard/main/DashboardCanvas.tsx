import { cn } from "@/lib/utils";
import { EmptyDashboard } from "./EmptyDashboard";

interface DashboardCanvasProps {
  className?: string;
  children?: React.ReactNode;
  isCollapsed?: boolean;
}

export function DashboardCanvas({ className, children, isCollapsed }: DashboardCanvasProps) {
  return (
    <main
      className={cn(
        "mt-11 flex min-h-[calc(100vh-2.75rem)] flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "ml-20" : "ml-72",
        className
      )}
    >
      {children || <EmptyDashboard />}
    </main>
  );
}
