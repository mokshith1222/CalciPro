import { ToolDescription } from "@/components/seo/ToolDescription";
import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { BinaryConverter } from "@/components/calculators/tech/BinaryConverter";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/tech/binary",
  title: "Binary to Decimal Converter – Number Base Calculator",
  description: "Convert numbers between binary, decimal, octal, and hexadecimal formats instantly. Free online base conversion tool with step-by-step explanations.",
});

export default function BinaryPage() {
  return (
    <div className="py-4">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Binary Converter</h1>
        <p className="text-muted-foreground text-lg">
          Essential tool for developers and computer science students.
        </p>
      </div>
      <div className="max-w-xl">
        <BinaryConverter />
      </div>
      <ToolDescription title="Binary to Decimal Converter – Number Base Calculator" description="Convert numbers between binary, decimal, octal, and hexadecimal formats instantly. Free online base conversion tool with step-by-step explanations." />
      <FAQSection pathname="/calculators/tech/binary" />
    </div>
  );
}
