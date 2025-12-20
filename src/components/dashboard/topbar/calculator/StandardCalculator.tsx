import { useState } from "react";
import { cn } from "@/lib/utils";

export function StandardCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleNumberClick = (num: string) => {
    if (hasError) {
      setDisplay(num);
      setHasError(false);
      return;
    }

    if (waitingForNewNumber) {
      setDisplay(num);
      setWaitingForNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimalClick = () => {
    if (hasError) {
      setDisplay("0.");
      setHasError(false);
      return;
    }

    if (waitingForNewNumber) {
      setDisplay("0.");
      setWaitingForNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperatorClick = (op: string) => {
    if (hasError) return;

    const current = parseFloat(display);

    if (previousValue !== null && operator && !waitingForNewNumber) {
      const result = calculate(previousValue, current, operator);
      if (result === "Error") {
        setDisplay("Error");
        setHasError(true);
        setPreviousValue(null);
        setOperator(null);
        return;
      }
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(current);
    }

    setOperator(op);
    setWaitingForNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number | "Error" => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        if (b === 0) return "Error";
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (hasError || previousValue === null || operator === null) return;

    const current = parseFloat(display);
    const result = calculate(previousValue, current, operator);

    if (result === "Error") {
      setDisplay("Error");
      setHasError(true);
    } else {
      const formatted = Number.isInteger(result) 
        ? String(result) 
        : parseFloat(result.toFixed(10)).toString();
      setDisplay(formatted);
    }

    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewNumber(false);
    setHasError(false);
  };

  const handleToggleSign = () => {
    if (hasError) return;
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const handlePercentage = () => {
    if (hasError) return;
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const getButtonStyle = (btn: string) => {
    if (btn === "C") {
      return "bg-zinc-700/40 hover:bg-zinc-600/50 text-zinc-300";
    }
    if (btn === "±" || btn === "%") {
      return "bg-zinc-700/40 hover:bg-zinc-600/50 text-zinc-300";
    }
    if (["÷", "×", "-", "+"].includes(btn)) {
      return "bg-amber-600/80 hover:bg-amber-500/80 text-white";
    }
    if (btn === "=") {
      return "bg-amber-600/80 hover:bg-amber-500/80 text-white";
    }
    return "bg-zinc-800/60 hover:bg-zinc-700/60 text-white";
  };

  const handleButtonClick = (btn: string) => {
    if (btn === "C") {
      handleClear();
    } else if (btn === "±") {
      handleToggleSign();
    } else if (btn === "%") {
      handlePercentage();
    } else if (["÷", "×", "-", "+"].includes(btn)) {
      handleOperatorClick(btn);
    } else if (btn === "=") {
      handleEquals();
    } else if (btn === ".") {
      handleDecimalClick();
    } else {
      handleNumberClick(btn);
    }
  };

  return (
    <div className="space-y-3">
      {/* Display */}
      <div className="bg-black/40 rounded-lg px-3 py-3 text-right border border-zinc-800/30">
        <span className={cn(
          "text-2xl font-light text-white tracking-wide",
          hasError && "text-red-400"
        )}>
          {display}
        </span>
      </div>

      {/* Keypad */}
      <div className="grid gap-1.5">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-1.5">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className={cn(
                  "py-2.5 rounded-lg text-sm font-medium transition-all duration-150 active:scale-95",
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
