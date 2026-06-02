"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  createBreadcrumbSchema,
  createCalculatorSchema,
  createFaqSchema,
  generateCalculatorFaqs,
  getCalculatorName,
  getRelatedTools,
} from "@/lib/platform-features";

export function FAQSection({ pathname }: { pathname: string }) {
  const name = getCalculatorName(pathname);
  const faqs = generateCalculatorFaqs(name);
  const relatedTools = getRelatedTools(pathname);
  const absoluteUrl = `https://calcverse.com${pathname}`;

  return (
    <section className="mt-12 space-y-8" aria-labelledby="calculator-faq-title">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Help Center</p>
        <h2 id="calculator-faq-title" className="mt-2 text-3xl font-black tracking-tight">
          {name} FAQs
        </h2>
      </div>

      <div className="grid gap-3">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            className="group rounded-xl border bg-card p-4 transition-colors open:border-primary/40 open:bg-muted/30"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {faq.question}
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-lg font-bold">Related calculators</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-lg border bg-background p-3 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqSchema(name, faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createCalculatorSchema(name, absoluteUrl)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createBreadcrumbSchema(name, pathname)) }}
      />
    </section>
  );
}
