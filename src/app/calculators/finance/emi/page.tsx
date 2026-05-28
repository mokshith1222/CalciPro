import { constructMetadata } from "@/seo/seo-utils";
import { EMICalc } from "@/components/calculators/finance/EMICalc";
import { generateCalculatorSchema } from "@/seo/structured-data";

export const metadata = constructMetadata({
  title: "EMI Calculator - Loan Repayment Planner",
  description: "Calculate your monthly loan EMI, total interest, and total payment for home, car, or personal loans.",
});

export default function EMIPage() {
  const schema = generateCalculatorSchema({
    name: "EMI Calculator",
    description: "Calculate your monthly loan EMI.",
    url: "https://calcverse.com/calculators/finance/emi"
  });

  return (
    <div className="py-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">EMI Calculator</h1>
        <p className="text-muted-foreground text-lg">
          Plan your loans better by calculating your monthly installments instantly.
        </p>
      </div>
      <EMICalc />
    </div>
  );
}
