import { TrendingUpIcon } from "lucide-react";
import { useState } from "react";
import type { CalculationResults } from "../../types/calculator";

interface BreakEvenSectionProps {
  results: CalculationResults;
  currency: string;
}

function fmt(val: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(val);
}

export function BreakEvenSection({ results, currency }: BreakEvenSectionProps) {
  const [fixedMonthlyCost, setFixedMonthlyCost] = useState(500);

  const netProfitPerUnit = results.netProfit;
  const unitsToBreakEven =
    netProfitPerUnit > 0
      ? Math.ceil(fixedMonthlyCost / netProfitPerUnit)
      : null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/60">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3">
        <span className="text-indigo-500 font-black">04</span> Break-Even
        Analysis
      </h2>
      <p className="text-slate-500 text-sm mb-8">
        How many units do you need to sell to cover your fixed costs?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Input */}
        <div className="space-y-5">
          <div>
            <label
              htmlFor="fixedMonthlyCost"
              className="block text-sm font-semibold text-slate-600 mb-1.5"
            >
              Monthly Fixed Cost (e.g., software, office)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                $
              </span>
              <input
                id="fixedMonthlyCost"
                type="number"
                value={fixedMonthlyCost}
                min={0}
                step={10}
                onChange={(e) =>
                  setFixedMonthlyCost(Number.parseFloat(e.target.value) || 0)
                }
                data-ocid="breakeven.fixed_cost_input"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-base font-semibold text-slate-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <p className="text-slate-500 font-medium">Net Profit / Unit</p>
              <p
                className={`text-base font-bold mt-1 ${netProfitPerUnit >= 0 ? "text-emerald-600" : "text-red-500"}`}
              >
                {fmt(netProfitPerUnit, currency)}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <p className="text-slate-500 font-medium">Fixed Monthly Cost</p>
              <p className="text-base font-bold text-slate-800 mt-1">
                {fmt(fixedMonthlyCost, currency)}
              </p>
            </div>
          </div>
        </div>

        {/* Result */}
        <div
          className={`rounded-2xl p-6 text-center border-2 ${unitsToBreakEven !== null ? "bg-indigo-50 border-indigo-200" : "bg-red-50 border-red-200"}`}
        >
          {unitsToBreakEven !== null ? (
            <>
              <TrendingUpIcon className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <p
                className="text-5xl font-extrabold text-indigo-700 tracking-tighter"
                data-ocid="breakeven.units_result"
              >
                {unitsToBreakEven.toLocaleString()}
              </p>
              <p className="text-indigo-600 font-semibold text-sm mt-2">
                units needed per month
              </p>
              <p className="text-indigo-500 text-xs mt-2">
                Sell <strong>{unitsToBreakEven.toLocaleString()} units</strong>{" "}
                at <strong>{fmt(results.sellingPrice, currency)}</strong> each
                to break even
              </p>
            </>
          ) : (
            <>
              <p className="text-red-500 text-4xl font-extrabold">∞</p>
              <p className="text-red-600 font-semibold text-sm mt-2">
                {netProfitPerUnit <= 0
                  ? "Net profit is zero or negative — increase your margin or reduce costs"
                  : "Unable to calculate break-even"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
