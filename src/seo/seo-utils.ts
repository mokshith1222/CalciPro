import { Metadata } from 'next';

export const siteConfig = {
  name: 'CalciPro',
  description: 'Smart Calculators for Everyday Life. Finance, Education, Health, Technology, and Daily Utility Calculators in One Place.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://calcipro-phi.vercel.app',
  ogImage: '/og-image.jpg',
  twitterHandle: '@calcipro',
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  canonical,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const pageTitle = title 
    ? (title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`)
    : siteConfig.name;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: title || siteConfig.name,
      description,
      images: [
        {
          url: image,
        },
      ],
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    icons,
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    metadataBase: new URL(siteConfig.url),
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
