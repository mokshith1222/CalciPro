import { ToolDescription } from "@/components/seo/ToolDescription";
import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { PercentageCalc } from "@/components/calculators/utility/PercentageCalc";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/utility/percentage",
  title: "Percentage Calculator – Find Percent Values Instantly",
  description: "Calculate percentages, find what percent one number is of another, compute percentage increase or decrease, and solve common math problems with this free tool.",
});

export default function PercentagePage() {
  return (
    <div className="py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 tracking-tight">Percentage Calculator</h1>
        <p className="text-lg text-muted-foreground">
          A simple tool for everyday math calculations.
        </p>
      </div>
      <div className="max-w-2xl">
        <PercentageCalc />
      </div>
      <ToolDescription title="Percentage Calculator – Find Percent Values Instantly" description="Calculate percentages, find what percent one number is of another, compute percentage increase or decrease, and solve common math problems with this free tool." />
      <FAQSection pathname="/calculators/utility/percentage" />
    </div>
  );
}
