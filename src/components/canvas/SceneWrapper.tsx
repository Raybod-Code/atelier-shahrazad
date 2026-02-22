'use client';

import { useState, useEffect } from 'react';
import { usePathname }         from 'next/navigation';
import dynamic                  from 'next/dynamic';
import { ErrorBoundary }        from '@/components/ui/ErrorBoundary';

const Scene = dynamic(() => import('./Scene'), {
  ssr:     false,
  loading: () => null,
});

// ✅ مشترک — dark bg بدون Three.js
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

  const isHome = /^\/((en|fr)\/?)?$/.test(pathname);

  if (!isMounted) return DARK_BG;
  if (!isHome)    return DARK_BG;

  return (
    // ✅ اگه Three.js crash کرد → fallback به DARK_BG، سایت سالم می‌مونه
    <ErrorBoundary fallback={DARK_BG}>
      <div
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      >
        <Scene />
      </div>
    </ErrorBoundary>
  );
}
