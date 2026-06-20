import { ToolDescription } from "@/components/seo/ToolDescription";
import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { EMICalc } from "@/components/calculators/finance/EMICalc";
import { generateCalculatorSchema } from "@/seo/structured-data";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/finance/emi",
  title: "EMI Calculator – Monthly Loan Repayment Planner Online",
  description: "Calculate your monthly EMI, total interest, and repayment amount for home loans, car loans, and personal loans. Free online planner with amortization breakdown.",
});

export default function EMIPage() {
  const schema = generateCalculatorSchema({
    name: "EMI Calculator",
    description: "Calculate your monthly loan EMI.",
    url: "https://calcipro-phi.vercel.app/calculators/finance/emi"
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
      <ToolDescription title="EMI Calculator – Monthly Loan Repayment Planner Online" description="Calculate your monthly EMI, total interest, and repayment amount for home loans, car loans, and personal loans. Free online planner with amortization breakdown." />
      <FAQSection pathname="/calculators/finance/emi" />
    </div>
  );
}
