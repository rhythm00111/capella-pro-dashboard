import { useState } from "react";
import { cn } from "@/lib/utils";
import { StandardCalculator } from "./StandardCalculator";
import { CurrencyConverter } from "./CurrencyConverter";

type CalculatorMode = "standard" | "currency";

export function CalculatorWidget() {
  const [mode, setMode] = useState<CalculatorMode>("standard");

  const tabs: { id: CalculatorMode; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "currency", label: "Currency" },
  ];

  return (
    <div className="min-w-[280px]">
      {/* Mode Tabs */}
      <div className="flex gap-0.5 p-0.5 bg-zinc-800/30 rounded-lg mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={cn(
              "flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200",
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
      <div>
        {mode === "standard" && <StandardCalculator />}
        {mode === "currency" && <CurrencyConverter />}
      </div>
    </div>
  );
}
