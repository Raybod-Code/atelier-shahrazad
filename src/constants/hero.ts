// ═══════════════════════════════════════════
// Hero Section — Static Data
// جداسازی data از component
// ═══════════════════════════════════════════

export interface HeroStat {
  num:    number; // عدد واقعی — برای animation
  suffix: string; // "+", "%" یا ""
  label:  string;
}

export const HERO_STATS: HeroStat[] = [
  { num: 12,  suffix: '+', label: 'Projects'  },
  { num: 100, suffix: '',  label: 'Lighthouse' },
  { num: 3,   suffix: '',  label: 'Awwwards'  },
];

export const HERO_META = {
  badge:       'Digital Atelier',
  established: '2024',
  location:    'Paris',
} as const;
