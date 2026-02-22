"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  depth?: 0 | 1 | 2 | 3;
}

export default function SectionReveal({
  children,
  className = "",
  depth = 0,
}: Props) {
  // بخش هیرو (depth = 0) نیازی نداره منتظر اسکرول بمونه
  const isHero = depth === 0;

  return (
    <motion.div
      className={className}
      // ۱. حالت اولیه (قبل از دیده شدن): نامرئی، کمی پایین‌تر، تار (Blur) و کمی کوچکتر
      initial={{ 
        opacity: 0, 
        y: isHero ? 30 : 60 + depth * 15, 
        filter: "blur(10px)",
        scale: 0.96
      }}
      // ۲. وقتی وارد صفحه شد: شفاف میشه، میاد سر جاش و فوکوس میشه
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        scale: 1
      }}
      // ۳. تنظیمات تریگر (ماشه)
      viewport={{ 
        once: true, // فقط یک بار اجرا بشه (اگر کاربر رفت بالا دوباره اجرا نشه)
        margin: isHero ? "50px" : "-15%", // بقیه سکشن‌ها باید ۱۵٪ بیان تو صفحه تا انیمیشن شروع شه
      }}
      // ۴. زمان‌بندیِ به‌شدت نرم و لوکس (Custom Easing)
      transition={{
        duration: 1.4, // طولانی‌تر برای حس سنگینی و لوکس بودن
        delay: isHero ? 0.2 : 0.1, 
        ease: [0.22, 1, 0.36, 1], // Apple-style easing
      }}
    >
      {children}
    </motion.div>
  );
}