import Link from "next/link";
import { Calculator, Star } from "lucide-react";

type CalculatorCardProps = {
  name: string;
  href: string;
  description?: string;
  featured?: boolean;
};

export function CalculatorCard({ name, href, description = "Professional calculator tool.", featured = false }: CalculatorCardProps) {
  return (
    <Link href={href} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:text-primary">
          <Calculator className="h-5 w-5" />
        </div>
        {featured ? <Star className="h-4 w-4 fill-primary text-primary" /> : null}
      </div>
      <h3 className="mt-4 font-bold group-hover:text-primary">{name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </Link>
  );
}
