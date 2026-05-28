import { constructMetadata } from "@/seo/seo-utils";
import { GPACalc } from "@/components/calculators/education/GPACalc";
import { generateCalculatorSchema } from "@/seo/structured-data";
import { Info, HelpCircle } from "lucide-react";

export const metadata = constructMetadata({
  title: "GPA Calculator - College Grade Point Average",
  description: "Calculate your semester or cumulative GPA quickly. Supports credit-based grading systems and custom course entries.",
});

export default function GPAPage() {
  const schema = generateCalculatorSchema({
    name: "GPA Calculator",
    description: "Calculate your grade point average.",
    url: "https://calcverse.com/calculators/education/gpa"
  });

  return (
    <div className="py-4 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">GPA Calculator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Easily calculate your semester or cumulative grade point average (GPA) using our simple credit-based calculator.
        </p>
      </div>

      <GPACalc />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-orange-500" />
            GPA Calculation Formula
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>GPA is calculated using the following steps:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Assign a numerical value (points) to each letter grade (e.g., A=4, B=3).</li>
              <li>Multiply the grade points for each course by its credit hours.</li>
              <li>Sum all the grade points (Total Quality Points).</li>
              <li>Sum all the credit hours (Total Credits).</li>
              <li>Divide Total Quality Points by Total Credits.</li>
            </ol>
            <p className="font-mono bg-zinc-900 p-2 rounded text-xs">GPA = Σ(Grade Points * Credits) / Σ(Total Credits)</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-orange-500" />
            Common Grade Scales
          </h2>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-2 text-zinc-400">Grade</th>
                    <th className="py-2 text-zinc-400">Points</th>
                    <th className="py-2 text-zinc-400">Grade</th>
                    <th className="py-2 text-zinc-400">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 font-bold">A+ / A</td><td className="py-2">4.0</td>
                    <td className="py-2 font-bold">C+</td><td className="py-2">2.3</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 font-bold">A-</td><td className="py-2">3.7</td>
                    <td className="py-2 font-bold">C</td><td className="py-2">2.0</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 font-bold">B+</td><td className="py-2">3.3</td>
                    <td className="py-2 font-bold">D</td><td className="py-2">1.0</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">B</td><td className="py-2">3.0</td>
                    <td className="py-2 font-bold">F</td><td className="py-2">0.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
