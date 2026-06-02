import { notFound, redirect } from "next/navigation";
import { getCalculatorByDirectorySlug, getDirectoryCalculators } from "@/lib/calculator-directory";

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

  redirect(calculator.sourceHref);
}
