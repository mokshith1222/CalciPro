import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  title: "About CalcVerse",
  description: "Learn about CalcVerse, an all-in-one calculator website for practical everyday calculations.",
});

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">About the Project</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">The Mission Behind CalcVerse</h1>
      
      <div className="mt-10 space-y-8 leading-7 text-muted-foreground text-lg">
        <p>
          CalcVerse was born out of a simple frustration: the internet is full of calculators, but most of them are buried in slow, ad-cluttered websites with outdated designs. Our mission is to provide a <span className="text-white font-bold">fast, futuristic, and focused</span> calculation platform that respects your time and your data.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="p-6 glass-card rounded-2xl border-none">
            <h3 className="text-xl font-black text-white mb-2">High Precision</h3>
            <p className="text-sm">We use verified formulas and standard financial/scientific protocols to ensure your results are accurate and reliable for everyday planning.</p>
          </div>
          <div className="p-6 glass-card rounded-2xl border-none">
            <h3 className="text-xl font-black text-white mb-2">Browser-First</h3>
            <p className="text-sm">Your privacy matters. Unlike many sites, your inputs stay in your browser. We don't harvest your data—we just help you process it.</p>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">Why "CalcVerse"?</h2>
          <p>
            The world is driven by numbers. From the interest on your home loan to the calories in your breakfast and the probability of your next business venture—everything is a calculation. We wanted to build a "universe" (Verse) where all these mathematical tools coexist in a seamless, high-performance ecosystem.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white">Our Technology</h2>
          <p>
            Built using <span className="text-cyan-400">Next.js 15</span> and <span className="text-purple-400">React 19</span>, CalcVerse leverages the latest in web performance. Our background reactor is powered by <span className="text-white">Three.js</span>, representing the "Mathematical Reactor" where logic meets visual elegance.
          </p>
        </section>

        <section className="space-y-4 pt-8 border-t border-white/10">
          <p className="italic text-sm">
            CalcVerse is an independent project dedicated to providing free, high-quality tools to users worldwide. We appreciate your support and feedback.
          </p>
        </section>
      </div>
    </main>
  );
}
