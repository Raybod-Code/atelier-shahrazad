# 🎭 Atelier Shahrazad | The Golden Thread

> Immersive WebGL Experience built with Next.js 16, React 19, Three.js

## 🚀 Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## 📁 Project Structure
\`\`\`
/src
  /app/[locale]    # i18n routing (en, fr)
  /components
    /canvas        # Three.js scenes
    /ui            # Reusable UI
    /sections      # Page sections
    /layout        # Header, Footer
  /lib             # Utils, GSAP setup
\`\`\`

## 🎨 Design System
- Colors: CSS Variables in `globals.css`
- Typography: Fluid scales with `clamp()`
- Animations: GSAP + Lenis smooth scroll

## 📦 Key Dependencies
- Next.js 16.1 (App Router)
- React 19 + TypeScript
- Three.js + R3F (3D)
- GSAP + Lenis (Animations)
- next-intl (i18n)
