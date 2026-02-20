import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// ✅ استفاده از config یکپارچه از routing.ts
export default createMiddleware(routing);

export const config = {
  // ✅ تمام route ها به جز فایل‌های استاتیک
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
