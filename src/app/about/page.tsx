import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/about",
  title: "About",
  description: "Learn about CalciPro, an independent calculator website built for fast, practical, privacy-conscious everyday calculations.",
});

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">About the Project</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">The Mission Behind CalciPro</h1>
      
      <div className="mt-10 space-y-8 leading-7 text-muted-foreground text-lg">
        <p>
          CalciPro is an independent calculator hub built for people who need quick, understandable answers without digging through cluttered pages. The goal is simple: make practical calculations for finance, education, health, technology, real estate, and daily utilities easier to find, easier to use, and easier to trust.
        </p>
        <p>
          The project is maintained with a focus on clear formulas, readable results, and browser-first workflows. Most tools run directly in your browser, so common calculations can be completed quickly while keeping your inputs private.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="p-6 glass-card rounded-2xl border-none">
            <h3 className="text-xl font-black text-white mb-2">Practical Accuracy</h3>
            <p className="text-sm">We use established formulas and plain-language result breakdowns so each calculator is useful for planning, comparison, and learning.</p>
          </div>
          <div className="p-6 glass-card rounded-2xl border-none">
            <h3 className="text-xl font-black text-white mb-2">Browser-First</h3>
            <p className="text-sm">Your privacy matters. CalciPro is designed to help process numbers without requiring unnecessary accounts or personal details.</p>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">Why CalciPro Exists</h2>
          <p>
            Everyday decisions often come down to numbers: loan payments, savings goals, calorie targets, grade percentages, date differences, unit conversions, and more. CalciPro brings those tools into one consistent experience so users can move from question to answer without switching between many unrelated sites.
          </p>
          <p>
            The long-term mission is to keep expanding the calculator library and the written guides around it, especially for topics where a quick result is more useful when paired with a clear explanation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">How We Build</h2>
          <p>
            CalciPro is built with <span className="text-cyan-400">Next.js</span> and <span className="text-purple-400">React</span>, with attention to performance, responsive layouts, searchability, and accessible content structure. We keep calculator pages focused on the task so results are easy to scan on both desktop and mobile.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">Contact and Feedback</h2>
          <p>
            Suggestions, corrections, and partnership questions are welcome. For more information, contact the CalciPro team at <a className="text-cyan-400 underline-offset-4 hover:underline" href="mailto:mokshithnaik932@gmail.com">mokshithnaik932@gmail.com</a>.
          </p>
          <p>
            If you notice a formula that needs review or a calculator topic that should be added, please include the calculator name, the expected result, and the context where you found the issue.
          </p>
        </section>

        <section className="space-y-4 pt-8 border-t border-white/10">
          <p className="italic text-sm">
            CalciPro is an independent project dedicated to providing free, high-quality tools and original guides for users worldwide.
          </p>
        </section>
      </div>
    </main>
  );
}
