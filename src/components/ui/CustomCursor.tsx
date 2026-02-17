'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // اگر دستگاه لمسی است (موبایل/تبلت)، کلا بیخیال شو
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // لیست تگ‌هایی که موس باید روشون بزرگ بشه
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gold pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovering ? 20 : 6), // تنظیم دقیق مرکز
        y: mousePosition.y - (isHovering ? 20 : 6),
        scale: isHovering ? 4 : 1,
        opacity: 1
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    />
  );
}