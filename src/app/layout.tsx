import type { ReactNode } from 'react';

// ✅ Root layout مورد نیاز next-intl v4 با ساختار [locale]
// این layout مینیمال فقط children رو پاس می‌ده
// کل HTML/body در [locale]/layout.tsx هست
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
