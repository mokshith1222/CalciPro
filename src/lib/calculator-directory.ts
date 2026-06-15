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
    description: "Explore free calculators for loans, EMI, SIP, compound interest, tax estimation, business planning, and everyday money management decisions online.",
    subcategories: [
      { name: "Finance & Money", slug: "finance-money", description: "Loan, EMI, SIP, compound interest, simple interest, inflation, and investment planning calculators for smart personal finance decisions and growth." },
      { name: "Business & Finance Tools", slug: "business-finance-tools", description: "Business finance calculators for payment schedules, investment growth analysis, loan comparison, and strategic financial planning decisions online." },
      { name: "Personal Finance & Taxes", slug: "personal-finance-taxes", description: "Personal money management, GST tax calculation, purchasing power analysis, and savings planning calculators for everyday financial decisions and goals." },
      { name: "Marketing & Social Media", slug: "marketing-social-media", description: "Percentage and ratio tools useful for marketing campaigns, social media growth tracking, conversion rate analysis, and performance planning online." },
      { name: "Shopping & E-commerce", slug: "shopping-ecommerce", description: "Discount percentage, GST tax, price comparison, and cost analysis calculators for smart shopping decisions and e-commerce seller profit planning." },
    ],
  },
  {
    name: "Health, Lifestyle & Family",
    slug: "health-lifestyle-family",
    icon: "health",
    description: "Health and wellness calculators for BMI, BMR, calories, ideal weight, fitness planning, nutrition tracking, and family lifestyle decision-making tools.",
    subcategories: [
      { name: "Health & Fitness", slug: "health-fitness", description: "BMI, BMR, calorie intake, and ideal weight calculators for health-conscious individuals tracking fitness goals, body composition, and wellness metrics." },
      { name: "Nutrition & Food", slug: "nutrition-food", description: "Nutrition planning, daily calorie calculation, and dietary analysis calculators for meal prep, weight management, and balanced eating habit tracking." },
      { name: "Parenting & Family", slug: "parenting-family", description: "Family planning, age calculation, and milestone tracking utility calculators for parents managing schedules, growth charts, and important date tracking." },
      { name: "Beauty, Fashion & Lifestyle", slug: "beauty-fashion-lifestyle", description: "Lifestyle and body metric calculators for tracking personal wellness goals, body measurements, ideal weight ranges, and health-conscious fashion sizing." },
      { name: "Sports & Recreation", slug: "sports-recreation", description: "Fitness activity planning, calorie burn estimation, and BMI tracking calculators for athletes, sports enthusiasts, and recreational activity scheduling." },
    ],
  },
  {
    name: "Real Estate, Trade & Tech",
    slug: "real-estate-trade-tech",
    icon: "trade",
    description: "Home buying, construction planning, developer tools, binary conversion, password generation, and technology calculators for trade professionals.",
    subcategories: [
      { name: "Home, DIY & Real Estate", slug: "home-diy-real-estate", description: "Loan EMI, mortgage planning, and home affordability calculators useful for property buying decisions, real estate investment analysis, and DIY budgeting." },
      { name: "Construction, Engineering & Trades", slug: "construction-engineering-trades", description: "Math conversion, unit calculation, and measurement planning tools for construction professionals, engineers, and skilled trade workers on job sites." },
      { name: "Tech, Dev & Data", slug: "tech-dev-data", description: "Binary to decimal conversion, secure password generation, and developer-focused utility tools for programmers, data analysts, and tech professionals." },
      { name: "Energy & Utilities", slug: "energy-utilities", description: "Everyday utility calculators for unit conversion, percentage calculations, and measurement tools useful for energy consumption and utility bill analysis." },
    ],
  },
  {
    name: "Science, Math & Education",
    slug: "science-math-education",
    icon: "education",
    description: "Math, science, statistics, GPA, grade percentage, unit conversion, scientific calculator, and study planning tools for students and educators online.",
    subcategories: [
      { name: "Science & Math", slug: "science-math", description: "Scientific calculator, unit converter, percentage tool, and math utility calculators for students, researchers, and professionals solving everyday problems." },
      { name: "Education & Study Tools", slug: "education-study-tools", description: "GPA calculator, age finder, scientific calculator, and study planning tools for students tracking academic progress, grades, and educational milestones." },
      { name: "Environment & Agriculture", slug: "environment-agriculture", description: "Conversion and measurement tools useful for agricultural field planning, environmental data analysis, unit calculations, and seasonal crop estimation work." },
    ],
  },
  {
    name: "Transport, Media & Entertainment",
    slug: "transport-media-entertainment",
    icon: "transport",
    description: "Transport cost estimators, travel planning tools, media ratio calculators, and gaming math utilities for entertainment and creative professionals.",
    subcategories: [
      { name: "Automotive & Transportation", slug: "automotive-transportation", description: "Loan EMI and cost analysis calculators useful for vehicle purchase decisions, auto financing comparisons, and transportation budget planning and tracking." },
      { name: "Travel & Transport", slug: "travel-transport", description: "Money conversion, unit calculation, and trip planning tools for travelers managing budgets, currency exchanges, distance conversions, and travel expenses." },
      { name: "Photography & Media", slug: "photography-media", description: "Ratio calculation, percentage tools, and unit conversion utilities for photographers, videographers, media producers, and creative content planning work." },
      { name: "Music & Audio", slug: "music-audio", description: "Math conversion and calculation tools useful for music production planning, audio frequency analysis, tempo calculations, and creative project budgeting." },
      { name: "Gaming & Gamification", slug: "gaming-gamification", description: "Probability calculation, percentage tools, and scoring support calculators for gamers, game designers, and gamification strategy planning and analysis." },
    ],
  },
  {
    name: "Utilities, Legal & Text Tools",
    slug: "utilities-legal-text-tools",
    icon: "utility",
    description: "General-purpose utility calculators including percentage tools, unit converters, date calculators, text analysis, legal planning, and event scheduling helpers.",
    subcategories: [
      { name: "Utility / Admin", slug: "utility-admin", description: "General-purpose percentage, age calculation, and unit conversion calculators for administrative tasks, office work, and everyday practical problem solving." },
      { name: "Conversions & Utilities", slug: "conversions-utilities", description: "Unit conversion between metric and imperial systems, binary number conversion, and percentage calculation utilities for accurate everyday measurements." },
      { name: "Language & Writing Tools", slug: "language-writing-tools", description: "Text-oriented utility calculators and planning tools for writers, editors, content creators, and language professionals managing word counts and formatting." },
      { name: "Law, Dates & Legal Tools", slug: "law-dates-legal-tools", description: "Age calculation, date difference tools, and timeline calculators useful for legal professionals, compliance tracking, and official document date verification." },
      { name: "Events & Planning", slug: "events-planning", description: "Planning calculators for event budgets, date calculations, money estimation, and scenario analysis useful for event organizers and project coordinators." },
      { name: "Misc & Fun / Niche Ideas", slug: "misc-fun-niche-ideas", description: "Useful niche calculators across the CalciPro platform including percentage tools, converters, and unique calculation utilities for specialized everyday needs." },
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
      href: tool.href,
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
