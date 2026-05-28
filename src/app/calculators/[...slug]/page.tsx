import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, Hammer, ArrowLeft } from "lucide-react";
import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  title: "Calculator Coming Soon",
  description: "We are currently building this calculator. Stay tuned!",
});

export default async function CalculatorComingSoon({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const name = slug[slug.length - 1].replace(/-/g, " ");
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
        <Hammer className="h-10 w-10 text-primary animate-pulse" />
      </div>
      <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tight capitalize">
        {name} Coming Soon
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We're currently fine-tuning the formulas for this tool to ensure 100% accuracy. 
        It will be available very soon!
      </p>
      <Button asChild className="rounded-full px-8 h-12">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
        </Link>
      </Button>
    </div>
  );
}
