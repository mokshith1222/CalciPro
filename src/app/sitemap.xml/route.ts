import { getAllTools, calculatorCategories } from '@/lib/calculators-registry';
import { directoryCategories } from '@/lib/calculator-directory';
import { blogPosts } from '@/content/blog-posts';

// Force static generation at build time - no runtime execution
export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  const baseUrl = 'https://calcipro-phi.vercel.app';

  const toolRoutes = getAllTools().map(tool => tool.href);
  const categoryRoutes = calculatorCategories.map(cat => `/calculators/${cat.id}`);
  const directoryCategoryRoutes = directoryCategories.map(category => `/category/${category.slug}`);
  const directorySubcategoryRoutes = directoryCategories.flatMap(category =>
    category.subcategories.map(subcategory => `/category/${category.slug}/${subcategory.slug}`)
  );

  const staticRoutes = [
    '/',
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

  const currentDate = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    const priority = route === '/' ? '1.0' : '0.8';
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
