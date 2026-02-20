'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ✅ SSR کاملاً غیرفعال - Three.js نیاز به window داره
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null,
});

export default function SceneWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // قبل از mount یه پس‌زمینه تاریک نشون بده
  if (!isMounted) {
    return (
      <div
        className="fixed inset-0 bg-[#050505]"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    >
      <Scene />
    </div>
  );
}
