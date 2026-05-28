import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  title: "Privacy Policy",
  description: "CalcVerse privacy policy and local data usage information.",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Privacy</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Privacy Policy</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>CalcVerse is designed to run calculations in your browser. Calculator inputs are not submitted to a server by default.</p>
        <p>The site may store favorites, recent tools, and calculation history in your browser local storage so the experience feels useful when you return.</p>
        <p>You can clear this data at any time from your browser settings. Do not enter highly sensitive personal information into calculators unless you are comfortable keeping it in your browser history.</p>
      </div>
    </main>
  );
}
