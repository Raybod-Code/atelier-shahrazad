import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next'; // 👈 اضافه کردن تایپ استاندارد Next.js

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = { // 👈 اعمال تایپ روی متغیر
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // 👈 اضافه کردن این خط که تایپ‌اسکریپت بهش گیر داده بود
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        pathname: '/**', // 👈 اضافه کردن این خط
      },
    ],
  },
};

export default withNextIntl(nextConfig);