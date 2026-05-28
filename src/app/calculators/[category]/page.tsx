import { constructMetadata } from "@/seo/seo-utils";
import Link from "next/link";
import { calculatorCategories } from "@/lib/calculators-registry";
import { Calculator, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Calculator Categories",
  description: "Browse our wide range of calculators in Finance, Health, Education, and Technology.",
});

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = calculatorCategories.find(c => c.id === categorySlug) || { name: categorySlug, icon: Calculator, color: "text-primary", bg: "bg-primary/10", tools: [] };
  
  const tools = category.tools.map(t => ({ 
    ...t, 
    href: `/calculators/${categorySlug}/${t.slug}`,
    description: t.description || "Professional calculator tool."
  }));

  return (
    <div className="py-4">
      <div className="mb-12">
        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl ${category.bg} ${category.color} mb-6`}>
          <category.icon className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4 capitalize">{category.name} Calculators</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Everything you need to calculate for {category.name}. From basic tools to advanced professional engines.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {tools.length > 0 ? (
          tools.map((tool) => (
            <Link 
              key={tool.href} 
              href={tool.href} 
              className="group flex items-center justify-between p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Calculator className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                </div>
                <p className="font-bold text-lg group-hover:text-primary transition-colors">{tool.name}</p>
              </div>
              <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
            </Link>
          ))
        ) : (
          <div className="col-span-full p-12 text-center rounded-3xl border border-dashed text-muted-foreground">
            No specific tools available in this category yet. We're working on it!
          </div>
        )}
      </div>
    </div>
  );
}
