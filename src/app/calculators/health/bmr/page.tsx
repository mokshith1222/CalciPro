import { constructMetadata } from "@/seo/seo-utils";
import { BMRCalc } from "@/components/calculators/health/BMRCalc";
import { generateCalculatorSchema } from "@/seo/structured-data";
import { Info, Activity } from "lucide-react";

export const metadata = constructMetadata({
  title: "BMR Calculator - Basal Metabolic Rate",
  description: "Calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation. Find out how many calories your body burns at rest.",
});

export default function BMRPage() {
  const schema = generateCalculatorSchema({
    name: "BMR Calculator",
    description: "Calculate your basal metabolic rate.",
    url: "https://calcverse.com/calculators/health/bmr"
  });

  return (
    <div className="py-4 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">BMR Calculator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Your Basal Metabolic Rate is the number of calories your body burns just to stay alive. Use this to plan your diet and fitness goals.
        </p>
      </div>

      <BMRCalc />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-500" />
            What is BMR?
          </h2>
          <div className="space-y-4 text-muted-foreground text-sm">
            <p>
              Basal Metabolic Rate (BMR) is the minimum amount of energy (calories) required to maintain vital body functions, such as breathing, heart rate, and temperature regulation, while the body is at complete rest.
            </p>
            <p>
              It accounts for about 60-75% of the total calories you burn each day. Factors like age, muscle mass, and genetics play a significant role in determining your BMR.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-emerald-500" />
            Mifflin-St Jeor Formula
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm text-white">For Men</p>
              <p className="text-xs text-muted-foreground font-mono">BMR = 10W + 6.25H - 5A + 5</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm text-white">For Women</p>
              <p className="text-xs text-muted-foreground font-mono">BMR = 10W + 6.25H - 5A - 161</p>
            </div>
            <p className="text-[10px] text-zinc-500">
              Where: W = Weight (kg), H = Height (cm), A = Age (years)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
