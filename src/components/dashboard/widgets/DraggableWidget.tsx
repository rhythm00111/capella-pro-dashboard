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
        className="absolute z-50 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
      >
        {/* Draggable Header */}
        <div className="drag-handle flex items-center justify-between px-4 py-3 border-b border-zinc-800/30 cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <GripHorizontal className="w-4 h-4 text-zinc-500" />
            <h3 className="text-sm font-medium text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Widget Content */}
        <div className="p-4">{children}</div>
      </div>
    </Draggable>
  );
}
