import { CalculatorIcon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
            <CalculatorIcon className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">
            TIGOY.com <span className="text-indigo-600">ProfitSuite</span>
          </span>
        </div>
        <div className="text-sm font-semibold text-slate-400 hidden sm:block">
          Live Calculator v1.2
        </div>
      </div>
    </nav>
  );
}
