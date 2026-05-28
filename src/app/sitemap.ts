import { MetadataRoute } from 'next';
import { getAllTools, calculatorCategories } from '@/lib/calculators-registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calcverse.com';

  const toolRoutes = getAllTools().map(tool => tool.href);
  const categoryRoutes = calculatorCategories.map(cat => `/calculators/${cat.id}`);
  
  const staticRoutes = [
    '',
    '/blog',
    '/calculators',
  ];

  const allRoutes = [...staticRoutes, ...categoryRoutes, ...toolRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
