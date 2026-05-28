import { Metadata } from 'next';

const siteConfig = {
  name: 'CalcVerse',
  description: 'Smart Calculators for Everyday Life. Finance, Education, Health, Technology, and Daily Utility Calculators in One Place.',
  url: 'https://calcverse.com',
  ogImage: 'https://calcverse.com/og-image.jpg',
  twitterHandle: '@calcverse',
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title,
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
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    icons,
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
