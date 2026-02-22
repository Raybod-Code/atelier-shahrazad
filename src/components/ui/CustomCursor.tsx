"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // استفاده از MotionValue به جای State برای جلوگیری از رندر مجدد و افت فریم (پرفورمنس بالا)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // تنظیمات فیزیک فنر برای حلقه دور موس (سنگین و لوکس)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // فقط در سمت کلاینت (مرورگر) اجرا میشه
    if (typeof window === "undefined") return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true); // وقتی موس تکون خورد ظاهرش کن
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // تشخیص اینکه موس روی لینک، دکمه یا عناصر کلیک‌پذیر رفته یا نه
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer');

      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // اگر تو گوشی موبایل هستیم، اصلا موس رو رندر نکن تا سبک بمونه
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* ── نقطه مرکزی (سریع و دقیق) ── */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* ── حلقه فنری (نرم و واکنشی) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-gold/50 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: 32,
          height: 32,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1, // بزرگ شدن موقع هاور
          backgroundColor: isHovering ? "rgba(199, 165, 106, 0.1)" : "transparent",
          borderColor: isHovering ? "rgba(199, 165, 106, 0)" : "rgba(199, 165, 106, 0.5)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* یک متن ظریف "VIEW" که فقط روی پروژه‌ها یا دکمه‌ها دیده میشه */}
        <motion.span 
          className="text-[5px] font-mono tracking-widest text-gold opacity-0 uppercase"
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>

      {/* ── مخفی کردن نشانگر دیفالت ویندوز/مک ── */}
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        a, button, [role="button"] {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}