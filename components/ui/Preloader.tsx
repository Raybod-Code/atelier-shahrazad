'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی لود سنگین (2.5 ثانیه)
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0); // شروع از بالای صفحه
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }} // حرکت به سمت بالا مثل پرده
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // افکت نرم سینمایی
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-paper"
        >
            <div className="overflow-hidden">
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                    className="flex flex-col items-center gap-4"
                >
                    <span className="font-serif text-4xl md:text-6xl tracking-widest text-paper">
                        ATELIER
                    </span>
                    <span className="font-mono text-xs text-gold tracking-[0.5em] uppercase">
                        Loading Experience
                    </span>
                    
                    {/* Loading Bar */}
                    <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gold w-full h-full"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}