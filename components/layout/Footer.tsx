'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#050505] pt-32 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container px-6 mx-auto">
        
        {/* Big CTA */}
        <div className="mb-24 text-center">
            <span className="font-mono text-xs text-gold/60 tracking-widest uppercase mb-6 block">
                {t('cta')}
            </span>
            <Link href="/contact" className="group inline-flex items-center gap-4 md:gap-8">
                <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-paper group-hover:text-gold transition-colors duration-500">
                    {t('bigLink')}
                </h2>
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                    <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 text-paper group-hover:text-charcoal transition-colors" />
                </div>
            </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 border-t border-white/5 pt-16 mb-16">
            
            {/* Column 1 */}
            <div>
                <h4 className="font-mono text-xs text-paper/40 uppercase tracking-widest mb-6">{t('sitemap')}</h4>
                <ul className="space-y-4">
                    {['Works', 'Process', 'Pricing'].map((item) => (
                        <li key={item}>
                            <Link href={`/${item.toLowerCase()}`} className="text-paper/70 hover:text-gold transition-colors font-sans text-sm">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Column 2 */}
            <div>
                <h4 className="font-mono text-xs text-paper/40 uppercase tracking-widest mb-6">{t('socials')}</h4>
                <ul className="space-y-4">
                    {['Instagram', 'Twitter', 'LinkedIn'].map((item) => (
                        <li key={item}>
                            <a href="#" className="text-paper/70 hover:text-gold transition-colors font-sans text-sm">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

             {/* Column 3 - Info */}
             <div className="col-span-2 md:col-span-2 md:text-right">
                <Link href="/" className="font-serif text-2xl text-paper block mb-4">
                    Atelier <span className="text-gold italic">Shahrazad</span>
                </Link>
                <p className="text-paper/40 text-sm max-w-xs ml-auto">
                    Crafting digital legacies for brands that dare to be different.
                </p>
             </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-paper/20 pt-8 border-t border-white/5 font-mono">
            <p>{t('copyright')}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
            </div>
        </div>

      </div>
    </footer>
  );
}