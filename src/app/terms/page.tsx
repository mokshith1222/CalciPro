import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  title: "Terms of Service",
  description: "Terms for using CalcVerse calculators and website content.",
});

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Terms</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Terms of Service</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>CalcVerse provides calculators and informational results for general use. Results should be reviewed before making financial, medical, legal, or academic decisions.</p>
        <p>Formulas are implemented carefully, but the website is provided without a guarantee that every result is suitable for every situation.</p>
        <p>By using the site, you agree to use the calculators responsibly and verify important outcomes with qualified professionals when needed.</p>
      </div>
    </main>
  );
}
