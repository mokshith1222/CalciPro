import { AtSign, MessageSquare, Send } from "lucide-react";
import { constructMetadata } from "@/seo/seo-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/contact",
  title: "Contact Us",
  description: "Get in touch with the CalciPro team for support, feedback, or calculator requests.",
});

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-cyan-500">Get in Touch</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white mb-6">Contact CalciPro</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a question about a formula? Want to request a custom calculator? Or just want to say hi? We'd love to hear from you.
          </p>

          <div className="mt-12 space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <AtSign className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <p className="font-bold text-white">Email Us</p>
                <p className="text-muted-foreground">contact@calcipro.app</p>
                <p className="text-xs text-zinc-500 mt-1">We typically respond within 24-48 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <MessageSquare className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="font-bold text-white">Feedback</p>
                <p className="text-muted-foreground">Request a new tool or report a bug.</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="glass-card border-none shadow-2xl p-2">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">Name</Label>
              <Input id="name" placeholder="John Doe" className="bg-white/5 border-white/10 h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-zinc-300">Subject</Label>
              <Input id="subject" placeholder="Calculator Request" className="bg-white/5 border-white/10 h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-zinc-300">Message</Label>
              <textarea 
                id="message" 
                rows={4} 
                className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="How can we help you?"
              />
            </div>
            <Button className="w-full h-14 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg gap-2">
              <Send className="h-5 w-5" /> SEND MESSAGE
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
