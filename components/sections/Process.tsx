'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = ['01', '02', '03', '04'];

export default function Process() {
  const t = useTranslations('Process');
  const containerRef = useRef<HTMLDivElement>(null);

  // اتصال اسکرول به انیمیشن خط
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // ارتفاع خط طلایی (از 0% تا 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    // ✅ فیکس: اضافه کردن id="process" برای اینکه لینک هدر کار کنه
    <section id="process" ref={containerRef} className="py-32 bg-charcoal relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10 max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-serif text-5xl md:text-6xl text-paper"
            >
                {t('title')}
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-sans text-paper/50 text-sm max-w-xs text-left md:text-right"
            >
                {t('subtitle')}
            </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
            
            {/* The Vertical Line (Background - Grey) */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2" />
            
            {/* The Vertical Line (Foreground - Gold Progress) */}
            <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-[15px] md:left-1/2 top-0 w-[1px] bg-gold shadow-[0_0_15px_rgba(199,165,106,0.6)] md:-translate-x-1/2 origin-top"
            />

            {/* Steps */}
            <div className="space-y-24 md:space-y-32">
                {STEPS.map((step, index) => (
                    <StepItem 
                        key={step} 
                        step={step} 
                        index={index} 
                        t={t} 
                    />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}

function StepItem({ step, index, t }: any) {
    const isEven = index % 2 === 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0`}
        >
            {/* Center Dot (The Anchor) */}
            <div className="absolute left-[11px] md:left-1/2 top-0 w-2 h-2 rounded-full bg-charcoal border border-gold z-10 md:-translate-x-1/2 translate-y-2.5 shadow-[0_0_0_4px_#0B0B0C]" />

            {/* Content Side */}
            <div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <span className="font-mono text-xs text-gold/60 tracking-widest uppercase mb-2 block">
                    Step {step}
                </span>
                <h3 className="font-serif text-3xl text-paper mb-4">
                    {t(`steps.${step}.title`)}
                </h3>
                <p className="font-sans text-paper/60 text-sm leading-relaxed max-w-sm ml-0 md:ml-auto">
                    {isEven ? (
                        // راست چین برای دسکتاپ (اگر زوج بود، باید مارجین چپش اتومات باشه)
                        <span className="block md:ml-auto">{t(`steps.${step}.desc`)}</span>
                    ) : (
                        // چپ چین برای دسکتاپ
                         <span className="block mr-auto">{t(`steps.${step}.desc`)}</span>
                    )}
                </p>
            </div>

            {/* Empty Side (For Balance) */}
            <div className="hidden md:block md:w-1/2" />
            
        </motion.div>
    );
}