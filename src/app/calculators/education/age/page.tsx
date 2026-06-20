import { ToolDescription } from "@/components/seo/ToolDescription";
import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { AgeCalc } from "@/components/calculators/education/AgeCalc";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/education/age",
  title: "Age Calculator – Find Your Exact Age in Years & Days",
  description: "Calculate your precise age in years, months, weeks, and days from your date of birth. Find time between any two dates with detailed breakdowns.",
});

export default function AgePage() {
  return (
    <div className="py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Age Calculator</h1>
        <p className="text-muted-foreground text-lg">
          Discover exactly how long you've been on this planet.
        </p>
      </div>
      <AgeCalc />
      <ToolDescription title="Age Calculator – Find Your Exact Age in Years & Days" description="Calculate your precise age in years, months, weeks, and days from your date of birth. Find time between any two dates with detailed breakdowns." />
      <FAQSection pathname="/calculators/education/age" />
    </div>
  );
}
