import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { directoryCategories, getCalculatorsForCategory } from "@/lib/calculator-directory";

export function CategoryHub() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="CalciPro category hubs">
      {directoryCategories.map((category) => {
        const count = getCalculatorsForCategory(category.slug).length;

        return (
        <article key={category.slug} className="group relative rounded-xl border bg-card p-5 transition-colors hover:border-primary/60">
          <div className="flex items-start justify-between gap-4">
            <Link href={`/category/${category.slug}`} className="text-lg font-bold text-primary after:absolute after:inset-0">
              {category.name}
            </Link>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              {count}+ tools
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {category.subcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                href={`/category/${category.slug}/${subcategory.slug}`}
                className="relative z-10 rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex items-center text-xs font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Open category <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </div>
        </article>
        );
      })}
    </section>
  );
}
