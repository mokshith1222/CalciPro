import Link from "next/link";
import { Mail } from "lucide-react";
import { constructMetadata } from "@/seo/seo-utils";
import { Button } from "@/components/ui/button";

export const metadata = constructMetadata({
  title: "Contact CalcVerse",
  description: "Contact CalcVerse for feedback, calculator requests, and support.",
});

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Contact</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Send feedback or request a calculator</h1>
      <p className="mt-6 leading-7 text-muted-foreground">
        Have an idea for a calculator or noticed something that needs attention? Send a message and include the calculator name, inputs used, and expected result if you are reporting a formula issue.
      </p>
      <Button asChild className="mt-8 rounded-lg">
        <Link href="mailto:support@calcverse.example">
          <Mail className="mr-2 h-4 w-4" />
          Email support
        </Link>
      </Button>
    </main>
  );
}
