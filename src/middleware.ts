import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 🔍 این در TERMINAL (نه browser) چاپ می‌شود
  console.log('🔵 Middleware:', pathname);
  
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
