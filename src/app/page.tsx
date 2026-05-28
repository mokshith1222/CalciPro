import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculatorCategories, getAllTools } from "@/lib/calculators-registry";

const stats = [
  { label: "Working tools", value: "18+" },
  { label: "Categories", value: "5" },
  { label: "Local history", value: "50" },
];

const workflow = [
  {
    icon: Search,
    title: "Find a calculator",
    text: "Search by name or browse by finance, health, education, tech, and utility categories.",
  },
  {
    icon: Calculator,
    title: "Enter your numbers",
    text: "Use focused forms, sliders, selectors, and instant validation made for repeat use.",
  },
  {
    icon: BarChart3,
    title: "Read clear results",
    text: "Get totals, breakdowns, charts, and saved history where each calculator supports it.",
  },
];

export default function Home() {
  const allTools = getAllTools();
  const featuredTools = allTools.slice(0, 6);
  const totalTools = allTools.length;

  return (
    <div className="pb-20">
      <section className="border-b bg-muted/25">
        <div className="container mx-auto grid min-h-[calc(100vh-4rem)] items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Fast calculators for everyday decisions
            </div>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              CalcVerse
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A polished all-in-one calculator website for money, study, fitness, coding, and quick daily math. Every visible tool is ready to use.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-lg px-6 font-bold">
                <Link href="#categories">
                  Browse calculators <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-lg px-6 font-bold">
                <Link href="/calculators/finance/sip">Open SIP calculator</Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-lg border bg-background p-4">
                  <div className="text-2xl font-black">{item.value}</div>
                  <div className="mt-1 text-xs font-semibold text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-background p-4 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Live tool board</p>
                <h2 className="mt-1 text-xl font-black">Popular calculators</h2>
              </div>
              <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                <Calculator className="h-6 w-6" />
              </div>
            </div>
            <div className="grid gap-3 py-4">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:border-primary hover:bg-muted/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Calculator className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold group-hover:text-primary">{tool.name}</p>
                    <p className="text-xs capitalize text-muted-foreground">{tool.category}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 border-t pt-4 text-center">
              <div className="rounded-lg bg-muted p-3">
                <Clock3 className="mx-auto h-5 w-5" />
                <p className="mt-2 text-xs font-bold">Quick</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <ShieldCheck className="mx-auto h-5 w-5" />
                <p className="mt-2 text-xs font-bold">Private</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <TrendingUp className="mx-auto h-5 w-5" />
                <p className="mt-2 text-xs font-bold">Useful</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Calculator library</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Choose a category</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {totalTools} working tools are grouped by task, with category pages, search, and calculator history built into the site shell.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {calculatorCategories.map((category) => (
            <Link
              key={category.id}
              href={`/calculators/${category.id}`}
              className="group rounded-lg border bg-card p-5 transition-colors hover:border-primary"
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${category.bg} ${category.color}`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black">{category.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{category.tools.length} tools</p>
              <div className="mt-5 space-y-2">
                {category.tools.slice(0, 3).map((tool) => (
                  <div key={tool.slug} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="truncate">{tool.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center text-sm font-bold text-primary">
                Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/25">
        <div className="container mx-auto grid gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {workflow.map((item) => (
            <div key={item.title} className="rounded-lg border bg-background p-6">
              <item.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-5 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Start here</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Tools people use most</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Jump straight into practical calculators for investment planning, loans, tax, body metrics, grades, conversions, and secure passwords.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {allTools.slice(0, 10).map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary hover:bg-muted/30"
            >
              <HeartPulse className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{tool.name}</p>
                <p className="text-xs capitalize text-muted-foreground">{tool.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
