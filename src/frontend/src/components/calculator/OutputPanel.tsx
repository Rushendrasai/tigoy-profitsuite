import type { CalculationResults } from "../../types/calculator";

interface OutputPanelProps {
  results: CalculationResults;
  onSave?: () => void;
}

function fmt(val: number) {
  return val.toFixed(2);
}

function fmtCurrency(val: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

function fmtPct(val: number) {
  return (val / 100).toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
}

export function OutputPanel({ results, onSave }: OutputPanelProps) {
  return (
    <div className="bg-[oklch(0.14_0.01_263)] p-6 sm:p-8 rounded-3xl text-[oklch(0.85_0.05_263)] shadow-sm h-full">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="text-[oklch(0.72_0.19_263)] font-black">02</span>{" "}
        Real-Time Pricing
      </h2>

      <div className="space-y-8">
        {/* Recommended Selling Price */}
        <div className="bg-[oklch(0.18_0.01_263)] p-6 rounded-2xl border border-[oklch(0.28_0.01_263)]">
          <p className="text-sm font-bold text-[oklch(0.72_0.19_263)] uppercase tracking-widest">
            Recommended Selling Price
          </p>
          <p
            className="text-5xl font-extrabold text-white mt-2 tracking-tighter"
            data-ocid="calculator.selling_price"
          >
            ${fmt(results.customerPays)}
          </p>
          <p className="text-xs text-[oklch(0.65_0.05_263)] mt-2">
            This is the price your customer will pay.
          </p>
        </div>

        {/* Gross Profit / Net Profit */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[oklch(0.18_0.01_263)] p-5 rounded-xl border border-[oklch(0.28_0.01_263)]">
            <p className="text-xs font-bold text-[oklch(0.72_0.19_263)] uppercase">
              Gross Profit
            </p>
            <p
              className="text-2xl font-bold text-[oklch(0.70_0.17_162)] mt-1"
              data-ocid="calculator.gross_profit"
            >
              ${fmt(results.grossProfit)}
            </p>
          </div>
          <div className="bg-[oklch(0.18_0.01_263)] p-5 rounded-xl border border-[oklch(0.28_0.01_263)]">
            <p className="text-xs font-bold text-[oklch(0.72_0.19_263)] uppercase">
              Net Profit (after fees)
            </p>
            <p
              className={`text-2xl font-bold mt-1 ${results.netProfit >= 0 ? "text-[oklch(0.70_0.17_162)]" : "text-destructive"}`}
              data-ocid="calculator.net_profit"
            >
              ${fmt(results.netProfit)}
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3 pt-4 border-t border-[oklch(0.28_0.01_263)] text-sm">
          <div className="flex justify-between items-center">
            <span className="text-[oklch(0.65_0.05_263)]">
              Markup Percentage
            </span>
            <span
              className="font-bold text-white"
              data-ocid="calculator.markup_pct"
            >
              {fmtPct(results.markupPercent)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[oklch(0.65_0.05_263)]">
              Transaction Fees Paid
            </span>
            <span
              className="font-bold text-destructive"
              data-ocid="calculator.fees_paid"
            >
              {fmtCurrency(results.feesPaid)}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-[oklch(0.58_0.03_263)]">
            <span>Sales Tax Collected (for government)</span>
            <span data-ocid="calculator.tax_collected">
              ${fmt(results.taxCollected)}
            </span>
          </div>
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={onSave}
          data-ocid="calculator.save_button"
          className="w-full bg-white hover:bg-muted text-[oklch(0.14_0.01_263)] font-bold py-4 rounded-xl shadow-lg transition-smooth active:scale-95"
        >
          Save This Calculation
        </button>
      </div>
    </div>
  );
}
