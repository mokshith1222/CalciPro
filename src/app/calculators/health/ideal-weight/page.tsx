import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { IdealWeightCalc } from "@/components/calculators/health/IdealWeightCalc";
import { generateCalculatorSchema } from "@/seo/structured-data";
import { Info, Scale } from "lucide-react";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/health/ideal-weight",
  title: "Ideal Weight Calculator – Scientific Body Weight Goals",
  description: "Find your ideal body weight using Devine, Miller, Robinson, and Hamwi scientific formulas. Compare results across methods for your height and gender.",
});

export default function IdealWeightPage() {
  const schema = generateCalculatorSchema({
    name: "Ideal Weight Calculator",
    description: "Calculate your ideal body weight.",
    url: "https://calcipro-phi.vercel.app/calculators/health/ideal-weight"
  });

  return (
    <div className="py-4 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Ideal Weight Calculator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          What is the perfect weight for your height? Our calculator uses four different clinical formulas to give you a scientific range.
        </p>
      </div>

      <IdealWeightCalc />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Scale className="h-5 w-5 text-pink-500" />
            Formula Breakdown
          </h2>
          <div className="space-y-4 text-muted-foreground text-sm">
            <p><strong>Devine Formula:</strong> The most common formula used for drug dosage calculation.</p>
            <p><strong>Robinson Formula:</strong> An improved version of the Devine formula for better accuracy.</p>
            <p><strong>Miller Formula:</strong> Often used for clinical research and body composition studies.</p>
            <p><strong>Hamwi Formula:</strong> A traditional approach used in nutrition and dietetics.</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-pink-500" />
            Limitations
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              These formulas do not take into account:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>Muscle mass (Athletes may weigh more but be healthier)</li>
              <li>Bone density</li>
              <li>Fat distribution</li>
              <li>Age (Metabolism changes over time)</li>
            </ul>
            <p className="text-xs italic text-zinc-500 pt-4">
              *Please consult with a medical professional for personalized health advice.
            </p>
          </div>
        </div>
      </div>
      <FAQSection pathname="/calculators/health/ideal-weight" />
    </div>
  );
}
