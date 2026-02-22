"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─────────────────────────────────────────────
// تایپ‌های cursor label — هر کجای پروژه
// که داشتیم data-cursor="..." بذاریم اینجا اضافه می‌کنیم
// ─────────────────────────────────────────────
type CursorLabel = "View" | "Close" | "Open" | "Play" | "Drag" | "Back";

const DEFAULT_LABEL: CursorLabel = "View";

// ── Walk up DOM tree to find data-cursor attribute ──
function getCursorLabel(target: HTMLElement): CursorLabel {
  let el: HTMLElement | null = target;
  while (el) {
    const label = el.dataset.cursor;
    if (label) return label as CursorLabel;
    el = el.parentElement;
  }
  return DEFAULT_LABEL;
}

// ── Check if element is interactive ──
function isInteractive(target: HTMLElement): boolean {
  return !!(
    target.tagName.toLowerCase() === "a"      ||
    target.tagName.toLowerCase() === "button" ||
    target.closest("a")                        ||
    target.closest("button")                   ||
    target.classList.contains("cursor-pointer")||
    target.getAttribute("role") === "button"   ||
    target.closest("[role='button']")
  );
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering,  setIsHovering]  = useState(false);
  const [isVisible,   setIsVisible]   = useState(false);
  const [cursorLabel, setCursorLabel] = useState<CursorLabel>(DEFAULT_LABEL);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering = isInteractive(target);

      setIsHovering(hovering);

      if (hovering) {
        // ✅ از DOM tree بالا میریم تا data-cursor پیدا کنیم
        setCursorLabel(getCursorLabel(target));
      } else {
        // reset به default وقتی روی المان غیر‌کلیکی هستیم
        setCursorLabel(DEFAULT_LABEL);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove",   moveCursor);
    window.addEventListener("mouseover",   handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove",   moveCursor);
      window.removeEventListener("mouseover",   handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // mobile → کرسر رندر نشه
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // ── رنگ حلقه بر اساس label ──────────────────────
  // "Close" → کمی قرمزی ظریف، بقیه → طلایی
  const ringColor = cursorLabel === "Close"
    ? "rgba(239, 68, 68, 0.15)"
    : "rgba(199, 165, 106, 0.1)";

  const ringBorderColor = cursorLabel === "Close"
    ? "rgba(239, 68, 68, 0)"
    : "rgba(199, 165, 106, 0)";

  const labelColor = cursorLabel === "Close"
    ? "text-red-400"
    : "text-gold";

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
          width:   32,
          height:  32,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale:           isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? ringColor       : "transparent",
          borderColor:     isHovering ? ringBorderColor : "rgba(199, 165, 106, 0.5)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* ✅ label داینامیک — از data-cursor میاد */}
        <motion.span
          key={cursorLabel}             /* key باعث میشه وقتی label عوض میشه re-animate بشه */
          className={`text-[5px] font-mono tracking-widest uppercase ${labelColor}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {cursorLabel}
        </motion.span>
      </motion.div>

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
