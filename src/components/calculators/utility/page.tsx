import { constructMetadata } from "@/seo/seo-utils";
import { FuelCostCalc } from "@/components/calculators/utility/FuelCostCalc";

export const metadata = constructMetadata({
  title: "Fuel Cost Calculator | CalciPro",
  description: "Plan your road trip budget by calculating fuel consumption and total costs accurately.",
});

export default function FuelCostPage() {
  return (
    <div className="py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 tracking-tight">Fuel Cost Calculator</h1>
        <p className="text-lg text-muted-foreground">Estimate your trip expenses based on distance and vehicle mileage.</p>
      </div>
      <FuelCostCalc />
    </div>
  );
}