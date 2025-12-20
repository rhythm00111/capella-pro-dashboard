import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample events
const SAMPLE_EVENTS: Record<string, { title: string; time: string }[]> = {
  "2024-12-15": [{ title: "Team Meeting", time: "2:00 PM" }],
  "2024-12-22": [{ title: "Project Deadline", time: "11:59 PM" }],
  "2024-12-28": [{ title: "Year-end Review", time: "3:00 PM" }],
  "2025-12-15": [{ title: "Team Meeting", time: "2:00 PM" }],
  "2025-12-22": [{ title: "Project Deadline", time: "11:59 PM" }],
  "2025-12-28": [{ title: "Year-end Review", time: "3:00 PM" }],
};

export function CalendarModal({ isOpen, onClose }: CalendarModalProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarData = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: { 
      day: number; 
      month: number;
      year: number;
      isCurrentMonth: boolean; 
      isToday: boolean; 
      hasEvent: boolean;
      dateString: string;
    }[] = [];

    // Previous month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const month = currentMonth === 0 ? 11 : currentMonth - 1;
      const year = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push({
        day,
        month,
        year,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: !!SAMPLE_EVENTS[dateString],
        dateString,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isToday = 
        day === today.getDate() && 
        currentMonth === today.getMonth() && 
        currentYear === today.getFullYear();
      days.push({
        day,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
        isToday,
        hasEvent: !!SAMPLE_EVENTS[dateString],
        dateString,
      });
    }

    // Next month days - only add enough to complete the grid
    const remainingDays = 35 - days.length > 0 ? 35 - days.length : 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const month = currentMonth === 11 ? 0 : currentMonth + 1;
      const year = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push({
        day,
        month,
        year,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: !!SAMPLE_EVENTS[dateString],
        dateString,
      });
    }

    return days;
  }, [currentMonth, currentYear, today]);

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("en-US", { 
    month: "long", 
    year: "numeric" 
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  };

  const handleDateClick = (day: typeof calendarData[0]) => {
    setSelectedDate(new Date(day.year, day.month, day.day));
  };

  const isSelected = (day: typeof calendarData[0]) => {
    if (!selectedDate) return false;
    return (
      day.day === selectedDate.getDate() &&
      day.month === selectedDate.getMonth() &&
      day.year === selectedDate.getFullYear()
    );
  };

  const selectedDateString = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : null;

  const selectedEvents = selectedDateString ? SAMPLE_EVENTS[selectedDateString] : null;

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const dayHeaders = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-0 gap-0 max-w-[320px] shadow-2xl">
        {/* Header */}
        <DialogHeader className="px-4 pt-4 pb-3 border-b border-zinc-800/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-medium text-white">
              {monthName}
            </DialogTitle>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleToday}
                className="px-2 py-0.5 text-[10px] text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded transition-colors"
              >
                Today
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="p-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayHeaders.map((day, i) => (
              <div key={i} className="text-[10px] text-zinc-500 uppercase font-medium text-center py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarData.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "relative h-8 w-8 flex flex-col items-center justify-center rounded-md transition-all duration-150 text-xs",
                  day.isCurrentMonth ? "text-white hover:bg-zinc-800/50" : "text-zinc-600",
                  day.isToday && "bg-white/10 ring-1 ring-white/20",
                  isSelected(day) && "bg-white text-zinc-900 hover:bg-white"
                )}
              >
                <span>{day.day}</span>
                {day.hasEvent && (
                  <span className={cn(
                    "absolute bottom-0.5 w-1 h-1 rounded-full",
                    isSelected(day) ? "bg-red-600" : "bg-red-500"
                  )} />
                )}
              </button>
            ))}
          </div>

          {/* Events Section */}
          {selectedDate && (
            <div className="mt-4 pt-3 border-t border-zinc-800/30">
              <h3 className="text-[10px] font-medium text-zinc-400 mb-2">
                {formatSelectedDate()}
              </h3>
              {selectedEvents ? (
                <div className="space-y-1.5">
                  {selectedEvents.map((event, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800/30 px-2.5 py-2 rounded-md border-l-2 border-red-500"
                    >
                      <p className="text-[10px] text-zinc-400">{event.time}</p>
                      <p className="text-xs text-white">{event.title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-xs">No events</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
