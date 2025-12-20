import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type CalculationType = "percentOf" | "whatPercent" | "percentOfWhat";

export function PercentageCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>("percentOf");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const result = useMemo(() => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || isNaN(v2)) return null;

    switch (calcType) {
      case "percentOf":
        // What is X% of Y?
        return (v1 / 100) * v2;
      case "whatPercent":
        // X is what % of Y?
        if (v2 === 0) return null;
        return (v1 / v2) * 100;
      case "percentOfWhat":
        // X is Y% of what?
        if (v2 === 0) return null;
        return (v1 / v2) * 100;
      default:
        return null;
    }
  }, [calcType, value1, value2]);

  const formatResult = (val: number) => {
    return val.toFixed(2);
  };

  const getLabels = () => {
    switch (calcType) {
      case "percentOf":
        return { label1: "Percentage (%)", label2: "of Value", resultLabel: "Result" };
      case "whatPercent":
        return { label1: "Part Value", label2: "Whole Value", resultLabel: "Percentage" };
      case "percentOfWhat":
        return { label1: "Part Value", label2: "Percentage (%)", resultLabel: "Whole Value" };
    }
  };

  const labels = getLabels();

  const tabClass = (active: boolean) =>
    cn(
      "px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
      active
        ? "bg-zinc-800/50 text-white"
        : "text-zinc-500 hover:text-zinc-300"
    );

  const inputClass = cn(
    "w-full bg-black/30 border border-zinc-800/30 rounded-xl px-4 py-3",
    "text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
  );

  return (
    <div className="space-y-5">
      {/* Calculation Type Tabs */}
      <div className="flex gap-1 p-1 bg-zinc-900/50 rounded-lg">
        <button
          onClick={() => setCalcType("percentOf")}
          className={tabClass(calcType === "percentOf")}
        >
          X% of Y
        </button>
        <button
          onClick={() => setCalcType("whatPercent")}
          className={tabClass(calcType === "whatPercent")}
        >
          X is ?% of Y
        </button>
        <button
          onClick={() => setCalcType("percentOfWhat")}
          className={tabClass(calcType === "percentOfWhat")}
        >
          X is Y% of ?
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">{labels.label1}</label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="0"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">{labels.label2}</label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="0"
            className={inputClass}
          />
        </div>
      </div>

      {/* Result Display */}
      <div className="mt-6 p-6 bg-zinc-800/30 rounded-xl">
        <p className="text-sm text-zinc-400 text-center mb-2">{labels.resultLabel}</p>
        <p className="text-3xl font-light text-white text-center">
          {result !== null ? (
            <>
              {formatResult(result)}
              {calcType === "whatPercent" && "%"}
            </>
          ) : (
            <span className="text-zinc-600">—</span>
          )}
        </p>
      </div>
    </div>
  );
}
