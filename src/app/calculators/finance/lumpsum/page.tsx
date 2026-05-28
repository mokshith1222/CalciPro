import { constructMetadata } from "@/seo/seo-utils";
import { LumpsumCalc } from "@/components/calculators/finance/LumpsumCalc";
import { Info, HelpCircle } from "lucide-react";

export const metadata = constructMetadata({
  title: "Lumpsum Calculator - One-time Investment Returns",
  description: "Estimate the future value of your one-time investments. Perfect for stocks, mutual funds, and FD planning.",
});

export default function LumpsumPage() {
  return (
    <div className="py-4">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <Info className="h-3 w-3" /> Investment Tool
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Lumpsum Calculator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Planning a one-time investment? Use our precision engine to visualize your wealth growth over the years.
        </p>
      </div>

      <LumpsumCalc />

      <div className="mt-24 grid lg:grid-cols-3 gap-12 border-t pt-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">How Lumpsum Investing Works</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Lumpsum investing is the process of investing a large sum of money into a financial instrument all at once. 
                This is common when you receive a bonus, inheritance, or sell an asset.
              </p>
              <div className="p-8 rounded-[2rem] bg-muted/50 border my-10">
                <h4 className="font-bold mb-4">The Lumpsum Formula</h4>
                <p className="font-mono text-xl mb-0">FV = P × (1 + r/n)<sup>nt</sup></p>
                <p className="text-sm mt-4 text-muted-foreground">Where FV is future value, P is principal, r is rate, n is compounding frequency, and t is time.</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-primary text-primary-foreground">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" /> Quick Tips
            </h3>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                Start early to maximize the power of compounding.
              </li>
              <li className="flex gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                Consider your risk appetite before investing large sums.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
