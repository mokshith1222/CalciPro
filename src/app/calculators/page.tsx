import Link from "next/link";
import { ArrowRight, Calculator, ChevronRight } from "lucide-react";
import { CategoryHub } from "@/components/platform/CategoryHub";
import { DirectoryCalculatorGrid } from "@/components/directory/DirectoryCalculatorGrid";
import { getUniqueDirectoryCalculators } from "@/lib/calculator-directory";
import { constructMetadata, siteConfig } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  title: "Calculator Directory",
  description: "Browse every CalciPro calculator by category, subcategory, keyword, popularity, and use case.",
  canonical: `${siteConfig.url}/calculators`,
});

export default function CalculatorsPage() {
  const calculators = getUniqueDirectoryCalculators();

  return (
    <div className="container mx-auto space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">Calculators</span>
      </nav>

      <section className="rounded-xl border bg-card p-6">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Calculator className="h-7 w-7" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">Calculator Directory</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Search every live CalciPro tool, browse production category pages, and jump into calculator pages from one organized directory.
        </p>
        <Link href="#all-calculators" className="mt-5 inline-flex items-center text-sm font-bold text-primary">
          Browse all calculators <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>

      <CategoryHub />

      <section id="all-calculators" className="space-y-5">
        <div>
          <h2 className="text-2xl font-black tracking-tight">All calculators</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use search and filters to find calculators by name, description, keyword, category, or subcategory.
          </p>
        </div>
        <DirectoryCalculatorGrid calculators={calculators} showFilters />
      </section>
    </div>
  );
}
