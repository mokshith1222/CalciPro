import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedProps {
  relatedTools: Array<{ name: string; href: string; category: string }>;
}

const COLORS: Record<string, string> = {
  finance: "bg-blue-100 text-blue-700",
  health: "bg-green-100 text-green-700",
  education: "bg-yellow-100 text-yellow-700",
  tech: "bg-purple-100 text-purple-700",
  utility: "bg-orange-100 text-orange-700",
};

export function RelatedCalculators({ relatedTools }: RelatedProps) {
  return (
    <section className="mt-20 border-t border-zinc-800 pt-12">
      <h3 className="text-2xl font-black mb-8">You might also like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="hover:border-primary transition-all group cursor-pointer bg-zinc-950">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <span className={cn("text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-2 inline-block", COLORS[tool.category])}>
                    {tool.category}
                  </span>
                  <p className="font-bold text-lg group-hover:text-primary transition-colors">{tool.name}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}