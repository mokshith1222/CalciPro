import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { LoanCalc } from "@/components/calculators/finance/LoanCalc";
import { generateCalculatorSchema } from "@/seo/structured-data";
import { Info, Landmark } from "lucide-react";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/finance/loan",
  title: "Loan Calculator – EMI, Amortization & Interest Breakdown",
  description: "Detailed loan calculator with monthly amortization schedule, total interest cost, principal breakdown, and EMI computation for any loan type and tenure.",
});

export default function LoanPage() {
  const schema = generateCalculatorSchema({
    name: "Loan Calculator",
    description: "Detailed loan repayment calculator with amortization schedule.",
    url: "https://calcipro-phi.vercel.app/calculators/finance/loan"
  });

  return (
    <div className="py-4 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Loan Calculator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Get a complete breakdown of your loan repayment journey. See how much of each payment goes toward interest versus principal.
        </p>
      </div>

      <LoanCalc />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            Understanding Amortization
          </h2>
          <div className="space-y-4 text-muted-foreground text-sm">
            <p>
              Amortization is the process of spreading out a loan into a series of fixed payments over time. While each monthly payment remains the same, the portion that goes towards interest decreases, and the portion towards the principal increases over time.
            </p>
            <p>
              In the early years of a long-term loan (like a mortgage), most of your payment goes toward interest.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Key Loan Terms
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm text-white">Principal</p>
              <p className="text-xs text-muted-foreground">The actual amount of money you borrowed from the lender.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm text-white">Interest</p>
              <p className="text-xs text-muted-foreground">The cost of borrowing money, calculated as a percentage of the principal.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm text-white">Tenure</p>
              <p className="text-xs text-muted-foreground">The total time period allowed to repay the loan in full.</p>
            </div>
          </div>
        </div>
      </div>
      <FAQSection pathname="/calculators/finance/loan" />
    </div>
  );
}
