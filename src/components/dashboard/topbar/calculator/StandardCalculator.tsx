import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export function StandardCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleNumberClick = useCallback((num: string) => {
    if (hasError) {
      setDisplay(num);
      setHasError(false);
      return;
    }

    if (waitingForNewNumber) {
      setDisplay(num);
      setWaitingForNewNumber(false);
    } else {
      setDisplay(prev => prev === "0" ? num : prev + num);
    }
  }, [hasError, waitingForNewNumber]);

  const handleDecimalClick = useCallback(() => {
    if (hasError) {
      setDisplay("0.");
      setHasError(false);
      return;
    }

    if (waitingForNewNumber) {
      setDisplay("0.");
      setWaitingForNewNumber(false);
    } else {
      setDisplay(prev => !prev.includes(".") ? prev + "." : prev);
    }
  }, [hasError, waitingForNewNumber]);

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

  const handleOperatorClick = useCallback((op: string) => {
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
  }, [display, hasError, operator, previousValue, waitingForNewNumber]);

  const handleEquals = useCallback(() => {
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
  }, [display, hasError, operator, previousValue]);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewNumber(false);
    setHasError(false);
  }, []);

  const handleToggleSign = useCallback(() => {
    if (hasError) return;
    setDisplay(prev => String(parseFloat(prev) * -1));
  }, [hasError]);

  const handlePercentage = useCallback(() => {
    if (hasError) return;
    setDisplay(prev => String(parseFloat(prev) / 100));
  }, [hasError]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleNumberClick(e.key);
      } else if (e.key === ".") {
        handleDecimalClick();
      } else if (e.key === "+" || e.key === "-") {
        handleOperatorClick(e.key);
      } else if (e.key === "*") {
        handleOperatorClick("×");
      } else if (e.key === "/") {
        e.preventDefault();
        handleOperatorClick("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        handleEquals();
      } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        handleClear();
      } else if (e.key === "%") {
        handlePercentage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNumberClick, handleDecimalClick, handleOperatorClick, handleEquals, handleClear, handlePercentage]);

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const getButtonStyle = (btn: string) => {
    // Function buttons (C, ±, %)
    if (btn === "C" || btn === "±" || btn === "%") {
      return "bg-secondary hover:bg-secondary/80 text-foreground";
    }
    // Operator buttons - orange gradient
    if (["÷", "×", "-", "+", "="].includes(btn)) {
      return "bg-gradient-to-b from-primary to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold shadow-lg shadow-primary/20";
    }
    // Number buttons
    return "bg-secondary/60 hover:bg-secondary text-foreground";
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

  // Format display for large numbers
  const formatDisplay = (value: string) => {
    if (value === "Error") return value;
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    if (Math.abs(num) >= 1e10) {
      return num.toExponential(4);
    }
    return value;
  };

  return (
    <div className="space-y-4">
      {/* Display */}
      <div className="bg-background rounded-lg px-4 py-4 text-right border border-border">
        <span className={cn(
          "text-3xl font-light text-foreground tracking-wide",
          hasError && "text-destructive"
        )}>
          {formatDisplay(display)}
        </span>
      </div>

      {/* Keypad */}
      <div className="grid gap-2">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className={cn(
                  "h-12 rounded-lg text-base font-medium transition-all duration-150",
                  "active:scale-95 active:opacity-90",
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