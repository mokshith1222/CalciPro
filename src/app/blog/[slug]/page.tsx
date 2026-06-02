import { constructMetadata } from "@/seo/seo-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

// This would ideally come from a CMS or local markdown files
const posts = {
  "save-first-10000-sip": {
    title: "How to Save Your First $10,000 using SIP",
    date: "May 10, 2026",
    readTime: "5 min",
    category: "Finance",
    author: "CalcVerse Team",
    content: `
      <p>Saving money is often seen as a chore, but what if you could automate it? That's exactly what a Systematic Investment Plan (SIP) does. In this guide, we'll show you how to hit your first $10,000 milestone without breaking a sweat.</p>
      
      <h2>1. The Psychology of Automation</h2>
      <p>The biggest hurdle to saving is human willpower. SIP removes the decision-making process. By setting up a monthly transfer, you treat your savings like a utility bill—non-negotiable and automatic.</p>
      
      <h2>2. The Power of Small Numbers</h2>
      <p>You don't need $1,000 a month to start. Even $200 a month, compounded at a 12% annual return, can reach $10,000 in less than 4 years. The key is persistence, not the initial amount.</p>
      
      <h2>3. Choosing the Right Calculator</h2>
      <p>Before you start, use our SIP Calculator to project your wealth. Visualizing the "future you" with $10,000 is a powerful motivator.</p>
      
      <h2>Conclusion</h2>
      <p>The best time to start was yesterday. The second best time is today. Use our tools, set your goal, and let compounding do the heavy lifting.</p>
    `,
  },
  "understanding-bmi-guide": {
    title: "Understanding BMI: More Than Just a Number",
    date: "May 12, 2026",
    readTime: "4 min",
    category: "Health",
    author: "Dr. Health",
    content: `
      <p>Body Mass Index (BMI) is a widely used screening tool for weight categories. But what does it really tell you about your health?</p>
      
      <h2>What is BMI?</h2>
      <p>BMI is a simple calculation using a person's height and weight. The formula is BMI = kg/m². It's used to categorize people into underweight, healthy weight, overweight, and obesity.</p>
      
      <h2>The Limitations</h2>
      <p>While useful, BMI doesn't account for muscle mass, bone density, or overall body composition. An athlete might have a high BMI due to muscle but be perfectly healthy.</p>
      
      <h2>Using Our BMI Calculator</h2>
      <p>Our calculator provides your score instantly and shows you where you land on the WHO classification scale. Remember to consult a professional for a full health assessment.</p>
    `,
  },
  "power-of-compounding-guide": {
    title: "The Power of Compounding: Albert Einstein's 8th Wonder",
    date: "May 14, 2026",
    readTime: "7 min",
    category: "Finance",
    author: "Finance Expert",
    content: `
      <p>Albert Einstein reportedly called compound interest the "eighth wonder of the world." Those who understand it, earn it; those who don't, pay it.</p>
      
      <h2>How It Works</h2>
      <p>Compounding is the process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes.</p>
      
      <h2>The Time Factor</h2>
      <p>The most important ingredient in compounding isn't money—it's time. Small amounts invested early often outperform large amounts invested late.</p>
      
      <h2>Try the Math</h2>
      <p>Head over to our Compound Interest Calculator to see how a one-time investment grows over 30 years. You'll be surprised at how the last 5 years contribute the most growth.</p>
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];
  
  if (!post) return {};

  return constructMetadata({
    title: post.title,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

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
