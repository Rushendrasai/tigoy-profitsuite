import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { CalculationResults, DonutSegment } from "../../types/calculator";

interface DonutChartProps {
  data: DonutSegment[];
  currency: string;
  whatIfMargin: number;
  whatIfResults: CalculationResults;
  onWhatIfChange: (val: number) => void;
}

function fmt(val: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(val);
}

const CustomTooltip = ({
  active,
  payload,
  currency,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: DonutSegment }>;
  currency?: string;
}) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="font-bold text-foreground">{item.name}</p>
      <p className="text-primary font-semibold">{fmt(item.value, currency)}</p>
    </div>
  );
};

export function DonutChart({
  data,
  currency,
  whatIfMargin,
  whatIfResults,
  onWhatIfChange,
}: DonutChartProps) {
  return (
    <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
      <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
        <span className="text-primary font-black">03</span> Cost vs. Profit
        Breakdown
      </h2>
      <p className="text-muted-foreground text-sm mb-8">
        See how each dollar of your selling price is allocated.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Donut chart */}
        <div className="w-full" style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={entry.color}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip currency={currency} />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-sm font-medium text-muted-foreground">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {data.map((seg) => (
              <div
                key={seg.name}
                className="bg-muted/40 border border-border rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: seg.color }}
                  />
                  <p className="text-xs font-semibold text-muted-foreground">
                    {seg.name}
                  </p>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {fmt(seg.value, currency)}
                </p>
              </div>
            ))}
          </div>

          {/* What-If slider */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-bold text-foreground">
                What-If Margin Slider
              </p>
              <span className="text-lg font-extrabold text-primary">
                {whatIfMargin}%
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={95}
              step={1}
              value={whatIfMargin}
              onChange={(e) => onWhatIfChange(Number.parseInt(e.target.value))}
              data-ocid="calculator.whatif_slider"
              className="w-full accent-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5%</span>
              <span>95%</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t border-primary/20">
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Selling Price
                </p>
                <p className="text-base font-bold text-foreground">
                  {fmt(whatIfResults.sellingPrice, currency)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Net Profit
                </p>
                <p
                  className={`text-base font-bold ${whatIfResults.netProfit >= 0 ? "text-[oklch(0.60_0.16_134)]" : "text-destructive"}`}
                >
                  {fmt(whatIfResults.netProfit, currency)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
