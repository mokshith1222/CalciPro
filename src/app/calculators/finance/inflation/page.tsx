import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { InflationCalc } from "@/components/calculators/finance/InflationCalc";
import { generateCalculatorSchema } from "@/seo/structured-data";
import { Info, TrendingUp } from "lucide-react";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/finance/inflation",
  title: "Inflation Calculator - Future Value of Money",
  description: "Calculate how inflation affects your money's purchasing power over time. Predict future costs and plan your savings effectively.",
});

export default function InflationPage() {
  const schema = generateCalculatorSchema({
    name: "Inflation Calculator",
    description: "Calculate the future value of money based on inflation.",
    url: "https://calcipro-phi.vercel.app/calculators/finance/inflation"
  });

  return (
    <div className="py-4 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Inflation Calculator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Inflation is the silent thief of your savings. Use this calculator to see how the cost of living changes and what your money will be worth in the future.
        </p>
      </div>

      <InflationCalc />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            What is Inflation?
          </h2>
          <div className="space-y-4 text-muted-foreground text-sm">
            <p>
              Inflation is the rate at which the general level of prices for goods and services is rising, and, subsequently, purchasing power is falling. 
            </p>
            <p>
              Central banks (like the Federal Reserve) usually target an inflation rate of about 2% per year to keep the economy growing at a healthy pace.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-orange-500" />
            Purchasing Power Formula
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm text-white">Future Value</p>
              <p className="text-xs text-muted-foreground font-mono">FV = P * (1 + r)^n</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm text-white">Purchasing Power</p>
              <p className="text-xs text-muted-foreground font-mono">PP = P / (1 + r)^n</p>
            </div>
            <p className="text-[10px] text-zinc-500 italic">
              Where: P = Principal, r = Inflation Rate, n = Number of Years
            </p>
          </div>
        </div>
      </div>
      <FAQSection pathname="/calculators/finance/inflation" />
    </div>
  );
}
