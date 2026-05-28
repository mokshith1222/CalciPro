import { constructMetadata } from "@/seo/seo-utils";
import { AgeCalc } from "@/components/calculators/education/AgeCalc";

export const metadata = constructMetadata({
  title: "Age Calculator - Find your exact age",
  description: "Calculate your exact age in years, months, and days based on your birth date.",
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
    </div>
  );
}
