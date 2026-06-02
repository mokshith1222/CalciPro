import { constructMetadata } from "@/seo/seo-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/content/blog-posts";

export const metadata = constructMetadata({
  title: "Financial & Health Guides - CalcVerse Blog",
  description: "Learn how to manage your finances, understand health metrics, and use our calculators effectively.",
});

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-20 text-center space-y-4">
        <p className="text-cyan-500 font-black uppercase tracking-widest text-sm">Knowledge Hub</p>
        <h1 className="text-5xl md:text-7xl font-black text-white">The CalcVerse Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Deep dives into financial planning, health optimization, and mathematical models to help you make data-driven decisions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="glass-card border-none h-full shadow-xl transition-all hover:scale-[1.02] active:scale-95 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 relative group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-colors" />
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded">
                    {post.category}
                  </span>
                </div>
                <CardTitle className="text-2xl font-black group-hover:text-cyan-400 transition-colors leading-tight">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-cyan-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-24 p-12 glass-card rounded-3xl border-none relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
        <h2 className="text-3xl font-black mb-4">Stay Calculated</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          We regularly release new calculators and guides. Subscribe to our newsletter to receive the latest updates directly in your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input placeholder="Enter your email" className="bg-white/5 border-white/10 h-12" />
          <Button className="bg-white text-black font-black px-8 h-12 hover:bg-zinc-200">
            SUBSCRIBE
          </Button>
        </div>
      </div>
    </div>
  );
}
