import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample events
const SAMPLE_EVENTS: Record<string, { title: string; time: string }[]> = {
  "2024-12-15": [{ title: "Team Meeting", time: "2:00 PM" }],
  "2024-12-22": [{ title: "Project Deadline", time: "11:59 PM" }],
  "2024-12-28": [{ title: "Year-end Review", time: "3:00 PM" }],
};

export function CalendarModal({ isOpen, onClose }: CalendarModalProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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

    // Next month days
    const remainingDays = 42 - days.length;
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
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-2xl max-w-2xl w-full mx-4 animate-in zoom-in-95 fade-in-0 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white">{monthName}</h2>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleToday}
              className="px-3 py-1 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-md transition-colors"
            >
              Today
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayHeaders.map((day) => (
            <div key={day} className="text-xs text-zinc-400 uppercase font-medium text-center py-2">
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
                "relative p-3 flex flex-col items-center justify-center rounded-lg transition-all duration-150",
                day.isCurrentMonth ? "text-white hover:bg-zinc-800/50" : "text-zinc-600",
                day.isToday && "bg-white/10 border border-white/20",
                isSelected(day) && "bg-white text-black hover:bg-white"
              )}
            >
              <span className="text-sm">{day.day}</span>
              {day.hasEvent && (
                <span className={cn(
                  "absolute bottom-1 w-1 h-1 rounded-full",
                  isSelected(day) ? "bg-red-600" : "bg-red-500"
                )} />
              )}
            </button>
          ))}
        </div>

        {/* Events Section */}
        {selectedDate && (
          <div className="mt-6 pt-4 border-t border-zinc-800/30">
            <h3 className="text-sm font-medium text-zinc-400 mb-3">
              Events for {formatSelectedDate()}
            </h3>
            {selectedEvents ? (
              <div className="space-y-2">
                {selectedEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800/30 p-3 rounded-lg border-l-2 border-red-500"
                  >
                    <p className="text-sm text-zinc-400">{event.time}</p>
                    <p className="text-white font-medium">{event.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">No events scheduled</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
