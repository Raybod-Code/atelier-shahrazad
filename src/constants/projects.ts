import type { Project } from '@/types';

// ═══════════════════════════════════════════
// Projects Data
// متن‌ها (عنوان، توضیحات) از i18n میان
// اینجا فقط داده‌های ثابت هستن
// ═══════════════════════════════════════════

export const PROJECTS: Project[] = [
  {
    id:    '01',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
    tags:  ['Next.js', 'WebGL', 'Fashion'],
  },
  {
    id:    '02',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1200&auto=format&fit=crop',
    tags:  ['Design System', 'Architecture', 'Clean'],
  },
  {
    id:    '03',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags:  ['Audio API', 'Interactive', 'Art'],
  },
];

export const PROJECT_COUNT = PROJECTS.length;
