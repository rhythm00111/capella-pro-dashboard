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
    const remainingDays = 42 - days.length;
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

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className="absolute top-full left-0 mt-2 w-[280px] bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-xl p-4 animate-in fade-in-0 duration-200 z-50"
      onMouseLeave={onClose}
    >
      {/* Month Header */}
      <div className="text-sm font-medium text-white mb-3">{monthName}</div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayHeaders.map((day) => (
          <div key={day} className="text-xs text-zinc-500 uppercase text-center py-1">
            {day.charAt(0)}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarData.map((day, index) => (
          <div
            key={index}
            className={cn(
              "relative h-8 w-8 flex flex-col items-center justify-center text-sm rounded-full",
              day.isCurrentMonth ? "text-white" : "text-zinc-600",
              day.isToday && "bg-white/10"
            )}
          >
            <span>{day.day}</span>
            {day.hasEvent && day.isCurrentMonth && (
              <span className="absolute bottom-0.5 w-1 h-1 bg-red-500 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
