import { AdBanner } from "./components/AdBanner";
import { InputPanel } from "./components/calculator/InputPanel";
import { Navbar } from "./components/calculator/Navbar";
import { OutputPanel } from "./components/calculator/OutputPanel";
import { useCalculator } from "./hooks/useCalculator";

export default function App() {
  const { inputs, results, updateInput, updateTaxPercent } = useCalculator();

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Page header */}
        <header className="py-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tighter">
            Profit Margin &amp; Price Calculator
          </h1>
          <p className="text-slate-500 mt-2 text-base sm:text-lg">
            Input your costs and desired margin to instantly find your ideal
            selling price.
          </p>
        </header>

        {/* Top Advertisement Banner */}
        <AdBanner
          imageUrl="https://adsection.tigoy.com/001.png"
          linkUrl="https://adsection.tigoy.com/ad001.html"
          width={960}
          height={200}
          alt="Top Advertisement"
        />

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
            <OutputPanel results={results} />
          </div>
        </section>

        {/* Bottom Advertisement Banner */}
        <AdBanner
          imageUrl="https://adsection.tigoy.com/002.png"
          linkUrl="https://adsection.tigoy.com/ad002.html"
          width={960}
          height={200}
          alt="Bottom Advertisement"
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:underline font-medium"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
