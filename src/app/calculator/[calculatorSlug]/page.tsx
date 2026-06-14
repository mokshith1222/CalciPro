import { notFound, permanentRedirect } from "next/navigation";
import { getCalculatorByDirectorySlug, getDirectoryCalculators } from "@/lib/calculator-directory";
import { constructMetadata } from "@/seo/seo-utils";

export const metadata = constructMetadata({
  canonical: "https://calcipro-phi.vercel.app/calculator/[calculatorSlug]",
  title: "Redirecting...",
  noIndex: true,
});

type CalculatorRedirectPageProps = {
  params: Promise<{ calculatorSlug: string }>;
};

export function generateStaticParams() {
  const uniqueSlugs = new Set(getDirectoryCalculators().map((calculator) => calculator.slug));
  return [...uniqueSlugs].map((calculatorSlug) => ({ calculatorSlug }));
}

export default async function CalculatorRedirectPage({ params }: CalculatorRedirectPageProps) {
  const { calculatorSlug } = await params;
  const calculator = getCalculatorByDirectorySlug(calculatorSlug);

  if (!calculator) {
    notFound();
  }

  permanentRedirect(calculator.sourceHref);
}
