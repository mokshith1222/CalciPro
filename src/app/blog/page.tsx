import { constructMetadata } from "@/seo/seo-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Financial & Health Guides - CalcVerse Blog",
  description: "Learn how to manage your finances, understand health metrics, and use our calculators effectively.",
});

const posts = [
  {
    title: "How to Save Your First $10,000 using SIP",
    slug: "save-first-10000-sip",
    excerpt: "Systematic Investment Plans are the most powerful tool for wealth creation. Learn the step-by-step strategy...",
    date: "May 10, 2026",
    readTime: "5 min",
    category: "Finance",
  },
  {
    title: "Understanding BMI: More Than Just a Number",
    slug: "understanding-bmi-guide",
    excerpt: "Why Body Mass Index is a starting point for health, and what other metrics you should track for a holistic view...",
    date: "May 12, 2026",
    readTime: "4 min",
    category: "Health",
  },
  {
    title: "The Power of Compounding: Albert Einstein's 8th Wonder",
    slug: "power-of-compounding-guide",
    excerpt: "See how starting just 5 years earlier can double your retirement nest egg through the magic of compound interest...",
    date: "May 14, 2026",
    readTime: "7 min",
    category: "Finance",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">The CalcVerse Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Insights, guides, and tips to help you make smarter decisions with your money and health.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col h-full group hover:shadow-xl transition-all border-none bg-muted/30">
            <div className="h-48 bg-zinc-800 rounded-t-3xl" />
            <CardHeader>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-2">
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>
              <CardTitle className="text-2xl group-hover:text-primary transition-colors leading-tight">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-muted-foreground mb-6 line-clamp-3">{post.excerpt}</p>
              <Button variant="link" className="p-0 h-auto font-bold group-hover:translate-x-1 transition-transform" asChild>
                <Link href={`/blog/${post.slug}`}>Read Article <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
