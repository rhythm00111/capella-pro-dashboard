import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface CalendarPreviewProps {
  onClose: () => void;
}

// Sample event dates (day of current month)
const EVENT_DATES = [15, 22, 28];

export function CalendarPreview({ onClose }: CalendarPreviewProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const calendarData = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; isToday: boolean; hasEvent: boolean }[] = [];

    // Previous month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isToday: day === today.getDate(),
        hasEvent: EVENT_DATES.includes(day),
      });
    }

    // Next month days
    const remainingDays = 35 - days.length > 0 ? 35 - days.length : 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
      });
    }

    return days;
  }, [currentMonth, currentYear, today]);

  const monthName = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div
      className="absolute top-full left-0 mt-2 w-80 glass-popup rounded-xl p-4 animate-in fade-in-0 zoom-in-95 duration-200 z-[60]"
      onMouseLeave={onClose}
    >
      {/* Month Header */}
      <div className="text-sm font-medium text-foreground mb-4 text-center">{monthName}</div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="h-9 w-9 flex items-center justify-center text-xs text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarData.map((day, index) => (
          <div
            key={index}
            className={cn(
              "relative h-9 w-9 flex flex-col items-center justify-center text-sm rounded-md cursor-pointer transition-colors duration-150",
              day.isCurrentMonth ? "text-foreground hover:bg-secondary" : "text-muted-foreground/30",
              day.isToday && "bg-secondary border border-primary text-primary font-medium"
            )}
          >
            <span>{day.day}</span>
            {day.hasEvent && day.isCurrentMonth && (
              <span className="absolute bottom-1 w-1 h-1 bg-destructive rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}