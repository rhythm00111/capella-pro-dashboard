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

    // Next month days - only complete 5 rows
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

  const dayHeaders = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[220px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 rounded-lg shadow-xl p-3 animate-in fade-in-0 duration-200 z-[60]"
      onMouseLeave={onClose}
    >
      {/* Month Header */}
      <div className="text-xs font-medium text-white mb-2 text-center">{monthName}</div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        {dayHeaders.map((day, i) => (
          <div key={i} className="text-[9px] text-zinc-500 uppercase text-center py-0.5">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {calendarData.map((day, index) => (
          <div
            key={index}
            className={cn(
              "relative h-6 w-6 flex flex-col items-center justify-center text-[10px] rounded",
              day.isCurrentMonth ? "text-white" : "text-zinc-600",
              day.isToday && "bg-white/10 ring-1 ring-white/20"
            )}
          >
            <span>{day.day}</span>
            {day.hasEvent && day.isCurrentMonth && (
              <span className="absolute bottom-0 w-0.5 h-0.5 bg-red-500 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
