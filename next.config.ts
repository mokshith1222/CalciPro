import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  turbopack: {
    root: process.cwd(),
  },
  transpilePackages: ['recharts', 'react-smooth'],
  async headers() {
    return [
      {
        // Apply security headers to all pages EXCEPT sitemap.xml and robots.txt
        source: '/((?!sitemap\\.xml|robots\\.txt).*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
          }
        ],
      },
      {
        // Sitemap: serve clean XML with no HTML security headers
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      {
        // Robots: serve clean text with no HTML security headers
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
