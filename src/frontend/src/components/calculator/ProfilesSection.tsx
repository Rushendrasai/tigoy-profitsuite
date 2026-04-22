import { ArrowDownCircleIcon, ClockIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import type { ProductProfile } from "../../types/calculator";

interface ProfilesSectionProps {
  profiles: ProductProfile[];
  onLoad: (profile: ProductProfile) => void;
  onDelete: (id: string) => void;
  currency: string;
}

function fmt(val: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(val);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const COMPARE_ROWS: {
  label: string;
  render: (p: ProductProfile, currency: string) => string;
}[] = [
  { label: "Cost Price", render: (p, c) => fmt(p.inputs.cogs, c) },
  { label: "Selling Price", render: (p, c) => fmt(p.results.sellingPrice, c) },
  { label: "Net Profit", render: (p, c) => fmt(p.results.netProfit, c) },
  {
    label: "Gross Margin %",
    render: (p) => `${p.results.grossMargin.toFixed(2)}%`,
  },
  { label: "Transaction Fees", render: (p, c) => fmt(p.results.feesPaid, c) },
];

export function ProfilesSection({
  profiles,
  onLoad,
  onDelete,
  currency,
}: ProfilesSectionProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
      <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
        <span className="text-primary font-black">05</span> Saved Product
        Profiles
      </h2>
      <p className="text-muted-foreground text-sm mb-8">
        Compare different pricing scenarios side by side.
      </p>

      {profiles.length === 0 ? (
        <div
          className="text-center py-16 rounded-2xl border-2 border-dashed border-border"
          data-ocid="profiles.empty_state"
        >
          <ClockIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-semibold">
            No saved profiles yet
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Use the &ldquo;Save This Calculation&rdquo; button above to store a
            pricing scenario.
          </p>
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="profiles.list"
          >
            {profiles.map((profile, idx) => (
              <div
                key={profile.id}
                className="bg-muted/30 border border-border rounded-2xl p-5 flex flex-col gap-4 hover:border-primary/40 hover:shadow-md transition-all"
                data-ocid={`profiles.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate">
                      {profile.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {fmtDate(profile.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onLoad(profile)}
                      data-ocid={`profiles.load_button.${idx + 1}`}
                      title="Load this profile"
                      className="p-3 rounded-lg text-primary hover:bg-primary/10 transition-smooth"
                      aria-label="Load profile"
                    >
                      <ArrowDownCircleIcon className="w-4 h-4" />
                    </button>
                    {confirmDelete === profile.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            onDelete(profile.id);
                            setConfirmDelete(null);
                          }}
                          data-ocid={`profiles.confirm_button.${idx + 1}`}
                          className="px-2 py-1 text-xs rounded-lg bg-destructive text-destructive-foreground font-bold"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(null)}
                          data-ocid={`profiles.cancel_button.${idx + 1}`}
                          className="px-2 py-1 text-xs rounded-lg bg-muted text-muted-foreground font-bold"
                        >
                          No
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(profile.id)}
                        data-ocid={`profiles.delete_button.${idx + 1}`}
                        title="Delete this profile"
                        className="p-3 rounded-lg text-destructive hover:bg-destructive/10 transition-smooth"
                        aria-label="Delete profile"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-card border border-border rounded-lg p-2.5">
                    <p className="text-muted-foreground font-medium">
                      Selling Price
                    </p>
                    <p className="text-foreground font-bold mt-0.5">
                      {fmt(profile.results.sellingPrice, currency)}
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-2.5">
                    <p className="text-muted-foreground font-medium">
                      Net Profit
                    </p>
                    <p
                      className={`font-bold mt-0.5 ${profile.results.netProfit >= 0 ? "text-[oklch(0.60_0.16_134)]" : "text-destructive"}`}
                    >
                      {fmt(profile.results.netProfit, currency)}
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-2.5">
                    <p className="text-muted-foreground font-medium">
                      Gross Margin
                    </p>
                    <p className="text-primary font-bold mt-0.5">
                      {profile.results.grossMargin.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-2.5">
                    <p className="text-muted-foreground font-medium">COGS</p>
                    <p className="text-foreground font-bold mt-0.5">
                      {fmt(profile.inputs.cogs, currency)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          {profiles.length >= 2 && (
            <div className="mt-8" data-ocid="profiles.comparison_table">
              <h3 className="text-base font-bold text-foreground mb-3">
                Side-by-Side Comparison
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="text-left px-4 py-3 font-bold text-muted-foreground border-r border-border whitespace-nowrap min-w-[140px]">
                        Metric
                      </th>
                      {profiles.map((profile, idx) => (
                        <th
                          key={profile.id}
                          className="text-left px-4 py-3 font-bold text-primary whitespace-nowrap border-r border-border last:border-r-0"
                          data-ocid={`profiles.comparison_header.${idx + 1}`}
                        >
                          <span className="block truncate max-w-[160px]">
                            {profile.name}
                          </span>
                          <span className="text-xs font-normal text-muted-foreground">
                            {fmtDate(profile.createdAt)}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((row, rowIdx) => (
                      <tr
                        key={row.label}
                        className={rowIdx % 2 === 0 ? "bg-card" : "bg-muted/20"}
                      >
                        <td className="px-4 py-3 font-semibold text-muted-foreground border-r border-border whitespace-nowrap">
                          {row.label}
                        </td>
                        {profiles.map((profile, colIdx) => {
                          const value = row.render(profile, currency);
                          const isProfit = row.label === "Net Profit";
                          const isNeg =
                            isProfit && profile.results.netProfit < 0;
                          return (
                            <td
                              key={profile.id}
                              className={`px-4 py-3 font-bold border-r border-border last:border-r-0 whitespace-nowrap ${isProfit ? (isNeg ? "text-destructive" : "text-[oklch(0.60_0.16_134)]") : "text-foreground"}`}
                              data-ocid={`profiles.comparison_cell.${rowIdx + 1}.${colIdx + 1}`}
                            >
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
