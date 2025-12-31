'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';

const PROJECTS = [
  {
    id: '01',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'WebGL', 'Fashion'],
  },
  {
    id: '02',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1200&auto=format&fit=crop',
    tags: ['Design System', 'Architecture', 'Clean'],
  },
  {
    id: '03',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['Audio API', 'Interactive', 'Art'],
  },
];

const easingLux = [0.22, 1, 0.36, 1] as const;

export default function SelectedWorks() {
  const t = useTranslations('Works');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClose = () => setSelectedId(null);
  const active = selectedId ? PROJECTS.find((p) => p.id === selectedId)! : null;

  return (
    <section id="works" className="relative isolate overflow-hidden bg-charcoal py-32 md:py-40">
      
      {/* Cinematic Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-[600px] w-[600px] rounded-full bg-gold/[0.15] blur-[120px]" />
        <div className="absolute right-[10%] bottom-[30%] h-[500px] w-[500px] rounded-full bg-gold/[0.08] blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-24 md:mb-32">
          <div className="mb-12 flex flex-col gap-12 border-b border-gold/20 pb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-6">
              
              {/* Overline */}
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: easingLux }}
                  className="h-[1px] w-16 origin-left bg-gradient-to-r from-gold via-gold/60 to-transparent"
                />
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase">
                  {t('sectionLabel')}
                </span>
              </div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: easingLux }}
                className="font-serif text-6xl leading-[0.95] tracking-[-0.02em] text-paper md:text-8xl"
              >
                {t('title')}
              </motion.h2>
            </div>

            {/* Descriptor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, ease: easingLux }}
              className="max-w-xs space-y-3 border-l border-gold/30 pl-6"
            >
              <p className="font-sans text-sm leading-relaxed tracking-wide text-paper/50">
                {t('subtitle')}
              </p>
              <div className="flex items-center gap-2 text-gold/60">
                <Sparkles className="h-3 w-3" />
                <span className="font-mono text-[10px] tracking-widest uppercase">{t('badge')}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedId(project.id)}
              t={t}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedId && active ? (
          <ProjectModal id={selectedId} onClose={handleClose} t={t} project={active} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick, t }: any) {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ delay: index * 0.18, duration: 1.1, ease: easingLux }}
      className="group relative cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Decorative large number */}
      <div className="absolute -left-4 -top-6 font-serif text-[140px] font-light leading-none text-paper/[0.03] md:-left-8 md:-top-10 md:text-[180px]">
        {project.id}
      </div>

      {/* Card container */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-gold/20 via-gold/5 to-transparent opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

        {/* Gold frame */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold/30 via-gold/10 to-transparent p-[1px] transition-all duration-700 group-hover:from-gold/50 group-hover:via-gold/20">
          
          <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0B]">
            {/* Image */}
            <motion.div
              layoutId={`image-${project.id}`}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={project.image}
                alt={t(`items.${project.id}.title`)}
                className="
                  h-full w-full object-cover
                  brightness-[0.85] contrast-[1.15] grayscale
                  transition-all duration-[900ms] ease-out
                  group-hover:scale-[1.08] group-hover:brightness-100 group-hover:contrast-100 group-hover:grayscale-0
                "
              />
              
              {/* Overlays */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/20 to-gold/0 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100" />
              
              {/* Light Sweep */}
              <motion.div
                className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                animate={{ translateX: ['100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
              />

              {/* Noise */}
              <div
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
              />

              {/* Index badge */}
              <div className="absolute left-5 top-5">
                <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-gold/80 uppercase">
                    {t('caseLabel')}
                  </span>
                  <span className="font-serif text-sm text-paper">{project.id}</span>
                </div>
              </div>

              {/* Hover CTA */}
              <div className="absolute bottom-6 right-6 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-paper/95 shadow-2xl backdrop-blur transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-gold hover:shadow-gold/50">
                  <ArrowUpRight className="h-5 w-5 text-charcoal" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Text Info */}
      <div className="relative mt-8 space-y-3 px-2">
        <h3 className="font-serif text-3xl leading-tight tracking-tight text-paper transition-colors duration-500 group-hover:text-gold md:text-4xl">
          {t(`items.${project.id}.title`)}
        </h3>

        <p className="border-l-2 border-gold/40 pl-4 font-sans text-[11px] uppercase tracking-[0.25em] text-paper/45">
          {t(`items.${project.id}.intent`)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-paper/50 transition-colors duration-300 group-hover:border-gold/30 group-hover:text-gold/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ id, onClose, t, project }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/92 backdrop-blur-xl"
      />

      <motion.div
        layoutId={`card-${id}`}
        className="relative z-10 w-full max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-gold/25 via-gold/10 to-transparent p-[1.5px] shadow-2xl"
      >
        <div className="relative flex h-[90vh] flex-col overflow-hidden rounded-3xl bg-[#0A0A0B] md:flex-row">
          
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="absolute right-6 top-6 z-50 rounded-full border border-gold/20 bg-black/60 p-3 text-paper/70 backdrop-blur transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
          >
            <X className="h-5 w-5" />
          </motion.button>

          {/* Left: Image */}
          <motion.div
            layoutId={`image-${id}`}
            className="relative h-[45%] w-full overflow-hidden md:h-full md:w-[55%]"
          >
            <img src={project.image} alt="Project" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/80 via-transparent to-transparent md:via-[#0A0A0B]/20" />
            <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            {/* Floating Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: easingLux }}
              className="absolute bottom-8 left-8 max-w-md space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-gold" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-gold/80 uppercase">
                  {t('caseLabel')} {id}
                </span>
              </div>
              <h2 className="font-serif text-5xl leading-none tracking-tight text-paper md:text-6xl">
                {t(`items.${id}.title`)}
              </h2>
              <p className="font-serif text-xl italic leading-relaxed text-paper/60">
                {t(`items.${id}.intent`)}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ delay: 0.25, duration: 0.7, ease: easingLux }}
            className="w-full overflow-y-auto p-8 md:w-[45%] md:p-12 lg:p-16"
          >
            <div className="space-y-10">
              
              {/* Description */}
              <div className="space-y-6">
                <div className="h-[1px] w-full bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
                <p className="font-sans text-base leading-[1.8] tracking-wide text-paper/75 md:text-lg">
                  {t(`items.${id}.description`)}
                </p>
              </div>

              {/* Outcomes */}
              <div className="space-y-5">
                <h4 className="font-mono text-[10px] tracking-[0.3em] text-gold/70 uppercase">
                  {t('keyOutcomes')}
                </h4>
                <OutcomeItem text={t(`items.${id}.outcome1`)} delay={0.5} />
                <OutcomeItem text={t(`items.${id}.outcome2`)} delay={0.6} />
              </div>

              {/* Technologies */}
              <div className="space-y-4 border-t border-white/5 pt-8">
                <h4 className="font-mono text-[10px] tracking-[0.3em] text-gold/70 uppercase">
                  {t('technologies')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, i: number) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="rounded-full bg-paper/90 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-charcoal shadow-lg"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-3 border-t border-gold/20 pt-8"
              >
                <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-paper/40 uppercase">
                  {t('cta')}
                </span>
                <ArrowUpRight className="h-3 w-3 text-gold/60" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function OutcomeItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6, ease: easingLux }}
      className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.04]"
    >
      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-lg shadow-gold/50" />
      <span className="font-sans text-sm leading-relaxed text-paper/70 group-hover:text-paper/90">
        {text}
      </span>
    </motion.div>
  );
}