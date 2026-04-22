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
    <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
      <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
        <span className="text-primary font-black">04</span> Break-Even Analysis
      </h2>
      <p className="text-muted-foreground text-sm mb-8">
        How many units do you need to sell to cover your fixed costs?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Input */}
        <div className="space-y-5">
          <div>
            <label
              htmlFor="fixedMonthlyCost"
              className="block text-sm font-semibold text-muted-foreground mb-1.5"
            >
              Monthly Fixed Cost (e.g., software, office)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
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
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-input focus:border-ring focus:ring-4 focus:ring-ring/10 outline-none transition-all text-base font-semibold text-foreground bg-card"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-muted/40 border border-border rounded-xl p-3">
              <p className="text-muted-foreground font-medium">
                Net Profit / Unit
              </p>
              <p
                className={`text-base font-bold mt-1 ${netProfitPerUnit >= 0 ? "text-[oklch(0.60_0.16_134)]" : "text-destructive"}`}
              >
                {fmt(netProfitPerUnit, currency)}
              </p>
            </div>
            <div className="bg-muted/40 border border-border rounded-xl p-3">
              <p className="text-muted-foreground font-medium">
                Fixed Monthly Cost
              </p>
              <p className="text-base font-bold text-foreground mt-1">
                {fmt(fixedMonthlyCost, currency)}
              </p>
            </div>
          </div>
        </div>

        {/* Result */}
        <div
          className={`rounded-2xl p-6 text-center border-2 ${
            unitsToBreakEven !== null
              ? "bg-primary/5 border-primary/30"
              : "bg-destructive/5 border-destructive/30"
          }`}
        >
          {unitsToBreakEven !== null ? (
            <>
              <TrendingUpIcon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p
                className="text-5xl font-extrabold text-primary tracking-tighter"
                data-ocid="breakeven.units_result"
              >
                {unitsToBreakEven.toLocaleString()}
              </p>
              <p className="text-foreground font-semibold text-sm mt-2">
                units needed per month
              </p>
              <p className="text-muted-foreground text-xs mt-2">
                Sell <strong>{unitsToBreakEven.toLocaleString()} units</strong>{" "}
                at <strong>{fmt(results.sellingPrice, currency)}</strong> each
                to break even
              </p>
            </>
          ) : (
            <>
              <p className="text-destructive text-4xl font-extrabold">∞</p>
              <p className="text-destructive font-semibold text-sm mt-2">
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
