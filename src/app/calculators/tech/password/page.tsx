import { FAQSection } from "@/components/platform/FAQSection";
import { constructMetadata } from "@/seo/seo-utils";
import { PasswordGen } from "@/components/calculators/tech/PasswordGen";
import { generateCalculatorSchema } from "@/seo/structured-data";
import { Info, Shield } from "lucide-react";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculators/tech/password",
  title: "Secure Password Generator - Random & Strong Passwords",
  description: "Create highly secure random passwords with our professional generator. Choose length, symbols, numbers, and case sensitivity.",
});

export default function PasswordPage() {
  const schema = generateCalculatorSchema({
    name: "Password Generator",
    description: "Generate secure random passwords.",
    url: "https://calcipro-phi.vercel.app/calculators/tech/password"
  });

  return (
    <div className="py-4 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Password Generator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Generate strong, random passwords to keep your online accounts secure. Customizable length and character sets.
        </p>
      </div>

      <PasswordGen />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-500" />
            Why use a Password Generator?
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>Using a random password generator ensures your passwords are:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Unpredictable:</strong> Impossible for humans or algorithms to guess.</li>
              <li><strong>Unique:</strong> Different for every account you own.</li>
              <li><strong>Complex:</strong> Meets all security requirements of modern platforms.</li>
              <li><strong>High Entropy:</strong> Maximize the effort required for brute-force attacks.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-purple-500" />
            Security Tips
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm">Don't Reuse Passwords</p>
              <p className="text-xs text-muted-foreground">If one account is breached, all other accounts using the same password are at risk.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm">Use a Password Manager</p>
              <p className="text-xs text-muted-foreground">Store your generated passwords in a secure vault like Bitwarden or 1Password.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border">
              <p className="font-bold mb-1 text-sm">Enable 2FA</p>
              <p className="text-xs text-muted-foreground">Always use Two-Factor Authentication for an extra layer of security.</p>
            </div>
          </div>
        </div>
      </div>
      <FAQSection pathname="/calculators/tech/password" />
    </div>
  );
}
