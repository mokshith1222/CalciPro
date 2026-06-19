import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="CalciPro logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-md object-cover"
              />
              <span className="text-xl font-bold tracking-tight text-white neon-text">CalciPro</span>
            </Link>
            <p className="text-sm text-zinc-500 mb-4">
              Smart Calculators for Everyday Life. Finance, Education, Health, Technology, and Daily Utility Calculators in One Place.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/finance-business" className="hover:text-primary">Finance, Taxes & Business</Link></li>
              <li><Link href="/category/science-math-education" className="hover:text-primary">Science, Math & Education</Link></li>
              <li><Link href="/category/health-lifestyle-family" className="hover:text-primary">Health & Lifestyle</Link></li>
              <li><Link href="/category/real-estate-trade-tech" className="hover:text-primary">Real Estate & Tech</Link></li>
              <li><Link href="/category/utilities-legal-text-tools" className="hover:text-primary">Utilities & Legal</Link></li>
              <li><Link href="/category/transport-media-entertainment" className="hover:text-primary">Transport & Media</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/calculators/finance/sip" className="hover:text-primary">SIP Calculator</Link></li>
              <li><Link href="/calculators/finance/emi" className="hover:text-primary">EMI Calculator</Link></li>
              <li><Link href="/calculators/health/bmi" className="hover:text-primary">BMI Calculator</Link></li>
              <li><Link href="/calculators/education/gpa" className="hover:text-primary">GPA Calculator</Link></li>
              <li><Link href="/calculators/education/scientific" className="hover:text-primary">Scientific Calculator</Link></li>
              <li><Link href="/calculators/utility/percentage" className="hover:text-primary">Percentage Calculator</Link></li>
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
          <p>© {new Date().getFullYear()} CalciPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
