import { constructMetadata } from "@/seo/seo-utils";
import { PercentageCalc } from "@/components/calculators/utility/PercentageCalc";

export const metadata = constructMetadata({
  title: "Percentage Calculator - Online Tool",
  description: "Quickly calculate percentages, find what percent one number is of another, and more.",
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
    </div>
  );
}
