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
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/60">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3">
        <span className="text-indigo-500 font-black">05</span> Saved Product
        Profiles
      </h2>
      <p className="text-slate-500 text-sm mb-8">
        Compare different pricing scenarios side by side.
      </p>

      {profiles.length === 0 ? (
        <div
          className="text-center py-16 rounded-2xl border-2 border-dashed border-slate-200"
          data-ocid="profiles.empty_state"
        >
          <ClockIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-semibold">No saved profiles yet</p>
          <p className="text-slate-400 text-sm mt-1">
            Use the &ldquo;Save This Calculation&rdquo; button above to store a
            pricing scenario.
          </p>
        </div>
      ) : (
        <>
          {/* Profile cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="profiles.list"
          >
            {profiles.map((profile, idx) => (
              <div
                key={profile.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 hover:border-indigo-200 hover:shadow-md transition-all"
                data-ocid={`profiles.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">
                      {profile.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {fmtDate(profile.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onLoad(profile)}
                      data-ocid={`profiles.load_button.${idx + 1}`}
                      title="Load this profile"
                      className="p-3 rounded-lg text-indigo-500 hover:bg-indigo-50 transition"
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
                          className="px-2 py-1 text-xs rounded-lg bg-red-500 text-white font-bold"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(null)}
                          data-ocid={`profiles.cancel_button.${idx + 1}`}
                          className="px-2 py-1 text-xs rounded-lg bg-slate-200 text-slate-600 font-bold"
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
                        className="p-3 rounded-lg text-red-400 hover:bg-red-50 transition"
                        aria-label="Delete profile"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                    <p className="text-slate-400 font-medium">Selling Price</p>
                    <p className="text-slate-800 font-bold mt-0.5">
                      {fmt(profile.results.sellingPrice, currency)}
                    </p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                    <p className="text-slate-400 font-medium">Net Profit</p>
                    <p
                      className={`font-bold mt-0.5 ${profile.results.netProfit >= 0 ? "text-emerald-600" : "text-red-500"}`}
                    >
                      {fmt(profile.results.netProfit, currency)}
                    </p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                    <p className="text-slate-400 font-medium">Gross Margin</p>
                    <p className="text-indigo-600 font-bold mt-0.5">
                      {profile.results.grossMargin.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                    <p className="text-slate-400 font-medium">COGS</p>
                    <p className="text-slate-800 font-bold mt-0.5">
                      {fmt(profile.inputs.cogs, currency)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table — only shown when 2+ profiles */}
          {profiles.length >= 2 && (
            <div className="mt-8" data-ocid="profiles.comparison_table">
              <h3 className="text-base font-bold text-slate-700 mb-3">
                Side-by-Side Comparison
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-indigo-50">
                      <th className="text-left px-4 py-3 font-bold text-slate-600 border-r border-indigo-100 whitespace-nowrap min-w-[140px]">
                        Metric
                      </th>
                      {profiles.map((profile, idx) => (
                        <th
                          key={profile.id}
                          className="text-left px-4 py-3 font-bold text-indigo-700 whitespace-nowrap border-r border-indigo-100 last:border-r-0"
                          data-ocid={`profiles.comparison_header.${idx + 1}`}
                        >
                          <span className="block truncate max-w-[160px]">
                            {profile.name}
                          </span>
                          <span className="text-xs font-normal text-slate-400">
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
                        className={
                          rowIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }
                      >
                        <td className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-100 whitespace-nowrap">
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
                              className={`px-4 py-3 font-bold border-r border-slate-100 last:border-r-0 whitespace-nowrap ${isProfit ? (isNeg ? "text-red-500" : "text-emerald-600") : "text-slate-800"}`}
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
