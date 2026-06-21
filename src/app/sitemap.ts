import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getAllTools, calculatorCategories } from '@/lib/calculators-registry';
import { directoryCategories } from '@/lib/calculator-directory';
import { blogPosts } from '@/content/blog-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host') || 'calcipro-phi.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const toolRoutes = getAllTools().map(tool => tool.href);
  const categoryRoutes = calculatorCategories.map(cat => `/calculators/${cat.id}`);
  const directoryCategoryRoutes = directoryCategories.map(category => `/category/${category.slug}`);
  const directorySubcategoryRoutes = directoryCategories.flatMap(category =>
    category.subcategories.map(subcategory => `/category/${category.slug}/${subcategory.slug}`)
  );
  
  const staticRoutes = [
    '',
    '/blog',
    '/calculators',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/cookies',
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];

  const allRoutes = [
    ...staticRoutes,
    ...categoryRoutes,
    ...toolRoutes,
    ...directoryCategoryRoutes,
    ...directorySubcategoryRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
