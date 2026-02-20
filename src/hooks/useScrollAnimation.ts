'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ScrollAnimationConfig, FadeUpConfig } from '@/types';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════
// Hook: fadeUp — محو شدن از پایین به بالا
// ═══════════════════════════════════════════

export function useFadeUp(config: FadeUpConfig = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y:       config.y ?? 40,
        },
        {
          opacity:  1,
          y:        0,
          delay:    config.delay    ?? 0,
          duration: config.duration ?? 0.9,
          ease:     'power3.out',
          scrollTrigger: {
            trigger: el,
            start:   'top 85%',
            once:    true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [config.y, config.delay, config.duration]);

  return ref;
}

// ═══════════════════════════════════════════
// Hook: staggerChildren — انیمیشن ترتیبی
// ═══════════════════════════════════════════

export function useStaggerChildren(
  selector: string,
  config: ScrollAnimationConfig = {}
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(selector),
        { opacity: 0, y: 30 },
        {
          opacity:  1,
          y:        0,
          duration: 0.8,
          ease:     'power3.out',
          stagger:  0.15,
          scrollTrigger: {
            trigger: el,
            start:   config.start ?? 'top 80%',
            once:    config.once  ?? true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [selector, config.start, config.once]);

  return ref;
}

// ═══════════════════════════════════════════
// Hook: parallax — افکت عمق
// ═══════════════════════════════════════════

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -30 * speed,
        ease:     'none',
        scrollTrigger: {
          trigger: el,
          start:   'top bottom',
          end:     'bottom top',
          scrub:   true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
