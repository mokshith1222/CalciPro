import { constructMetadata } from "@/seo/seo-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPostMap } from "@/content/blog-posts";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostMap[slug];
  
  if (!post) return {};

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostMap[slug];

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-20">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Button>
      </Link>

      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
          <span className="bg-cyan-500/10 text-cyan-500 px-3 py-1 rounded-full">{post.category}</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {post.readTime}
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-black">{post.title}</h1>
        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-white">
            {post.author[0]}
          </div>
          <div>
            <p className="font-bold text-sm">{post.author}</p>
            <p className="text-xs text-muted-foreground">Expert Contributor</p>
          </div>
        </div>
      </div>

      <div 
        className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:text-white prose-p:text-zinc-400 prose-strong:text-cyan-400 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-20 p-8 glass-card rounded-3xl border-none flex flex-col items-center text-center gap-6">
        <h3 className="text-2xl font-black">Ready to do the math?</h3>
        <p className="text-muted-foreground">Put these insights into action with our professional-grade calculators.</p>
        <Link href="/calculators">
          <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-8 h-12 rounded-xl">
            EXPLORE CALCULATORS
          </Button>
        </Link>
      </div>
    </article>
  );
}
