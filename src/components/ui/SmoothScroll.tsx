'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function GsapLenisBridge() {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    // ✅ lenis رو داخل یه const ثابت می‌گیریم
    // تا TypeScript مطمئن بشه هیچ‌وقت undefined نیست
    const lenisInstance = lenis;

    function onTick(time: number) {
      lenisInstance.raf(time * 1000);
    }

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        autoRaf: false,
      }}
    >
      <GsapLenisBridge />
      {children}
    </ReactLenis>
  );
}
