import fs from 'fs';
import path from 'path';
import { getAllTools, calculatorCategories } from '../src/lib/calculators-registry';
import { directoryCategories } from '../src/lib/calculator-directory';
import { blogPosts } from '../src/content/blog-posts';

const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://calcipro-phi.vercel.app').replace(/\/$/, '');

function generateSitemap() {
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

  const currentDate = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    const priority = route === '' ? '1.0' : '0.8';
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap.xml
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`\n✅ sitemap.xml successfully generated in public/sitemap.xml with ${allRoutes.length} routes.`);

  // Write robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
  console.log(`✅ robots.txt successfully generated in public/robots.txt.\n`);
}

generateSitemap();
