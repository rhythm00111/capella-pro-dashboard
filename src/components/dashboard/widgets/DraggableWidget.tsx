import Draggable from "react-draggable";
import { X, GripHorizontal } from "lucide-react";
import { useRef } from "react";

interface DraggableWidgetProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  defaultPosition?: { x: number; y: number };
}

export function DraggableWidget({
  title,
  children,
  onClose,
  defaultPosition = { x: 100, y: 100 },
}: DraggableWidgetProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle"
      defaultPosition={defaultPosition}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className="absolute z-50 glass-popup rounded-xl overflow-hidden min-w-[280px]"
      >
        {/* Draggable Header */}
        <div className="drag-handle flex items-center justify-between px-4 py-3 border-b border-border cursor-grab active:cursor-grabbing bg-secondary/30">
          <div className="flex items-center gap-2">
            <GripHorizontal className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Widget Content */}
        <div className="p-4">{children}</div>
      </div>
    </Draggable>
  );
}