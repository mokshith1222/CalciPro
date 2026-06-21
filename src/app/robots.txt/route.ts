// Force static generation at build time
export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /api/

Sitemap: https://calcipro-phi.vercel.app/sitemap.xml
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
