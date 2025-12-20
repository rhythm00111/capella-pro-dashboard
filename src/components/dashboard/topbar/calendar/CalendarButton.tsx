import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalendarPreview } from "./CalendarPreview";
import { CalendarModal } from "./CalendarModal";

interface CalendarButtonProps {
  className?: string;
}

export function CalendarButton({ className }: CalendarButtonProps) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPreviewVisible(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Delay closing to allow hovering over preview
    setTimeout(() => {
      setIsPreviewVisible(false);
    }, 100);
  };

  const handleClick = () => {
    setIsPreviewVisible(false);
    setIsModalOpen(true);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const iconButtonClass = cn(
    "flex items-center justify-center p-2 rounded-md text-muted-foreground",
    "hover:text-foreground hover:bg-secondary/60 transition-all duration-200",
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={cn(iconButtonClass, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <Calendar className="h-4 w-4" />
        <span className="sr-only">Calendar</span>
      </button>

      {isPreviewVisible && !isModalOpen && (
        <CalendarPreview onClose={() => setIsPreviewVisible(false)} />
      )}

      <CalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
