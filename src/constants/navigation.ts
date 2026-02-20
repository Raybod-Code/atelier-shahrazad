import type { NavItem } from '@/types';

// ═══════════════════════════════════════════
// Navigation Items
// ═══════════════════════════════════════════

export const NAV_ITEMS: NavItem[] = [
  { key: 'works',   href: '/#works'   },
  { key: 'process', href: '/#process' },
  { key: 'contact', href: '/contact'  },
];

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/atelier.shahrazad',
  behance:   'https://behance.net/atelier-shahrazad',
  linkedin:  'https://linkedin.com/company/atelier-shahrazad',
} as const;
