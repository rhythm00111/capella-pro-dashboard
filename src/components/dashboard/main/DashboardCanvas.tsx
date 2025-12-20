import { useState } from "react";
import { cn } from "@/lib/utils";
import { EmptyDashboard } from "./EmptyDashboard";
import { DraggableWidget } from "../widgets/DraggableWidget";
import { CalculatorWidget } from "../topbar/calculator/CalculatorWidget";
import { CalendarWidget } from "../topbar/calendar/CalendarWidget";

interface DashboardCanvasProps {
  className?: string;
  children?: React.ReactNode;
  isCollapsed?: boolean;
  isCalculatorOpen?: boolean;
  isCalendarOpen?: boolean;
  onCloseCalculator?: () => void;
  onCloseCalendar?: () => void;
}

export function DashboardCanvas({ 
  className, 
  children, 
  isCollapsed,
  isCalculatorOpen,
  isCalendarOpen,
  onCloseCalculator,
  onCloseCalendar
}: DashboardCanvasProps) {
  return (
    <main
      className={cn(
        "relative mt-11 flex min-h-[calc(100vh-2.75rem)] flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "ml-20" : "ml-72",
        className
      )}
    >
      {children || <EmptyDashboard />}

      {/* Draggable Calculator Widget */}
      {isCalculatorOpen && onCloseCalculator && (
        <DraggableWidget
          title="Calculator"
          onClose={onCloseCalculator}
          defaultPosition={{ x: 100, y: 100 }}
        >
          <CalculatorWidget />
        </DraggableWidget>
      )}

      {/* Draggable Calendar Widget */}
      {isCalendarOpen && onCloseCalendar && (
        <DraggableWidget
          title="Calendar"
          onClose={onCloseCalendar}
          defaultPosition={{ x: 450, y: 100 }}
        >
          <CalendarWidget />
        </DraggableWidget>
      )}
    </main>
  );
}
