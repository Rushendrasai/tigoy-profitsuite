import type { CalculatorInputs } from "../../types/calculator";

interface InputPanelProps {
  inputs: CalculatorInputs;
  updateInput: <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K],
  ) => void;
  updateTaxPercent: (val: number) => void;
}

function NumInput({
  label,
  id,
  value,
  onChange,
  prefix,
  suffix,
  step = 0.01,
  min = 0,
}: {
  label: string;
  id: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-muted-foreground mb-1"
      >
        {label}
      </label>
      <div className="relative mt-1">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
          className={`w-full py-3.5 rounded-xl border-2 border-input focus:border-ring focus:ring-4 focus:ring-ring/10 outline-none transition-all text-base font-semibold text-foreground bg-card ${prefix ? "pl-10 pr-4" : suffix ? "pl-4 pr-10" : "px-4"}`}
          data-ocid={`calculator.${id}_input`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function InputPanel({
  inputs,
  updateInput,
  updateTaxPercent,
}: InputPanelProps) {
  return (
    <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm h-full">
      <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
        <span className="text-primary font-black">01</span> Set Your Costs &amp;
        Margin
      </h2>

      <div className="space-y-6">
        {/* COGS */}
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <label htmlFor="cogs" className="font-semibold text-foreground">
            Cost Price (COGS)
          </label>
          <div className="relative md:col-span-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold select-none">
              $
            </span>
            <input
              type="number"
              id="cogs"
              value={inputs.cogs}
              min={0}
              step={0.01}
              onChange={(e) =>
                updateInput("cogs", Number.parseFloat(e.target.value) || 0)
              }
              data-ocid="calculator.cogs_input"
              className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-input focus:border-ring focus:ring-4 focus:ring-ring/10 outline-none transition-all text-lg font-semibold text-foreground bg-card"
            />
          </div>
        </div>

        {/* Calculation Method */}
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <span className="font-semibold text-foreground">
            Calculation Method
          </span>
          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            {(["margin", "markup"] as const).map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => updateInput("percentageMode", m)}
                data-ocid={`calculator.pct_mode_${m}_button`}
                className={`py-3 rounded-xl font-bold transition-all ${
                  inputs.percentageMode === m
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "margin" ? "Desired Margin (%)" : "Desired Markup (%)"}
              </button>
            ))}
          </div>
        </div>

        {/* Percentage input */}
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <label htmlFor="percentage" className="font-semibold text-foreground">
            {inputs.percentageMode === "margin"
              ? "Desired Margin (%)"
              : "Desired Markup (%)"}
          </label>
          <div className="relative md:col-span-2">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold select-none">
              %
            </span>
            <input
              type="number"
              id="percentage"
              value={inputs.percentage}
              min={0}
              step={0.1}
              onChange={(e) =>
                updateInput(
                  "percentage",
                  Number.parseFloat(e.target.value) || 0,
                )
              }
              data-ocid="calculator.percentage_input"
              className="w-full px-4 py-4 rounded-xl border-2 border-input focus:border-ring focus:ring-4 focus:ring-ring/10 outline-none transition-all text-lg font-semibold text-foreground bg-card"
            />
          </div>
        </div>

        <hr className="border-border" />

        <h3 className="text-lg font-semibold text-foreground pt-1">
          Optional: Include Overhead Costs
        </h3>

        {/* Fee % and Tax % */}
        <div className="grid md:grid-cols-2 gap-6">
          <NumInput
            label="Transaction Fee (%)"
            id="feePercent"
            value={inputs.feePercent}
            onChange={(v) => updateInput("feePercent", v)}
            suffix="%"
            step={0.1}
          />
          <NumInput
            label="Sales Tax / VAT (%)"
            id="taxPercent"
            value={inputs.taxPercent}
            onChange={updateTaxPercent}
            suffix="%"
            step={0.1}
          />
        </div>
      </div>
    </div>
  );
}
