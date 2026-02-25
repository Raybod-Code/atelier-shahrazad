import type { Project } from '@/types';

// ═══════════════════════════════════════════
// Projects Data
// متن‌ها از i18n تغذیه میشن. اینجا فقط مدیا و تگ‌هاست.
// ═══════════════════════════════════════════

export const PROJECTS: Project[] = [
  {
    id:    '01',
    // همون سنگِ رنگی و جذاب (Maison Obsidian)
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1200&auto=format&fit=crop',
    tags:  ['Three.js', 'React', 'Custom GLSL'],
  },
  {
    id:    '02',
    // فضای معماری/انتزاعی تاریک با نورهای گرم و طلایی (Aethel Real Estate)
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1200&auto=format&fit=crop',
    tags:  ['GSAP ScrollTrigger', 'WebGL', 'Next.js'],
  },
  {
    id:    '03',
    // شیشه‌ی مایع تاریک با رفرکشنِ رنگ‌های خیره‌کننده (The Lumina Artifact)
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags:  ['React Three Fiber', 'Framer Motion', 'Art'],
  }
];

export const PROJECT_COUNT = PROJECTS.length;