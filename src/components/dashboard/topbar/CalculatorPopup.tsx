import { useState } from "react";
import { X, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalculatorPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type CalculatorMode = "standard" | "currency" | "percentage";

export function CalculatorPopup({ isOpen, onClose }: CalculatorPopupProps) {
  const [mode, setMode] = useState<CalculatorMode>("standard");
  const [display, setDisplay] = useState("0");

  const tabs: { id: CalculatorMode; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "currency", label: "Currency" },
    { id: "percentage", label: "Percentage" },
  ];

  const handleNumberClick = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleClear = () => {
    setDisplay("0");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-popup max-w-[320px] p-0 gap-0 border-0 rounded-xl overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-medium text-foreground/90">
              Calculator
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 mt-4 p-1 bg-secondary/50 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={cn(
                  "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                  mode === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </DialogHeader>

        <div className="px-5 pb-5">
          {mode === "standard" && (
            <StandardCalculator
              display={display}
              onNumberClick={handleNumberClick}
              onClear={handleClear}
            />
          )}
          {mode === "currency" && <CurrencyConverter />}
          {mode === "percentage" && <PercentageCalculator />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StandardCalculator({
  display,
  onNumberClick,
  onClear,
}: {
  display: string;
  onNumberClick: (num: string) => void;
  onClear: () => void;
}) {
  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const getButtonStyle = (btn: string) => {
    if (btn === "C" || btn === "±" || btn === "%") {
      return "bg-secondary/80 text-foreground/80 hover:bg-secondary";
    }
    if (["÷", "×", "−", "+", "="].includes(btn)) {
      return "bg-primary/90 text-primary-foreground hover:bg-primary";
    }
    return "bg-muted/50 text-foreground hover:bg-muted";
  };

  return (
    <div className="space-y-3">
      {/* Display */}
      <div className="bg-secondary/30 rounded-lg px-4 py-3 text-right">
        <span className="text-2xl font-light text-foreground tracking-wide">
          {display}
        </span>
      </div>

      {/* Keypad */}
      <div className="grid gap-2">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === "C") onClear();
                  else if (!["±", "%", "÷", "×", "−", "+", "="].includes(btn)) {
                    onNumberClick(btn);
                  }
                }}
                className={cn(
                  "h-11 rounded-lg text-sm font-medium transition-all duration-150",
                  btn === "0" ? "col-span-2" : "",
                  getButtonStyle(btn)
                )}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrencyConverter() {
  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

  return (
    <div className="space-y-4">
      {/* From currency */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">From</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="0.00"
            className="flex-1 bg-secondary/30 border-0 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <select className="bg-secondary/30 border-0 rounded-lg px-3 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring">
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap button */}
      <div className="flex justify-center">
        <button className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <ArrowRightLeft className="h-4 w-4" />
        </button>
      </div>

      {/* To currency */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">To</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="0.00"
            readOnly
            className="flex-1 bg-secondary/30 border-0 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground"
          />
          <select className="bg-secondary/30 border-0 rounded-lg px-3 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring">
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        Exchange rates are for display purposes only
      </p>
    </div>
  );
}

function PercentageCalculator() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Percentage</label>
        <input
          type="text"
          placeholder="0"
          className="w-full bg-secondary/30 border-0 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">of value</label>
        <input
          type="text"
          placeholder="0"
          className="w-full bg-secondary/30 border-0 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="pt-2 border-t border-border/50">
        <div className="flex justify-between items-center py-3">
          <span className="text-sm text-muted-foreground">Result</span>
          <span className="text-lg font-medium text-foreground">0</span>
        </div>
      </div>
    </div>
  );
}
