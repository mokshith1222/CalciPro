import { Wallet, Activity, GraduationCap, Laptop, Percent } from "lucide-react";

export const calculatorCategories = [
  {
    id: "finance",
    name: "Finance",
    icon: Wallet,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    tools: [
      { name: "Simple Interest", slug: "simple-interest", description: "Calculate basic interest on principal." },
      { name: "Compound Interest", slug: "compound-interest", description: "Advanced growth with compounding." },
      { name: "EMI Calculator", slug: "emi", description: "Calculate monthly loan installments." },
      { name: "SIP Calculator", slug: "sip", description: "Mutual fund investment planning." },
      { name: "Lumpsum Calculator", slug: "lumpsum", description: "One-time investment growth." },
      { name: "Loan Calculator", slug: "loan", description: "Complete loan breakdown." },
      { name: "Inflation Calculator", slug: "inflation", description: "Purchasing power over time." },
      { name: "GST Calculator", slug: "gst", description: "Goods and Services Tax." },
    ]
  },
  {
    id: "health",
    name: "Health",
    icon: Activity,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    tools: [
      { name: "BMI Calculator", slug: "bmi", description: "Body Mass Index assessment." },
      { name: "Calorie Calculator", slug: "calories", description: "Daily energy requirements." },
      { name: "BMR Calculator", slug: "bmr", description: "Basal Metabolic Rate." },
      { name: "Ideal Weight", slug: "ideal-weight", description: "Target weight for your height." },
    ]
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    tools: [
      { name: "Scientific Calculator", slug: "scientific", description: "Advanced math operations." },
      { name: "Age Calculator", slug: "age", description: "Exact age in years, months, days." },
      { name: "GPA Calculator", slug: "gpa", description: "Calculate grade point average." },
      { name: "Unit Converter", slug: "unit-converter", description: "Length, weight, volume." },
    ]
  },
  {
    id: "tech",
    name: "Tech",
    icon: Laptop,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    tools: [
      { name: "Binary Converter", slug: "binary", description: "Base-2 to Base-10 conversion." },
      { name: "Password Gen", slug: "password", description: "Secure random passwords." },
    ]
  },
  {
    id: "utility",
    name: "Utility",
    icon: Percent,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    tools: [
      { name: "Percentage Calculator", slug: "percentage", description: "Calculate increases, discounts, and ratios." },
    ]
  }
];

export const getAllTools = () => {
  return calculatorCategories.flatMap(cat => 
    cat.tools.map(tool => ({
      ...tool,
      category: cat.id,
      href: `/calculators/${cat.id}/${tool.slug}`
    }))
  );
};
