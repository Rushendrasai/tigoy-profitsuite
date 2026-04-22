export type CalculationMode = "standard" | "target";
export type PercentageMode = "margin" | "markup";
export type FeeHandling = "absorb" | "passOn";
export type FeePreset = "stripe" | "paypal" | "etsy" | "custom";

export interface CalculatorInputs {
  mode: CalculationMode;
  percentageMode: PercentageMode;
  cogs: number;
  percentage: number;
  targetPrice: number;
  operatingExpenses: number;
  feePreset: FeePreset;
  feePercent: number;
  fixedFee: number;
  feeHandling: FeeHandling;
  taxPercent: number;
  whatIfMargin: number;
}

export interface CalculationResults {
  sellingPrice: number;
  customerPays: number;
  grossProfit: number;
  netProfit: number;
  grossMargin: number;
  markupPercent: number;
  feesPaid: number;
  taxCollected: number;
  costShare: number;
  feesShare: number;
  taxShare: number;
  profitShare: number;
}

export interface DonutSegment {
  name: string;
  value: number;
  color: string;
}

export interface ProductProfile {
  id: string;
  name: string;
  inputs: CalculatorInputs;
  results: CalculationResults;
  createdAt: string;
}
