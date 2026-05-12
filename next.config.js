const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Legacy language pages from the previous site
      { source: '/english', destination: '/en', permanent: true },
      { source: '/english/:path*', destination: '/en/:path*', permanent: true },
      { source: '/russian', destination: '/ru', permanent: true },
      { source: '/russian/:path*', destination: '/ru/:path*', permanent: true },
      { source: '/hebrew', destination: '/', permanent: true },
      { source: '/hebrew/:path*', destination: '/:path*', permanent: true },

      // Legacy Hebrew slugs from the previous site
      { source: '/צור-קשר', destination: '/contact', permanent: true },
      { source: '/צור קשר', destination: '/contact', permanent: true },
      { source: '/יצירת-קשר', destination: '/contact', permanent: true },
      { source: '/אודות', destination: '/about', permanent: true },
      { source: '/הסיפור', destination: '/about', permanent: true },
      { source: '/שירותים', destination: '/services', permanent: true },
      { source: '/השירותים-שלנו', destination: '/services', permanent: true },
      { source: '/חלקות', destination: '/sections', permanent: true },
      { source: '/חלקות-הקבורה', destination: '/sections', permanent: true },
      { source: '/גלריה', destination: '/gallery', permanent: true },
      { source: '/תמונות', destination: '/gallery', permanent: true },
      { source: '/נגישות', destination: '/accessibility', permanent: true },
      { source: '/הצהרת-נגישות', destination: '/accessibility', permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
