import { useCallback, useMemo, useState } from "react";
import { loadDefaults, saveDefaults } from "../lib/storage";
import type { CalculationResults, CalculatorInputs } from "../types/calculator";

const defaults = loadDefaults();

const DEFAULT_INPUTS: CalculatorInputs = {
  mode: "standard",
  percentageMode: "margin",
  cogs: 50,
  percentage: 30,
  targetPrice: 75,
  operatingExpenses: 0,
  feePreset: "custom",
  feePercent: 2.9,
  fixedFee: 0,
  feeHandling: "absorb",
  taxPercent: defaults.taxPercent,
  whatIfMargin: 30,
};

export function useCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);

  const updateInput = useCallback(
    <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateTaxPercent = useCallback((val: number) => {
    setInputs((prev) => ({ ...prev, taxPercent: val }));
    saveDefaults(val, "USD");
  }, []);

  const results = useMemo((): CalculationResults => {
    const { percentageMode, cogs, percentage, feePercent, taxPercent } = inputs;

    let sellingPrice = 0;
    let markupPercent = 0;
    let grossMargin = 0;

    if (percentageMode === "margin") {
      sellingPrice = percentage >= 100 ? 0 : cogs / (1 - percentage / 100);
      markupPercent = cogs > 0 ? ((sellingPrice - cogs) / cogs) * 100 : 0;
      grossMargin = percentage;
    } else {
      sellingPrice = cogs * (1 + percentage / 100);
      markupPercent = percentage;
      grossMargin =
        sellingPrice > 0 ? ((sellingPrice - cogs) / sellingPrice) * 100 : 0;
    }

    const feesPaid = sellingPrice * (feePercent / 100);
    const taxCollected = sellingPrice * (taxPercent / 100);
    const grossProfit = sellingPrice - cogs;
    const netProfit = grossProfit - feesPaid;
    const customerPays = sellingPrice + taxCollected;

    const total = sellingPrice || 1;

    return {
      sellingPrice,
      customerPays,
      grossProfit,
      netProfit,
      grossMargin,
      markupPercent,
      feesPaid,
      taxCollected,
      costShare: (cogs / total) * 100,
      feesShare: (feesPaid / total) * 100,
      taxShare: (taxCollected / total) * 100,
      profitShare: Math.max(0, (netProfit / total) * 100),
    };
  }, [inputs]);

  return {
    inputs,
    results,
    updateInput,
    updateTaxPercent,
  };
}
