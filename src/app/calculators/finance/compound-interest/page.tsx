import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { generateCalculatorSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/seo/structured-data";
import { CompoundInterestCalc } from "@/components/calculators/finance/CompoundInterestCalc";
import Link from "next/link";
import { ChevronRight, Info, HelpCircle } from "lucide-react";

const pageTitle = "Compound Interest Calculator";
const pageDescription = "Calculate compound interest on your investments or loans. Compare daily, monthly, and yearly compounding frequencies.";
const pageUrl = "https://calcipro-phi.vercel.app/calculators/finance/compound-interest";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/finance/compound-interest",
  title: pageTitle,
  description: pageDescription,
});

const faqs = [
  { question: "What is Compound Interest?", answer: "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods." },
  { question: "How often should interest be compounded?", answer: "Generally, the more frequently interest is compounded, the higher the final amount will be. Monthly compounding results in more interest than yearly compounding." },
  { question: "What is the formula for compound interest?", answer: "The standard formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate, n is the compounding frequency per year, and t is the time in years." },
];

export default function CompoundInterestPage() {
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
      <nav className="flex items-center text-sm font-medium text-muted-foreground/60 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2 shrink-0" />
        <Link href="/calculators/finance" className="hover:text-primary transition-colors">Finance</Link>
        <ChevronRight className="h-4 w-4 mx-2 shrink-0" />
        <span className="text-foreground font-semibold shrink-0">{pageTitle}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
          <Info className="h-3 w-3" /> Popular Tool
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          {pageTitle}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          {pageDescription} Visualize your wealth growth with our advanced compounding engine.
        </p>
      </div>

      {/* Calculator Component */}
      <div className="mb-20">
        <CompoundInterestCalc />
      </div>

      {/* Content Sections */}
      <div className="grid lg:grid-cols-3 gap-12 border-t pt-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">1</span>
              Understanding Compounding
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Compound interest is often called the "snowball effect" of the financial world. Unlike simple interest, 
                where you only earn interest on your initial deposit, compounding allows you to earn interest on your interest.
              </p>
              <div className="bg-muted/50 p-6 rounded-2xl border my-8">
                <h4 className="mt-0 font-bold">The Math Behind the Money</h4>
                <p className="font-mono text-sm mb-0">A = P(1 + r/n)<sup>nt</sup></p>
                <ul className="text-sm mb-0">
                  <li><strong>A</strong> = Accrued amount (principal + interest)</li>
                  <li><strong>P</strong> = Principal amount (initial investment)</li>
                  <li><strong>r</strong> = Annual nominal interest rate (decimal)</li>
                  <li><strong>n</strong> = Compounding frequency per year</li>
                  <li><strong>t</strong> = Time in years</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">2</span>
              Comparison of Compounding Frequencies
            </h2>
            <div className="overflow-x-auto rounded-2xl border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-4 font-bold">Frequency</th>
                    <th className="p-4 font-bold">Times per Year</th>
                    <th className="p-4 font-bold">Effect on Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4">Annually</td>
                    <td className="p-4">1</td>
                    <td className="p-4 text-muted-foreground">Standard growth</td>
                  </tr>
                  <tr>
                    <td className="p-4">Quarterly</td>
                    <td className="p-4">4</td>
                    <td className="p-4 text-muted-foreground">Better than annual</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-primary">Monthly</td>
                    <td className="p-4">12</td>
                    <td className="p-4 text-muted-foreground">Most common for bank accounts</td>
                  </tr>
                  <tr>
                    <td className="p-4">Daily</td>
                    <td className="p-4">365</td>
                    <td className="p-4 text-emerald-500 font-medium">Maximum growth potential</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Quick FAQs
            </h3>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <p className="font-semibold mb-2">{faq.question}</p>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 rounded-3xl border border-dashed border-muted-foreground/30 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">Advertisement</p>
            <div className="h-[250px] w-full bg-muted/20 rounded-xl flex items-center justify-center text-muted-foreground/40 text-sm">
              AdSense Area
            </div>
          </div>
        </aside>
      </div>
      <FAQSection pathname="/calculators/finance/compound-interest" showFaqs={false} customFaqs={faqs} />
    </div>
  );
}
