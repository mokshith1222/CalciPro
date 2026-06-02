import { getAllTools } from "@/lib/calculators-registry";

export type DirectoryCalculator = {
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  categorySlug: string;
  subcategorySlug: string;
  href: string;
  sourceHref: string;
  featured: boolean;
  trending: boolean;
  isNew: boolean;
  popularity: number;
  addedAt: string;
};

export type DirectorySubcategory = {
  name: string;
  slug: string;
  description: string;
};

export type DirectoryCategory = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: DirectorySubcategory[];
};

export const directoryCategories: DirectoryCategory[] = [
  {
    name: "Finance, Taxes & Business",
    slug: "finance-business",
    icon: "finance",
    description: "Explore calculators for loans, investments, tax estimates, business decisions, shopping, and everyday money planning.",
    subcategories: [
      { name: "Finance & Money", slug: "finance-money", description: "Loan, EMI, SIP, interest, inflation, and investment planning calculators." },
      { name: "Business & Finance Tools", slug: "business-finance-tools", description: "Business-friendly finance calculators for payment, growth, and planning decisions." },
      { name: "Personal Finance & Taxes", slug: "personal-finance-taxes", description: "Personal money, tax, purchasing power, and savings calculators." },
      { name: "Marketing & Social Media", slug: "marketing-social-media", description: "Percentage and ratio tools useful for campaigns, growth, and conversion planning." },
      { name: "Shopping & E-commerce", slug: "shopping-ecommerce", description: "Discount, percentage, tax, and price comparison calculators for shoppers and sellers." },
    ],
  },
  {
    name: "Health, Lifestyle & Family",
    slug: "health-lifestyle-family",
    icon: "health",
    description: "Health, body, calorie, fitness, family, and lifestyle calculators for everyday wellness planning.",
    subcategories: [
      { name: "Health & Fitness", slug: "health-fitness", description: "BMI, BMR, calorie, and ideal weight calculators." },
      { name: "Nutrition & Food", slug: "nutrition-food", description: "Nutrition and calorie planning calculators." },
      { name: "Parenting & Family", slug: "parenting-family", description: "Family planning and age-related utility calculators." },
      { name: "Beauty, Fashion & Lifestyle", slug: "beauty-fashion-lifestyle", description: "Lifestyle and body metric calculators." },
      { name: "Sports & Recreation", slug: "sports-recreation", description: "Fitness and activity planning calculators." },
    ],
  },
  {
    name: "Real Estate, Trade & Tech",
    slug: "real-estate-trade-tech",
    icon: "trade",
    description: "Home, construction, developer, data, utility, and technology calculators.",
    subcategories: [
      { name: "Home, DIY & Real Estate", slug: "home-diy-real-estate", description: "Loan and home planning calculators useful for property decisions." },
      { name: "Construction, Engineering & Trades", slug: "construction-engineering-trades", description: "Math, conversion, and planning tools for technical work." },
      { name: "Tech, Dev & Data", slug: "tech-dev-data", description: "Binary conversion and secure password generation tools." },
      { name: "Energy & Utilities", slug: "energy-utilities", description: "Everyday utility and conversion calculators." },
    ],
  },
  {
    name: "Science, Math & Education",
    slug: "science-math-education",
    icon: "education",
    description: "Math, science, statistics, grades, study, conversion, and education calculators.",
    subcategories: [
      { name: "Science & Math", slug: "science-math", description: "Scientific calculator, unit converter, percentage, and math utility tools." },
      { name: "Education & Study Tools", slug: "education-study-tools", description: "GPA, age, scientific, and study planning calculators." },
      { name: "Environment & Agriculture", slug: "environment-agriculture", description: "Conversion and measurement tools useful for field planning." },
    ],
  },
  {
    name: "Transport, Media & Entertainment",
    slug: "transport-media-entertainment",
    icon: "transport",
    description: "Transport, travel, media, audio, gaming, and planning calculators.",
    subcategories: [
      { name: "Automotive & Transportation", slug: "automotive-transportation", description: "Loan and cost calculators useful for vehicle decisions." },
      { name: "Travel & Transport", slug: "travel-transport", description: "Money, conversion, and planning tools for trips and transport." },
      { name: "Photography & Media", slug: "photography-media", description: "Ratio, percentage, and conversion tools for media planning." },
      { name: "Music & Audio", slug: "music-audio", description: "Math and conversion tools for creative planning." },
      { name: "Gaming & Gamification", slug: "gaming-gamification", description: "Probability, percentage, and scoring support calculators." },
    ],
  },
  {
    name: "Utilities, Legal & Text Tools",
    slug: "utilities-legal-text-tools",
    icon: "utility",
    description: "Admin, conversion, writing, legal date, event planning, and niche utility calculators.",
    subcategories: [
      { name: "Utility / Admin", slug: "utility-admin", description: "General-purpose percentage, age, and conversion calculators." },
      { name: "Conversions & Utilities", slug: "conversions-utilities", description: "Unit conversion, binary conversion, and percentage utilities." },
      { name: "Language & Writing Tools", slug: "language-writing-tools", description: "Text-oriented utilities and planning tools." },
      { name: "Law, Dates & Legal Tools", slug: "law-dates-legal-tools", description: "Age and date-related calculators." },
      { name: "Events & Planning", slug: "events-planning", description: "Planning calculators for money, dates, and scenarios." },
      { name: "Misc & Fun / Niche Ideas", slug: "misc-fun-niche-ideas", description: "Useful niche calculators across the platform." },
    ],
  },
];

