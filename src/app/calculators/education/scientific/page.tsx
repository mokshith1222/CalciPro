import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { generateCalculatorSchema, generateBreadcrumbSchema } from "@/seo/structured-data";
import { ScientificCalc } from "@/components/calculators/education/ScientificCalc";
import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";

const pageTitle = "Online Scientific Calculator";
const pageDescription = "A free, fully-featured online scientific calculator with advanced functions like sin, cos, tan, log, and more.";
const pageUrl = "https://calcipro-phi.vercel.app/calculators/education/scientific";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/education/scientific",
  title: pageTitle,
  description: pageDescription,
});

export default function ScientificPage() {
  const calculatorSchema = generateCalculatorSchema({ name: pageTitle, description: pageDescription, url: pageUrl });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcipro-phi.vercel.app" },
    { name: "Education", url: "https://calcipro-phi.vercel.app/calculators/education" },
    { name: "Scientific Calculator", url: pageUrl },
  ]);

  return (
    <div className="py-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/calculators/education" className="hover:text-primary">Education</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Scientific Calculator</span>
      </nav>

      <div className="flex flex-col items-center text-center mb-16">
        <div className="h-16 w-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">{pageTitle}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          High-precision calculation tools for students, teachers, and professionals. 
          Perform complex operations instantly in your browser.
        </p>
      </div>

      <div className="mb-20">
        <ScientificCalc />
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <section className="bg-muted/30 p-8 rounded-3xl border">
          <h2 className="text-2xl font-bold mb-4">Features of our Scientific Calculator</h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-bold text-primary">Trigonometry</p>
              <p className="text-muted-foreground">Calculate Sine, Cosine, and Tangent with ease.</p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-primary">Logarithms</p>
              <p className="text-muted-foreground">Supports Natural Log (ln) and base-10 Log.</p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-primary">Square Roots</p>
              <p className="text-muted-foreground">Quickly find roots and handle exponential growth.</p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-primary">Constants</p>
              <p className="text-muted-foreground">Built-in values for Pi (π) for geometric calculations.</p>
            </div>
          </div>
        </section>
      </div>
      <FAQSection pathname="/calculators/education/scientific" />
    </div>
  );
}
