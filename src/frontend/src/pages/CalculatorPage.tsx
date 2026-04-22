import { useCallback, useMemo, useState } from "react";
import { BreakEvenSection } from "../components/calculator/BreakEvenSection";
import { DonutChart } from "../components/calculator/DonutChart";
import { InputPanel } from "../components/calculator/InputPanel";
import { OutputPanel } from "../components/calculator/OutputPanel";
import { ProfilesSection } from "../components/calculator/ProfilesSection";
import { useCalculator } from "../hooks/useCalculator";
import { loadProfiles, saveProfiles } from "../lib/storage";
import type { DonutSegment, ProductProfile } from "../types/calculator";

const CURRENCY = "USD";

export default function CalculatorPage() {
  const { inputs, results, updateInput, updateTaxPercent } = useCalculator();
  const [profiles, setProfiles] = useState<ProductProfile[]>(loadProfiles);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [profileName, setProfileName] = useState("");

  const donutData = useMemo((): DonutSegment[] => {
    const sp = results.sellingPrice || 0;
    if (sp <= 0) return [];
    return [
      {
        name: "Cost of Goods",
        value: inputs.cogs,
        color: "oklch(0.55 0.16 263)",
      },
      {
        name: "Transaction Fees",
        value: results.feesPaid,
        color: "oklch(0.65 0.19 22)",
      },
      {
        name: "Net Profit",
        value: Math.max(0, results.netProfit),
        color: "oklch(0.60 0.16 134)",
      },
    ].filter((s) => s.value > 0);
  }, [results, inputs.cogs]);

  const whatIfResults = useMemo(() => {
    const { percentageMode, cogs, feePercent, taxPercent } = inputs;
    const margin = inputs.whatIfMargin;
    let sp = 0;
    if (percentageMode === "margin") {
      sp = margin >= 100 ? 0 : cogs / (1 - margin / 100);
    } else {
      sp = cogs * (1 + margin / 100);
    }
    const fees = sp * (feePercent / 100);
    const tax = sp * (taxPercent / 100);
    const gross = sp - cogs;
    const net = gross - fees;
    return {
      sellingPrice: sp,
      customerPays: sp + tax,
      grossProfit: gross,
      netProfit: net,
      grossMargin: sp > 0 ? ((sp - cogs) / sp) * 100 : 0,
      markupPercent: cogs > 0 ? ((sp - cogs) / cogs) * 100 : 0,
      feesPaid: fees,
      taxCollected: tax,
      costShare: 0,
      feesShare: 0,
      taxShare: 0,
      profitShare: 0,
    };
  }, [inputs]);

  const handleSave = useCallback(() => {
    if (!profileName.trim()) return;
    const profile: ProductProfile = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: profileName.trim(),
      inputs,
      results,
      createdAt: new Date().toISOString(),
    };
    const updated = [...profiles, profile];
    setProfiles(updated);
    saveProfiles(updated);
    setProfileName("");
    setShowSaveDialog(false);
  }, [profileName, inputs, results, profiles]);

  const handleDelete = useCallback(
    (id: string) => {
      const updated = profiles.filter((p) => p.id !== id);
      setProfiles(updated);
      saveProfiles(updated);
    },
    [profiles],
  );

  const handleLoad = useCallback(
    (profile: ProductProfile) => {
      for (const [k, v] of Object.entries(profile.inputs)) {
        updateInput(k as keyof typeof profile.inputs, v as never);
      }
    },
    [updateInput],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Page header */}
      <header className="py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tighter">
          Profit Margin &amp; Price Calculator
        </h1>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg">
          Input your costs and desired margin to instantly find your ideal
          selling price.
        </p>
      </header>

      {/* Main calculator: 2-col grid */}
      <section
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-ocid="calculator.section"
      >
        <div className="lg:col-span-2">
          <InputPanel
            inputs={inputs}
            updateInput={updateInput}
            updateTaxPercent={updateTaxPercent}
          />
        </div>
        <div className="lg:col-span-1">
          <OutputPanel
            results={results}
            onSave={() => setShowSaveDialog(true)}
          />
        </div>
      </section>

      {/* Save dialog */}
      {showSaveDialog && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          data-ocid="save_profile.dialog"
        >
          <div className="bg-card rounded-3xl p-8 shadow-2xl w-full max-w-md border border-border">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Save Calculation
            </h3>
            <p className="text-muted-foreground text-sm mb-5">
              Give this pricing scenario a name.
            </p>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder="e.g. Summer Product Line"
              data-ocid="save_profile.name_input"
              className="input-field mb-5"
              ref={(el) => el?.focus()}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={!profileName.trim()}
                data-ocid="save_profile.confirm_button"
                className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-smooth"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSaveDialog(false);
                  setProfileName("");
                }}
                data-ocid="save_profile.cancel_button"
                className="flex-1 bg-muted text-muted-foreground font-bold py-3 rounded-xl hover:bg-muted/80 transition-smooth"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donut Chart section */}
      <div className="mt-6">
        <DonutChart
          data={donutData}
          currency={CURRENCY}
          whatIfMargin={inputs.whatIfMargin}
          whatIfResults={whatIfResults}
          onWhatIfChange={(v) => updateInput("whatIfMargin", v)}
        />
      </div>

      {/* Break-Even section */}
      <div className="mt-6">
        <BreakEvenSection results={results} currency={CURRENCY} />
      </div>

      {/* Profiles section */}
      <div className="mt-6">
        <ProfilesSection
          profiles={profiles}
          onLoad={handleLoad}
          onDelete={handleDelete}
          currency={CURRENCY}
        />
      </div>
    </div>
  );
}
