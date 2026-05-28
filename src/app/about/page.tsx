import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  title: "About CalcVerse",
  description: "Learn about CalcVerse, an all-in-one calculator website for practical everyday calculations.",
});

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">About</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Built for useful calculations</h1>
      <p className="mt-6 leading-7 text-muted-foreground">
        CalcVerse brings finance, health, education, technology, and utility calculators into one fast website. The goal is simple: make common calculations easier to run, understand, and revisit.
      </p>
      <p className="mt-4 leading-7 text-muted-foreground">
        The site keeps the interface focused on the task at hand, with searchable tools, organized categories, responsive layouts, and local calculation history where supported.
      </p>
    </main>
  );
}
