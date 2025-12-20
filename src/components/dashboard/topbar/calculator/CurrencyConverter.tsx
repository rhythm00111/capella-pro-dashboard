import { useState, useEffect, useMemo } from "react";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD"];

const FALLBACK_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  INR: 83.2,
  AUD: 1.52,
  CAD: 1.36,
};

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}${fromCurrency}`);
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error("Failed to fetch rates:", error);
        setRates(FALLBACK_RATES);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, [fromCurrency]);

  const exchangeRate = rates[toCurrency] || 0;

  const toAmount = useMemo(() => {
    if (!amount || isNaN(parseFloat(amount))) return "0.00";
    return (parseFloat(amount) * exchangeRate).toFixed(2);
  }, [amount, exchangeRate]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const selectClass = cn(
    "bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-3 py-3",
    "text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600",
    "appearance-none cursor-pointer min-w-[80px]"
  );

  const inputClass = cn(
    "flex-1 bg-black/30 border border-zinc-800/30 rounded-xl px-4 py-3",
    "text-white text-lg focus:outline-none focus:ring-1 focus:ring-zinc-600",
    "placeholder:text-zinc-600"
  );

  return (
    <div className="space-y-4 min-w-[260px]">
      {loading && (
        <div className="flex items-center justify-center gap-2 py-2 text-zinc-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-xs">Loading exchange rates...</span>
        </div>
      )}

      {/* From Currency */}
      <div className="space-y-2">
        <label className="text-xs text-zinc-400">From</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className={inputClass}
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
          className="p-2.5 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all duration-200 active:scale-95"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>

      {/* To Currency */}
      <div className="space-y-2">
        <label className="text-xs text-zinc-400">To</label>
        <div className="flex gap-2">
          <div className="flex-1 bg-black/30 border border-zinc-800/30 rounded-xl px-4 py-3 text-lg text-white flex items-center">
            <span>{toAmount}</span>
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
      <p className="text-[11px] text-zinc-500 text-center pt-1">
        1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
      </p>
    </div>
  );
}
