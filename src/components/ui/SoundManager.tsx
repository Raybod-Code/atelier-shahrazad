'use client';

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX }            from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SoundManager() {
  const [isPlaying, setIsPlaying]   = useState(false);
  const audioRef                    = useRef<HTMLAudioElement | null>(null);
  const buttonRef                   = useRef<HTMLButtonElement>(null);

  // ─── فیزیک آهنربایی (Magnetic Hover) ────────────────
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.4); 
    y.set(middleY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // ─── منطق پخش صدا (کاملاً ارادی و بهینه) ───────────────
  useEffect(() => {
    // فقط فایل صوتی رو آماده می‌کنیم، اما پخشش نمی‌کنیم
    audioRef.current        = new Audio("/sounds/ambient.mp3");
    audioRef.current.loop   = true;
    audioRef.current.volume = 0.2;

    return () => {
      // وقتی کامپوننت از بین رفت (مثلاً کاربر سایت رو بست)، صدا رو قطع کن
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // مدیریت ارور احتمالی مرورگر
        console.warn("Audio playback was prevented by the browser.");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleSound}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, x: springX, y: springY }}
      transition={{ delay: 2.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      aria-pressed={isPlaying}
      title={isPlaying ? "Mute sound" : "Play sound"}
      className="fixed bottom-8 right-8 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#050505]/60 text-paper/60 backdrop-blur-md transition-colors duration-500 hover:border-gold/40 hover:text-gold hover:bg-gold/5"
    >
      <motion.div
        animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
      >
        {isPlaying
          ? <Volume2 strokeWidth={1.5} size={18} aria-hidden="true" />
          : <VolumeX strokeWidth={1.5} size={18} aria-hidden="true" />
        }
      </motion.div>
    </motion.button>
  );
}