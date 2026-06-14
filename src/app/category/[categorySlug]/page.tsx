import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Layers3 } from "lucide-react";
import {
  directoryCategories,
  getCalculatorsForCategory,
  getDirectoryCategory,
  uniqueDirectoryCalculators,
} from "@/lib/calculator-directory";
import { DirectoryCalculatorGrid } from "@/components/directory/DirectoryCalculatorGrid";
import { constructMetadata, siteConfig } from "@/seo/seo-utils";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateStaticParams() {
  return directoryCategories.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getDirectoryCategory(categorySlug);

  if (!category) {
    return constructMetadata({ title: "Category Not Found" });
  }

  return constructMetadata({
    title: `${category.name} Calculators`,
    description: category.description,
    canonical: `${siteConfig.url}/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getDirectoryCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const calculators = getCalculatorsForCategory(category.slug);
  const uniqueCalculators = uniqueDirectoryCalculators(calculators);

  return (
    <div className="container py-10 px-4 mx-auto">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">Directory</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      <header className="mb-12 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Layers3 className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">{category.name}</h1>
        </div>
        <p className="max-w-3xl text-lg text-muted-foreground">
          {category.description}
        </p>
      </header>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Available Calculators</h2>
          <div className="text-sm text-muted-foreground font-medium">
            Showing {uniqueCalculators.length} tools
          </div>
        </div>
        
        <div className="rounded-3xl border border-white/5 bg-black/20 p-6 backdrop-blur-md">
           <DirectoryCalculatorGrid calculators={uniqueCalculators} showFilters />
        </div>
      </section>
    </div>
  );
}
