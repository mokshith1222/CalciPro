import { ToolDescription } from "@/components/seo/ToolDescription";
import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { SIPCalc } from "@/components/calculators/finance/SIPCalc";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/finance/sip",
  title: "SIP Calculator – Mutual Fund Systematic Investment Plan",
  description: "Calculate potential returns from Systematic Investment Plans in mutual funds. Estimate future wealth with monthly SIP contributions and compound growth projections.",
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
      <ToolDescription title="SIP Calculator – Mutual Fund Systematic Investment Plan" description="Calculate potential returns from Systematic Investment Plans in mutual funds. Estimate future wealth with monthly SIP contributions and compound growth projections." />
      <FAQSection pathname="/calculators/finance/sip" />
    </div>
  );
}
