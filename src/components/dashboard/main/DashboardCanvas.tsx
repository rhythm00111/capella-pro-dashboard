import { cn } from "@/lib/utils";
import { EmptyDashboard } from "./EmptyDashboard";

interface DashboardCanvasProps {
  className?: string;
  children?: React.ReactNode;
}

export function DashboardCanvas({ className, children }: DashboardCanvasProps) {
  return (
    <main
      className={cn(
        "mt-12 flex min-h-[calc(100vh-3rem)] flex-col",
        className
      )}
    >
      {children || <EmptyDashboard />}
    </main>
  );
}
