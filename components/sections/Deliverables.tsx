'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ScrollText, Zap, Move3d } from 'lucide-react';

const FEATURES = [
  {
    id: '01',
    icon: ScrollText, // آیکون داستان/نوشته
  },
  {
    id: '02',
    icon: Move3d, // آیکون موشن
  },
  {
    id: '03',
    icon: Zap, // آیکون سرعت/پرفورمنس
  },
];

export default function Deliverables() {
  const t = useTranslations('Deliverables');

  return (
    <section className="relative bg-charcoal py-32 overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-28 text-center max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block font-mono text-[10px] tracking-[0.3em] text-gold/60 uppercase mb-4"
          >
            Digital Atelier Standards
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-paper mb-6"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-paper/50 text-sm md:text-base"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index} 
              t={t} 
            />
          ))}
        </div>

      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[500px] bg-gradient-to-r from-transparent via-gold/[0.03] to-transparent rotate-12 blur-3xl pointer-events-none" />
    </section>
  );
}

function FeatureCard({ feature, index, t }: any) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-10 bg-[#0F0F11] border border-white/5 hover:border-gold/30 transition-colors duration-500 rounded-sm overflow-hidden"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Large Number Background */}
      <div className="absolute -right-4 -top-8 font-serif text-9xl text-white/[0.02] group-hover:text-gold/[0.05] transition-colors duration-500 select-none">
        {feature.id}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Icon Container */}
        <div className="mb-8 relative">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/50 group-hover:scale-110 transition-all duration-500 bg-[#0F0F11]">
                <Icon className="w-6 h-6 text-paper/70 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
            </div>
            {/* Glow behind icon */}
            <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <h3 className="font-serif text-2xl text-paper mb-4 group-hover:text-gold transition-colors duration-300">
            {t(`items.${feature.id}.title`)}
        </h3>
        
        <div className="h-px w-12 bg-white/10 my-4 group-hover:w-full group-hover:bg-gold/20 transition-all duration-700" />
        
        <p className="font-sans text-sm leading-relaxed text-paper/60 group-hover:text-paper/80 transition-colors duration-300">
            {t(`items.${feature.id}.description`)}
        </p>

      </div>
    </motion.div>
  );
}