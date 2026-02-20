import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // ✅ Unsplash برای تصاویر پروژه‌ها
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // ✅ برای بعد اگه از پلتفرم دیگه‌ای استفاده کردی
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
