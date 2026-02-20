'use client';

import { useState, useEffect }  from 'react';
import { usePathname }          from 'next/navigation';
import dynamic                   from 'next/dynamic';

// ✅ SSR کاملاً غیرفعال — Three.js نیاز به window داره
const Scene = dynamic(() => import('./Scene'), {
  ssr:     false,
  loading: () => null,
});

// صفحه‌هایی که Three.js ندارن — فقط dark bg
const DARK_BG = (
  <div
    className="fixed inset-0 bg-[#050505]"
    style={{ zIndex: 0, pointerEvents: 'none' }}
  />
);

export default function SceneWrapper() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname                  = usePathname();

  useEffect(() => { setIsMounted(true); }, []);

  // ✅ فقط روی صفحه اصلی: / یا /en یا /fr
  const isHome = /^\/((en|fr)\/?)?$/.test(pathname);

  // قبل از mount — همیشه dark bg
  if (!isMounted) return DARK_BG;

  // صفحات دیگه — فقط dark bg (بدون Three.js)
  if (!isHome) return DARK_BG;

  // صفحه اصلی — صحنه کامل Three.js
  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    >
      <Scene />
    </div>
  );
}
