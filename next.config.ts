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
    ];
  },
};

export default nextConfig;
