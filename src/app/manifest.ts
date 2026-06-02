import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CalcVerse - All-in-One Calculator Hub',
    short_name: 'CalcVerse',
    description: 'Smart Calculators for Everyday Life.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo.jpg',
        sizes: '310x310',
        type: 'image/jpeg',
      },
      {
        src: '/og-image.jpg',
        sizes: '310x310',
        type: 'image/jpeg',
      },
    ],
  };
}
