"use client";

import { useRef }                              from "react";
import { motion, useScroll, useTransform }     from "framer-motion";

interface Props {
  children:   React.ReactNode;
  className?: string;
  /** ۰=Hero  ۱=Works  ۲=Deliverables  ۳=Process */
  depth?:     0 | 1 | 2 | 3;
}

export default function SectionReveal({
  children,
  className = "",
  depth = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // هر چی depth بیشتر → parallax بیشتر → حس عمق بیشتر
  const yEnter = 50 + depth * 15;
  const yExit  = -(20 + depth * 8);

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [`${yEnter}px`, "0px", "0px", `${yExit}px`]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, depth === 0 ? 1 : 0.5]  // Hero هیچوقت fade out نمی‌شه
  );

  // scale — حس نزدیک شدن دوربین
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.97, 1, 1, 1.01]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
