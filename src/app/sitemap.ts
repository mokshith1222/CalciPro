import { MetadataRoute } from 'next';
import { getAllTools, calculatorCategories } from '@/lib/calculators-registry';
import { directoryCategories, getUniqueDirectoryCalculators } from '@/lib/calculator-directory';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calcverse.com';

  const toolRoutes = getAllTools().map(tool => tool.href);
  const categoryRoutes = calculatorCategories.map(cat => `/calculators/${cat.id}`);
  const directoryCategoryRoutes = directoryCategories.map(category => `/category/${category.slug}`);
  const directorySubcategoryRoutes = directoryCategories.flatMap(category =>
    category.subcategories.map(subcategory => `/category/${category.slug}/${subcategory.slug}`)
  );
  const directoryCalculatorRoutes = getUniqueDirectoryCalculators().map(calculator => calculator.href);
  
  const staticRoutes = [
    '',
    '/blog',
    '/calculators',
  ];

  const allRoutes = [
    ...staticRoutes,
    ...categoryRoutes,
    ...toolRoutes,
    ...directoryCategoryRoutes,
    ...directorySubcategoryRoutes,
    ...directoryCalculatorRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
