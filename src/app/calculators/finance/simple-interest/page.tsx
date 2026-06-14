import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { generateCalculatorSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/seo/structured-data";
import { SimpleInterestCalc } from "@/components/calculators/finance/SimpleInterestCalc";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const pageTitle = "Simple Interest Calculator";
const pageDescription = "Calculate simple interest and total amount based on principal, interest rate, and time. Free, fast, and easy to use.";
const pageUrl = "https://calcipro-phi.vercel.app/calculators/finance/simple-interest";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/finance/simple-interest",
  title: pageTitle,
  description: pageDescription,
});

const faqs = [
  { question: "What is Simple Interest?", answer: "Simple interest is a quick and easy method of calculating the interest charge on a loan or the return on investment. It is determined by multiplying the daily interest rate by the principal by the number of days that elapse between payments." },
  { question: "How does it differ from Compound Interest?", answer: "Simple interest is based on the principal amount of a loan or deposit. In contrast, compound interest is based on the principal amount and the interest that accumulates on it in every period." },
  { question: "Can time be in months instead of years?", answer: "Yes, but you must convert months into years by dividing the number of months by 12 before using the standard formula S.I. = (P×R×T)/100." },
];

export default function SimpleInterestPage() {
  const calculatorSchema = generateCalculatorSchema({ name: pageTitle, description: pageDescription, url: pageUrl });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://calcipro-phi.vercel.app" },
    { name: "Finance", url: "https://calcipro-phi.vercel.app/calculators/finance" },
    { name: pageTitle, url: pageUrl },
  ]);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="py-4">
      {/* Schemas */}
      
      
      

      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/calculators/finance" className="hover:text-primary transition-colors">Finance</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{pageTitle}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{pageTitle}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{pageDescription}</p>
      </div>

      {/* Calculator */}
      <div className="mb-16">
        <SimpleInterestCalc />
      </div>

      {/* Details & FAQs */}
      <div className="grid md:grid-cols-2 gap-12 border-t pt-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">About Simple Interest</h2>
          <div className="prose dark:prose-invert">
            <p>
              Simple interest is calculated on the principal, or original, amount of a loan or investment.
              Unlike compound interest, it does not accumulate interest on previously earned interest.
            </p>
            <h3>Formula</h3>
            <p>
              The simple interest formula is:
              <br/>
              <code>Simple Interest = (Principal × Rate × Time) / 100</code>
            </p>
            <ul>
              <li><strong>P (Principal):</strong> The initial amount of money.</li>
              <li><strong>R (Rate):</strong> The annual interest rate.</li>
              <li><strong>T (Time):</strong> The time the money is invested or borrowed for, in years.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FAQSection pathname="/calculators/finance/simple-interest" showFaqs={false} customFaqs={faqs} />
    </div>
  );
}
