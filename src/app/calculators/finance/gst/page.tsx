import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { GSTCalc } from "@/components/calculators/finance/GSTCalc";
import { generateCalculatorSchema } from "@/seo/structured-data";
import { Info, HelpCircle } from "lucide-react";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/finance/gst",
  title: "GST Calculator – Goods & Services Tax Inclusive/Exclusive",
  description: "Calculate GST amounts instantly with support for inclusive and exclusive pricing. Handles 5%, 12%, 18%, and 28% tax slabs with detailed breakdowns.",
});

export default function GSTPage() {
  const schema = generateCalculatorSchema({
    name: "GST Calculator",
    description: "Calculate GST for any amount.",
    url: "https://calcipro-phi.vercel.app/calculators/finance/gst"
  });

  return (
    <div className="py-4 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">GST Calculator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Quickly calculate GST amounts, CGST, and SGST for your business or personal needs. Works for both net and gross amounts.
        </p>
      </div>

      <GSTCalc />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            How to use GST Calculator?
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>1. <strong>Select Type:</strong> Choose between 'GST Exclusive' (add GST to base price) or 'GST Inclusive' (find base price from total price).</p>
            <p>2. <strong>Enter Amount:</strong> Input the base or total amount you want to calculate for.</p>
            <p>3. <strong>Select Rate:</strong> Choose from standard rates (5%, 12%, 18%, 28%) or enter a custom rate.</p>
            <p>4. <strong>Results:</strong> View the detailed breakdown of CGST, SGST, and the Final Price instantly.</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-emerald-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1">What is GST?</p>
              <p className="text-sm text-muted-foreground text-sm">Goods and Services Tax (GST) is an indirect tax used in many countries on the supply of goods and services.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1">What is CGST and SGST?</p>
              <p className="text-sm text-muted-foreground text-sm">In dual GST models like India, CGST (Central GST) goes to the central government, and SGST (State GST) goes to the state government.</p>
            </div>
          </div>
        </div>
      </div>
      <FAQSection pathname="/calculators/finance/gst" />
    </div>
  );
}