const placementBySource: Record<string, { categorySlug: string; subcategorySlug: string; keywords: string[]; featured?: boolean; trending?: boolean }> = {
  "/calculators/finance/simple-interest": { categorySlug: "finance-business", subcategorySlug: "finance-money", keywords: ["interest", "principal", "rate"], featured: true },
  "/calculators/finance/compound-interest": { categorySlug: "finance-business", subcategorySlug: "finance-money", keywords: ["compound", "investment", "growth"], featured: true, trending: true },
  "/calculators/finance/emi": { categorySlug: "finance-business", subcategorySlug: "finance-money", keywords: ["emi", "loan", "repayment"], featured: true, trending: true },
  "/calculators/finance/sip": { categorySlug: "finance-business", subcategorySlug: "finance-money", keywords: ["sip", "mutual fund", "investment"], featured: true, trending: true },
  "/calculators/finance/lumpsum": { categorySlug: "finance-business", subcategorySlug: "business-finance-tools", keywords: ["lumpsum", "investment", "returns"] },
  "/calculators/finance/loan": { categorySlug: "finance-business", subcategorySlug: "business-finance-tools", keywords: ["loan", "payment", "interest"], trending: true },
  "/calculators/finance/inflation": { categorySlug: "finance-business", subcategorySlug: "personal-finance-taxes", keywords: ["inflation", "purchasing power", "future value"] },
  "/calculators/finance/gst": { categorySlug: "finance-business", subcategorySlug: "personal-finance-taxes", keywords: ["gst", "tax", "invoice"], featured: true },
  "/calculators/health/bmi": { categorySlug: "health-lifestyle-family", subcategorySlug: "health-fitness", keywords: ["bmi", "body mass", "fitness"], featured: true, trending: true },
  "/calculators/health/calories": { categorySlug: "health-lifestyle-family", subcategorySlug: "nutrition-food", keywords: ["calorie", "food", "nutrition"], trending: true },
  "/calculators/health/bmr": { categorySlug: "health-lifestyle-family", subcategorySlug: "health-fitness", keywords: ["bmr", "metabolism", "energy"] },
  "/calculators/health/ideal-weight": { categorySlug: "health-lifestyle-family", subcategorySlug: "beauty-fashion-lifestyle", keywords: ["ideal weight", "height", "body"] },
  "/calculators/education/scientific": { categorySlug: "science-math-education", subcategorySlug: "science-math", keywords: ["scientific", "math", "trigonometry"], featured: true, trending: true },
  "/calculators/education/age": { categorySlug: "utilities-legal-text-tools", subcategorySlug: "law-dates-legal-tools", keywords: ["age", "date", "birthday"], featured: true },
  "/calculators/education/gpa": { categorySlug: "science-math-education", subcategorySlug: "education-study-tools", keywords: ["gpa", "grade", "study"], featured: true, trending: true },
  "/calculators/education/unit-converter": { categorySlug: "utilities-legal-text-tools", subcategorySlug: "conversions-utilities", keywords: ["unit", "conversion", "length", "weight"], featured: true },
  "/calculators/tech/binary": { categorySlug: "real-estate-trade-tech", subcategorySlug: "tech-dev-data", keywords: ["binary", "decimal", "developer"], featured: true },
  "/calculators/tech/password": { categorySlug: "real-estate-trade-tech", subcategorySlug: "tech-dev-data", keywords: ["password", "security", "random"], trending: true },
  "/calculators/utility/percentage": { categorySlug: "utilities-legal-text-tools", subcategorySlug: "utility-admin", keywords: ["percentage", "ratio", "increase", "discount"], featured: true, trending: true },
};

