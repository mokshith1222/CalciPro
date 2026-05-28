import Link from "next/link";
import { Calculator, Globe, MessageCircle, Link2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">CalcVerse</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Smart Calculators for Everyday Life. Finance, Education, Health, Technology, and Daily Utility Calculators in One Place.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Link2 className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/calculators/finance" className="hover:text-primary">Finance</Link></li>
              <li><Link href="/calculators/education" className="hover:text-primary">Education</Link></li>
              <li><Link href="/calculators/health" className="hover:text-primary">Health</Link></li>
              <li><Link href="/calculators/tech" className="hover:text-primary">Technology</Link></li>
              <li><Link href="/calculators/utility" className="hover:text-primary">Daily Utility</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CalcVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
