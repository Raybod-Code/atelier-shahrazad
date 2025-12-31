import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // لیست زبان‌های ما
  locales: ['en', 'fr'],
  
  // زبان پیش‌فرض
  defaultLocale: 'en'
});

// ساختن ابزارهای نویگیشن بر اساس روتینگ جدید
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);