const aliases: Record<string, { categorySlug: string; subcategorySlug: string }[]> = {
  "/calculators/finance/loan": [
    { categorySlug: "real-estate-trade-tech", subcategorySlug: "home-diy-real-estate" },
    { categorySlug: "transport-media-entertainment", subcategorySlug: "automotive-transportation" },
  ],
  "/calculators/education/unit-converter": [
    { categorySlug: "science-math-education", subcategorySlug: "environment-agriculture" },
    { categorySlug: "real-estate-trade-tech", subcategorySlug: "construction-engineering-trades" },
    { categorySlug: "real-estate-trade-tech", subcategorySlug: "energy-utilities" },
  ],
  "/calculators/utility/percentage": [
    { categorySlug: "finance-business", subcategorySlug: "marketing-social-media" },
    { categorySlug: "finance-business", subcategorySlug: "shopping-ecommerce" },
    { categorySlug: "transport-media-entertainment", subcategorySlug: "photography-media" },
    { categorySlug: "transport-media-entertainment", subcategorySlug: "gaming-gamification" },
    { categorySlug: "utilities-legal-text-tools", subcategorySlug: "events-planning" },
    { categorySlug: "utilities-legal-text-tools", subcategorySlug: "misc-fun-niche-ideas" },
  ],
  "/calculators/education/scientific": [
    { categorySlug: "transport-media-entertainment", subcategorySlug: "music-audio" },
  ],
  "/calculators/health/calories": [
    { categorySlug: "health-lifestyle-family", subcategorySlug: "sports-recreation" },
  ],
  "/calculators/education/age": [
    { categorySlug: "health-lifestyle-family", subcategorySlug: "parenting-family" },
  ],
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toCalculatorSlug(name: string) {
  const base = slugify(name);
  return base.endsWith("calculator") ? base : `${base}-calculator`;
}

export function getDirectoryCalculators(): DirectoryCalculator[] {
  const tools = getAllTools();
  const calculators: DirectoryCalculator[] = [];

  tools.forEach((tool, index) => {
    const placement = placementBySource[tool.href];
    if (!placement) {
      return;
    }

    const base = {
      name: tool.name,
      slug: toCalculatorSlug(tool.name),
      description: tool.description || "Professional calculator tool.",
      keywords: [...placement.keywords, tool.name, tool.category],
      sourceHref: tool.href,
      href: `/calculator/${toCalculatorSlug(tool.name)}`,
      featured: Boolean(placement.featured),
      trending: Boolean(placement.trending),
      isNew: index % 5 === 0,
      popularity: 100 - index,
      addedAt: `2026-05-${String(28 - (index % 20)).padStart(2, "0")}`,
    };

    calculators.push({ ...base, categorySlug: placement.categorySlug, subcategorySlug: placement.subcategorySlug });
    (aliases[tool.href] || []).forEach((alias) => {
      calculators.push({ ...base, categorySlug: alias.categorySlug, subcategorySlug: alias.subcategorySlug });
    });
  });

  return calculators;
}

export function getUniqueDirectoryCalculators() {
  return uniqueDirectoryCalculators(getDirectoryCalculators());
}

export function uniqueDirectoryCalculators<T extends { slug: string }>(calculators: T[]) {
  const seen = new Set<string>();

  return calculators.filter((calculator) => {
    if (seen.has(calculator.slug)) {
      return false;
    }

    seen.add(calculator.slug);
    return true;
  });
}

export function getDirectoryCategory(categorySlug: string) {
  return directoryCategories.find((category) => category.slug === categorySlug);
}

export function getDirectorySubcategory(categorySlug: string, subcategorySlug: string) {
  return getDirectoryCategory(categorySlug)?.subcategories.find((subcategory) => subcategory.slug === subcategorySlug);
}

export function getCalculatorsForCategory(categorySlug: string) {
  return getDirectoryCalculators().filter((calculator) => calculator.categorySlug === categorySlug);
}

export function getCalculatorsForSubcategory(categorySlug: string, subcategorySlug: string) {
  return getDirectoryCalculators().filter(
    (calculator) => calculator.categorySlug === categorySlug && calculator.subcategorySlug === subcategorySlug
  );
}

export function getCalculatorByDirectorySlug(calculatorSlug: string) {
  return getDirectoryCalculators().find((calculator) => calculator.slug === calculatorSlug);
}

export function searchDirectoryCalculators(calculators: DirectoryCalculator[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return calculators;
  }

  return calculators.filter((calculator) =>
    [calculator.name, calculator.description, calculator.categorySlug, calculator.subcategorySlug, ...calculator.keywords]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  );
}
