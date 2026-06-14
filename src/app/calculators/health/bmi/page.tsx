import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { generateCalculatorSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/seo/structured-data";
import { BMICalc } from "@/components/calculators/health/BMICalc";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pageTitle = "BMI Calculator - Body Mass Index";
const pageDescription = "Calculate your Body Mass Index (BMI) instantly. Our free tool supports both metric and imperial units with health classification.";
const pageUrl = "https://calcipro-phi.vercel.app/calculators/health/bmi";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/health/bmi",
  title: pageTitle,
  description: pageDescription,
});

const faqs = [
  { question: "What is a healthy BMI?", answer: "A healthy BMI range is typically considered between 18.5 and 24.9. However, this varies slightly by age and body composition." },
  { question: "Is BMI accurate for athletes?", answer: "BMI may not be accurate for athletes or individuals with high muscle mass, as muscle weighs more than fat, which can lead to a high BMI score even with low body fat." },
  { question: "How often should I check my BMI?", answer: "Most health professionals recommend checking your BMI once every few months or during annual check-ups unless you are actively following a weight management plan." },
];

export default function BMIPage() {
  const calculatorSchema = generateCalculatorSchema({ name: pageTitle, description: pageDescription, url: pageUrl });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcipro-phi.vercel.app" },
    { name: "Health", url: "https://calcipro-phi.vercel.app/calculators/health" },
    { name: "BMI Calculator", url: pageUrl },
  ]);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="py-4">
      
      
      

      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/calculators/health" className="hover:text-primary">Health</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">BMI Calculator</span>
      </nav>

      <div className="mb-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">BMI Calculator</h1>
        <p className="text-lg text-muted-foreground">
          {pageDescription} Understand your body composition and set realistic health goals.
        </p>
      </div>

      <BMICalc />

      <div className="mt-20 grid lg:grid-cols-2 gap-16 border-t pt-16">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">BMI Categories Table</h2>
          <div className="rounded-2xl border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4">BMI Range</th>
                  <th className="p-4">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="p-4">Below 18.5</td><td className="p-4 text-blue-500">Underweight</td></tr>
                <tr><td className="p-4">18.5 – 24.9</td><td className="p-4 text-emerald-500">Normal weight</td></tr>
                <tr><td className="p-4">25.0 – 29.9</td><td className="p-4 text-orange-500">Overweight</td></tr>
                <tr><td className="p-4">30.0 and Above</td><td className="p-4 text-rose-500 font-bold">Obese</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Health FAQs</h2>
          <div className="grid gap-6">
            {faqs.map((faq, i) => (
              <Card key={i} className="bg-muted/30 border-none">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <FAQSection pathname="/calculators/health/bmi" showFaqs={false} customFaqs={faqs} />
    </div>
  );
}
