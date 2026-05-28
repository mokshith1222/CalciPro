import { constructMetadata } from "@/seo/seo-utils";
import { BinaryConverter } from "@/components/calculators/tech/BinaryConverter";

export const metadata = constructMetadata({
  title: "Binary to Decimal Converter",
  description: "Quickly convert numbers between binary and decimal formats with our free online tool.",
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
    </div>
  );
}
