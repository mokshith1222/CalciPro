import { constructMetadata } from "@/seo/seo-utils";
import { SIPCalc } from "@/components/calculators/finance/SIPCalc";

export const metadata = constructMetadata({
  title: "SIP Calculator - Mutual Fund Return Planner",
  description: "Calculate your potential returns from Systematic Investment Plans (SIP) in mutual funds over time.",
});

export default function SIPPage() {
  return (
    <div className="py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 tracking-tight">SIP Calculator</h1>
        <p className="text-lg text-muted-foreground">
          See how small monthly investments can grow into a massive corpus.
        </p>
      </div>
      <SIPCalc />
    </div>
  );
}
