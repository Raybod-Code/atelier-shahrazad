'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// ─────────────────────────────────────────────
// انواع حالت cursor
// ─────────────────────────────────────────────
type CursorState = 'default' | 'hover' | 'click' | 'text' | 'hidden';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [label,       setLabel]       = useState('');
  const [isVisible,   setIsVisible]   = useState(false);

  // ─── موقعیت raw ماوس ──────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // ─── dot: سریع و دقیق ─────────────────────
  const dotX = useSpring(rawX, { stiffness: 800, damping: 35, mass: 0.1 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 35, mass: 0.1 });

  // ─── ring: کند و لوکس ─────────────────────
  const ringX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.5 });
  const ringY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.5 });

  const rafRef = useRef<number>(0);

  // ─── به‌روزرسانی موقعیت با rAF ────────────
  const onMouseMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    });
  }, [rawX, rawY]);

  useEffect(() => {
    // موبایل / لمسی → هیچی نشون نده
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    // ─── تشخیص نوع المان ────────────────────
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el     = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      ) as HTMLElement | null;

      if (!el) {
        setCursorState('default');
        setLabel('');
        return;
      }

      // data-cursor-label برای label سفارشی
      const customLabel = el.getAttribute('data-cursor-label') ?? '';
      setLabel(customLabel);

      const tag  = el.tagName;
      const type = (el as HTMLInputElement).type;

      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        setCursorState('text');
      } else {
        setCursorState('hover');
      }

      // ─── Magnetic Effect ──────────────────
      const applyMagnetic = () => {
        if (!el.hasAttribute('data-magnetic')) return;
        const rect   = el.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const strength = parseFloat(el.getAttribute('data-magnetic') ?? '0.4');
        const dx     = rawX.get() - cx;
        const dy     = rawY.get() - cy;
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      };

      el.addEventListener('mousemove', applyMagnetic);
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.removeEventListener('mousemove', applyMagnetic);
        setCursorState('default');
        setLabel('');
      }, { once: true });
    };

    const onMouseDown = () => setCursorState('click');
    const onMouseUp   = () => setCursorState('default');
    const onMouseLeave = () => setCursorState('hidden');
    const onMouseEnter = () => setCursorState('default');

    window.addEventListener('mousemove',  onMouseMove,  { passive: true });
    window.addEventListener('mouseover',  onMouseOver,  { passive: true });
    window.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mouseup',    onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseover',  onMouseOver);
      window.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mouseup',    onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove, rawX, rawY]);

  if (!isVisible) return null;

  // ─────────────────────────────────────────
  // استایل‌های هر حالت
  // ─────────────────────────────────────────
  const ringStyles: Record<CursorState, object> = {
    default: { scale: 1,    opacity: 0.6,  borderColor: 'rgb(199 165 106 / 0.5)' },
    hover:   { scale: 2.2,  opacity: 1,    borderColor: 'rgb(199 165 106 / 0.9)' },
    click:   { scale: 0.8,  opacity: 1,    borderColor: 'rgb(199 165 106 / 1)'   },
    text:    { scale: 1,    opacity: 0.5,  borderColor: 'rgb(245 245 220 / 0.4)' },
    hidden:  { scale: 0,    opacity: 0,    borderColor: 'transparent'            },
  };

  const dotStyles: Record<CursorState, object> = {
    default: { scale: 1,   opacity: 1    },
    hover:   { scale: 0,   opacity: 0    },
    click:   { scale: 3,   opacity: 0.6  },
    text:    { scale: 0.3, opacity: 0.8  },
    hidden:  { scale: 0,   opacity: 0    },
  };

  const RING_SIZE = 36;
  const DOT_SIZE  = 6;

  return (
    <>
      {/* ─── Ring (کند) ─────────────────────── */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          x:         ringX,
          y:         ringY,
          translateX: -(RING_SIZE / 2),
          translateY: -(RING_SIZE / 2),
          width:      RING_SIZE,
          height:     RING_SIZE,
        }}
      >
        <motion.div
          className="relative h-full w-full rounded-full border"
          animate={ringStyles[cursorState]}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ borderColor: 'rgb(199 165 106 / 0.5)' }}
        >
          {/* label داخل ring (مثلاً "View") */}
          {label && cursorState === 'hover' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center font-mono text-[7px] tracking-widest text-gold uppercase"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* ─── Dot (سریع) ─────────────────────── */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-gold"
        style={{
          x:          dotX,
          y:          dotY,
          translateX: -(DOT_SIZE / 2),
          translateY: -(DOT_SIZE / 2),
          width:       DOT_SIZE,
          height:      DOT_SIZE,
        }}
        animate={dotStyles[cursorState]}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      />

      {/* ─── cursor پیش‌فرض رو مخفی کن ─────── */}
      <style>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>
    </>
  );
}
