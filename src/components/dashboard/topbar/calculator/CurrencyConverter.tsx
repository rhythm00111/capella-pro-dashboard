import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.00,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  INR: 83.20,
  AUD: 1.52,
  CAD: 1.36,
};

const CURRENCIES = Object.keys(EXCHANGE_RATES);

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");

  const convertedAmount = useMemo(() => {
    if (!amount || isNaN(parseFloat(amount))) return null;
    
    const value = parseFloat(amount);
    // Convert to USD first, then to target currency
    const usdValue = value / EXCHANGE_RATES[fromCurrency];
    const result = usdValue * EXCHANGE_RATES[toCurrency];
    
    return result;
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + ` ${currency}`;
  };

  const selectClass = cn(
    "bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3",
    "text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600",
    "appearance-none cursor-pointer"
  );

  return (
    <div className="space-y-5">
      {/* From Currency */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">From</label>
        <div className="flex gap-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-black/30 border border-zinc-800/30 rounded-xl px-6 py-4 text-2xl text-white text-center placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className={selectClass}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c} className="bg-zinc-900">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap button */}
      <div className="flex justify-center">
        <button
          onClick={handleSwap}
          className="p-3 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all duration-200 active:scale-95"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>

      {/* To Currency */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">To</label>
        <div className="flex gap-3">
          <div className="flex-1 bg-black/30 border border-zinc-800/30 rounded-xl px-6 py-4 text-2xl text-white text-center min-h-[64px] flex items-center justify-center">
            {convertedAmount !== null ? (
              <span>{formatCurrency(convertedAmount, toCurrency)}</span>
            ) : (
              <span className="text-zinc-600">0.00 {toCurrency}</span>
            )}
          </div>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className={selectClass}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c} className="bg-zinc-900">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rate info */}
      <p className="text-xs text-zinc-500 text-center pt-2">
        1 {fromCurrency} = {(EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency]).toFixed(4)} {toCurrency}
      </p>
    </div>
  );
}
