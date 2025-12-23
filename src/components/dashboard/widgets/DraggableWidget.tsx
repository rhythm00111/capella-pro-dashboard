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
        className="absolute z-50 bg-popover/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
      >
        {/* Draggable Header */}
        <div className="drag-handle flex items-center justify-between px-3 py-2.5 border-b border-border cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <GripHorizontal className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
            <h3 className="text-[13px] font-medium text-foreground/90">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground/80 hover:bg-secondary/50 transition-colors duration-150"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Widget Content */}
        <div className="p-3">{children}</div>
      </div>
    </Draggable>
  );
}
