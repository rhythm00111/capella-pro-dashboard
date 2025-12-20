import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

  const tabs: { id: CalculatorMode; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "currency", label: "Currency" },
    { id: "percentage", label: "Percentage" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-0 gap-0 max-w-[300px] shadow-2xl">
        {/* Header */}
        <DialogHeader className="px-4 pt-4 pb-3 border-b border-zinc-800/30">
          <DialogTitle className="text-sm font-medium text-white">
            Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {/* Mode Tabs */}
          <div className="flex gap-0.5 p-0.5 bg-zinc-800/30 rounded-lg mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={cn(
                  "flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                  mode === tab.id
                    ? "bg-zinc-700/50 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Calculator Content */}
          <div className="min-h-[280px]">
            {mode === "standard" && <StandardCalculator />}
            {mode === "currency" && <CurrencyConverter />}
            {mode === "percentage" && <PercentageCalculator />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
