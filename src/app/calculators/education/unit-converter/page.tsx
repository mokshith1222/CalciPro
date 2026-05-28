import { constructMetadata } from "@/seo/seo-utils";
import { UnitConverter } from "@/components/calculators/education/UnitConverter";
import { generateCalculatorSchema } from "@/seo/structured-data";
import { Info, Ruler } from "lucide-react";

export const metadata = constructMetadata({
  title: "Unit Converter - Length, Weight, Temperature",
  description: "Free online unit converter. Quickly convert between metric and imperial units for length, weight, and temperature.",
});

export default function UnitConverterPage() {
  const schema = generateCalculatorSchema({
    name: "Unit Converter",
    description: "Convert between different units of measurement.",
    url: "https://calcverse.com/calculators/education/unit-converter"
  });

  return (
    <div className="py-4 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Unit Converter</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A comprehensive tool to convert measurements between different systems. Accurate, fast, and covers all common units.
        </p>
      </div>

      <UnitConverter />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ruler className="h-5 w-5 text-blue-500" />
            Common Conversion Factors
          </h2>
          <div className="space-y-4 text-muted-foreground text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-900 rounded-lg">
                <p className="font-bold text-white mb-1">Length</p>
                <p>1 inch = 2.54 cm</p>
                <p>1 meter = 3.28 feet</p>
                <p>1 mile = 1.61 km</p>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg">
                <p className="font-bold text-white mb-1">Weight</p>
                <p>1 kg = 2.20 lbs</p>
                <p>1 oz = 28.35 g</p>
                <p>1 ton = 1000 kg</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Temperature Formulas
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm">Celsius to Fahrenheit</p>
              <p className="text-xs text-muted-foreground font-mono">°F = (°C × 9/5) + 32</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm">Fahrenheit to Celsius</p>
              <p className="text-xs text-muted-foreground font-mono">°C = (°F - 32) × 5/9</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm">Celsius to Kelvin</p>
              <p className="text-xs text-muted-foreground font-mono">K = °C + 273.15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
