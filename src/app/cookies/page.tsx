import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  title: "Cookie Policy",
  description: "How CalcVerse uses browser storage and cookies.",
});

export default function CookiesPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Cookies</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Cookie Policy</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>CalcVerse uses browser storage for preferences such as theme, favorites, recent tools, and calculation history.</p>
        <p>The current app does not require account cookies to use calculators. If analytics or account features are added later, this page should be updated to describe them clearly.</p>
      </div>
    </main>
  );
}
