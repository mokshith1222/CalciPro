import { getAllTools } from "@/lib/calculators-registry";

export type CalculatorFaq = {
  question: string;
  answer: string;
};

export type InterfaceTheme = {
  id: string;
  name: string;
  mode: "auto" | "light" | "dark";
  description: string;
  reactorMode: "default" | "wave" | "circle" | "parabolic" | "logarithmic" | "orbital" | "crystal";
};

export const interfaceThemes: InterfaceTheme[] = [
  { id: "calciverse-pro", name: "CalciVerse Pro", mode: "auto", description: "Clean professional UI", reactorMode: "default" },
  { id: "prism-glass", name: "Prism Glass", mode: "auto", description: "Glassmorphism premium UI", reactorMode: "wave" },
  { id: "sketchpad", name: "Sketchpad", mode: "auto", description: "Notebook inspired style", reactorMode: "logarithmic" },
  { id: "neon-night", name: "Neon Night", mode: "dark", description: "Futuristic neon dark theme", reactorMode: "orbital" },
  { id: "daydream", name: "Daydream", mode: "light", description: "Soft pastel interface", reactorMode: "parabolic" },
  { id: "focus", name: "Focus", mode: "dark", description: "Minimal distraction-free design", reactorMode: "circle" },
  { id: "oled-void", name: "OLED Void", mode: "dark", description: "AMOLED pure black", reactorMode: "default" },
  { id: "matrix", name: "The Matrix", mode: "dark", description: "Green cyber terminal aesthetic", reactorMode: "crystal" },
];

export const platformCategoryHubs = [
  {
    name: "Finance, Taxes & Business",
    groups: ["Finance & Money", "Business & Finance Tools", "Personal Finance & Taxes", "Marketing & Social Media", "Shopping & E-commerce"],
    capacity: 127,
  },
  {
    name: "Health, Lifestyle & Family",
    groups: ["Health & Fitness", "Nutrition & Food", "Parenting & Family", "Beauty, Fashion & Lifestyle", "Sports & Recreation"],
    capacity: 66,
  },
  {
    name: "Real Estate, Trade & Tech",
    groups: ["Home, DIY & Real Estate", "Construction, Engineering & Trades", "Tech, Dev & Data", "Energy & Utilities"],
    capacity: 97,
  },
  {
    name: "Science, Math & Education",
    groups: ["Science & Math", "Education & Study Tools", "Environment & Agriculture"],
    capacity: 88,
  },
  {
    name: "Transport, Media & Entertainment",
    groups: ["Automotive & Transportation", "Travel & Transport", "Photography & Media", "Music & Audio", "Gaming & Gamification"],
    capacity: 85,
  },
  {
    name: "Utilities, Legal & Text Tools",
    groups: ["Utility / Admin", "Conversions & Utilities", "Language & Writing Tools", "Law, Dates & Legal Tools", "Events & Planning", "Misc & Fun / Niche Ideas"],
    capacity: 138,
  },
];

export function getCalculatorByPath(pathname: string) {
  return getAllTools().find((tool) => pathname === tool.href);
}

export function getCalculatorName(pathname: string) {
  const tool = getCalculatorByPath(pathname);
  if (tool) {
    return tool.name;
  }

  const slug = pathname.split("/").filter(Boolean).pop() || "Calculator";
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function isCalculatorToolPath(pathname: string) {
  return pathname.split("/").filter(Boolean).length >= 3 && pathname.startsWith("/calculators/");
}

export function isCalculatorPagePath(pathname: string) {
  return pathname === "/calculators" || pathname.startsWith("/calculators/");
}

export function getRelatedTools(pathname: string) {
  const current = getCalculatorByPath(pathname);
  const tools = getAllTools();

  if (!current) {
    return tools.slice(0, 6);
  }

  return tools
    .filter((tool) => tool.href !== current.href)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, 6);
}

export function generateCalculatorFaqs(name: string): CalculatorFaq[] {
  return [
    {
      question: `What does the ${name} do?`,
      answer: `The ${name} helps you convert inputs into a clear result using the relevant calculator logic, labels, and summaries for that topic.`,
    },
    {
      question: `How do I use the ${name}?`,
      answer: "Enter the required values, review any optional fields, and read the calculated output. Update any input to compare scenarios quickly.",
    },
    {
      question: "What inputs are required?",
      answer: "Required inputs depend on the calculator, but each tool is designed around the minimum values needed to produce a meaningful result.",
    },
    {
      question: "How accurate are the results?",
      answer: "Results are calculated from the values you provide and are intended for planning, estimation, and comparison. Professional decisions may require expert review.",
    },
    {
      question: "What formula does this calculator use?",
      answer: "The calculator uses the standard formula for its topic and formats the output for readability. Where multiple formulas apply, the tool uses the common consumer planning method.",
    },
    {
      question: "What are common mistakes to avoid?",
      answer: "Check units, rates, time periods, percentages, and whether values should be entered monthly, yearly, before tax, or after tax.",
    },
    {
      question: "How should I interpret the result?",
      answer: "Use the result as a decision aid. Compare it with alternate scenarios, save useful versions, and share or export the result when you need a record.",
    },
    {
      question: "Can I save or share this calculation?",
      answer: "Yes. Use the global toolbar to save scenarios, copy a shareable link, export an image, generate a report, or create an embed snippet.",
    },
    {
      question: "Can this calculator be embedded on another website?",
      answer: "Yes. The Embed action generates iframe code for the current calculator page so it can be placed in another site or dashboard.",
    },
    {
      question: "Which related calculators should I try next?",
      answer: "Related calculators are suggested from the same category first, then from popular tools across CalciPro.",
    },
  ];
}

export function createFaqSchema(name: string, faqs: CalculatorFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createCalculatorSchema(name: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function createBreadcrumbSchema(name: string, pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const items = [
    { name: "Home", item: "https://calcverse.com/" },
    ...parts.map((part, index) => ({
      name: part
        .split("-")
        .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
        .join(" "),
      item: `https://calcverse.com/${parts.slice(0, index + 1).join("/")}`,
    })),
  ];

  if (items[items.length - 1]?.name !== name) {
    items[items.length - 1] = {
      ...items[items.length - 1],
      name,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
