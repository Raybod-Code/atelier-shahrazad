// ═══════════════════════════════════════════
// Core Domain Types
// ═══════════════════════════════════════════

export type Locale = 'en' | 'fr';

export interface Project {
  id:    string;
  image: string;
  tags:  string[];
}

export interface NavItem {
  key:  string;
  href: string;
}

// ═══════════════════════════════════════════
// Animation Types
// ═══════════════════════════════════════════

export interface ScrollAnimationConfig {
  trigger?:   string | Element;
  start?:     string;
  end?:       string;
  scrub?:     boolean | number;
  once?:      boolean;
  markers?:   boolean;
}

export interface FadeUpConfig {
  y?:       number;
  opacity?: number;
  delay?:   number;
  duration?: number;
}

// ═══════════════════════════════════════════
// Component Prop Types
// ═══════════════════════════════════════════

export interface ProjectCardProps {
  project: Project;
  index:   number;
  onClick: () => void;
  t:       (key: string) => string;
}

export interface ProjectModalProps {
  id:      string;
  project: Project;
  onClose: () => void;
  t:       (key: string) => string;
}

export interface OutcomeItemProps {
  text:  string;
  delay: number;
}

export interface HeaderProps {
  locale: string;
}
