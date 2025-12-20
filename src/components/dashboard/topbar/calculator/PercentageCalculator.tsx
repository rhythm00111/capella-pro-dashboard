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
        return (v1 / 100) * v2;
      case "whatPercent":
        if (v2 === 0) return null;
        return (v1 / v2) * 100;
      case "percentOfWhat":
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
      "px-2 py-1.5 rounded-md text-[10px] font-medium transition-all duration-200",
      active
        ? "bg-zinc-700/50 text-white"
        : "text-zinc-500 hover:text-zinc-300"
    );

  const inputClass = cn(
    "w-full bg-black/40 border border-zinc-800/30 rounded-lg px-3 py-2",
    "text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
  );

  return (
    <div className="space-y-4">
      {/* Calculation Type Tabs */}
      <div className="flex gap-0.5 p-0.5 bg-zinc-800/30 rounded-lg">
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
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">{labels.label1}</label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="0"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">{labels.label2}</label>
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
      <div className="p-4 bg-zinc-800/30 rounded-lg">
        <p className="text-[10px] text-zinc-400 text-center mb-1">{labels.resultLabel}</p>
        <p className="text-xl font-light text-white text-center">
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
