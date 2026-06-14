import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { CalorieCalc } from "@/components/calculators/health/CalorieCalc";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/health/calories",
  title: "Calorie Calculator - Daily Energy Expenditure",
  description: "Calculate how many calories you need daily based on your age, weight, height, and activity level.",
});

export default function CaloriePage() {
  return (
    <div className="py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 tracking-tight">Calorie Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Find your Total Daily Energy Expenditure (TDEE) and reach your fitness goals.
        </p>
      </div>
      <CalorieCalc />
      <FAQSection pathname="/calculators/health/calories" />
    </div>
  );
}
