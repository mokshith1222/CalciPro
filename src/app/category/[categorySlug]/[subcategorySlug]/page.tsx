import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calculator, ChevronRight } from "lucide-react";
import {
  directoryCategories,
  getCalculatorsForSubcategory,
  getDirectoryCategory,
  getDirectorySubcategory,
} from "@/lib/calculator-directory";
import { DirectoryCalculatorGrid } from "@/components/directory/DirectoryCalculatorGrid";
import { constructMetadata } from "@/seo/seo-utils";

type SubcategoryPageProps = {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
};

export function generateStaticParams() {
  return directoryCategories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      categorySlug: category.slug,
      subcategorySlug: subcategory.slug,
    }))
  );
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = await params;
  const category = getDirectoryCategory(categorySlug);
  const subcategory = getDirectorySubcategory(categorySlug, subcategorySlug);

  if (!category || !subcategory) {
    return constructMetadata({ title: "Subcategory Not Found" });
  }

  return constructMetadata({
    title: `${subcategory.name} Calculators - CalcVerse`,
    description: subcategory.description,
    canonical: `https://calcverse.com/category/${category.slug}/${subcategory.slug}`,
  });
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params;
  const category = getDirectoryCategory(categorySlug);
  const subcategory = getDirectorySubcategory(categorySlug, subcategorySlug);

  if (!category || !subcategory) {
    notFound();
  }

  const calculators = getCalculatorsForSubcategory(category.slug, subcategory.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${subcategory.name} Calculators`,
    description: subcategory.description,
    url: `https://calcverse.com/category/${category.slug}/${subcategory.slug}`,
  };

  return (
    <div className="container mx-auto space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/category/${category.slug}`} className="hover:text-primary">{category.name}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{subcategory.name}</span>
      </nav>

      <section className="rounded-xl border bg-card p-6">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Calculator className="h-7 w-7" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">{subcategory.name}</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">{subcategory.description}</p>
        <p className="mt-5 text-sm font-semibold text-muted-foreground">{calculators.length} calculators</p>
      </section>

      <DirectoryCalculatorGrid calculators={calculators} showFilters />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
