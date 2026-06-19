import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <Calculator className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-6xl font-black mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-10 text-lg">
        Oops! It looks like our math was a bit off. The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="rounded-full px-8 h-12" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Link>
        </Button>
        <Button className="rounded-full px-8 h-12" asChild>
          <Link href="/#categories">
            Browse Calculators
          </Link>
        </Button>
      </div>
    </div>
  );
}
