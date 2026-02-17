import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // لیست زبان‌های ما
  locales: ['en', 'fr'],
 
  // زبان پیش‌فرض اگر کاربر زبانی نداشت
  defaultLocale: 'en'
});
 
export const config = {
  // این خط میگه میدل‌ور روی چه آدرس‌هایی فعال باشه
  matcher: ['/', '/(fr|en)/:path*']
};
