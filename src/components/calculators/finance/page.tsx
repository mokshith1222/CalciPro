import { constructMetadata } from "@/seo/seo-utils";
import { DiscountCalc } from "@/components/calculators/utility/DiscountCalc";

export const metadata = constructMetadata({
  title: "Discount Calculator | CalcVerse",
  description: "Calculate the sale price and your total savings instantly with our easy-to-use discount calculator.",
  canonical: "https://calcverse.com/calculators/utility/discount"
});

export default function DiscountPage() {
  return (
    <div className="py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 tracking-tight">Discount Calculator</h1>
        <p className="text-lg text-muted-foreground">Quickly find out how much you save during sales and promotions.</p>
      </div>
      <DiscountCalc />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Discount Calculator",
          "applicationCategory": "UtilitiesApplication"
        })}}
      />
    </div>
  );
}