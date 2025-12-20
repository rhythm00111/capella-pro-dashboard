import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { StandardCalculator } from "./StandardCalculator";
import { CurrencyConverter } from "./CurrencyConverter";
import { PercentageCalculator } from "./PercentageCalculator";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CalculatorMode = "standard" | "currency" | "percentage";

export function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const [mode, setMode] = useState<CalculatorMode>("standard");

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

  if (!isOpen) return null;

  const tabs: { id: CalculatorMode; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "currency", label: "Currency" },
    { id: "percentage", label: "Percentage" },
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-2xl shadow-black/50 max-w-sm w-full mx-4 animate-in zoom-in-95 fade-in-0 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/30">
          <h2 className="text-base font-medium text-white">Calculator</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={cn(
                "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                mode === tab.id
                  ? "bg-zinc-800/50 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Calculator Content */}
        <div>
          {mode === "standard" && <StandardCalculator />}
          {mode === "currency" && <CurrencyConverter />}
          {mode === "percentage" && <PercentageCalculator />}
        </div>
      </div>
    </div>
  );
}
