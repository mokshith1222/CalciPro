import { MetadataRoute } from 'next';
import { getAllTools, calculatorCategories } from '@/lib/calculators-registry';
import { directoryCategories } from '@/lib/calculator-directory';
import { blogPosts } from '@/content/blog-posts';
import { siteConfig } from '@/seo/seo-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

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
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
