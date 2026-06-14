import { MetadataRoute } from 'next';
import { siteConfig } from '@/seo/seo-utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
