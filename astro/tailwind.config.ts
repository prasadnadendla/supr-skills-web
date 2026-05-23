import type { Config } from 'tailwindcss';
import { brandConfig } from './src/config/brand.config';

const b = brandConfig;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    screens: b.screens,
    extend: {
      colors: b.colors,
      fontFamily: b.typography.families,
      spacing: b.spacing,
      height: { 'screen-safe': '100dvh' },
      maxHeight: { 'screen-safe': '100dvh' },
      minHeight: { 'screen-safe': '100dvh' },
      boxShadow: {
        phone:
          '0 0 0 2px #2a1f3d, 0 0 0 12px #0d0917, 0 60px 120px -40px rgba(111, 92, 244, 0.5), 0 30px 80px -30px rgba(255, 122, 89, 0.25)',
        'glow-coral': '0 14px 28px -10px rgba(255, 122, 89, 0.4)',
        'ring-teal': '0 0 0 1px rgba(93, 217, 193, 0.6), 0 0 40px -10px rgba(93, 217, 193, 0.5)',
      },
      backgroundImage: {
        'mesh-1':
          'radial-gradient(ellipse 80% 50% at 20% 10%, rgba(255, 122, 89, 0.55), transparent 60%), radial-gradient(ellipse 70% 60% at 90% 90%, rgba(111, 92, 244, 0.7), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 50%, rgba(93, 217, 193, 0.18), transparent 60%), linear-gradient(180deg, #1a0c33, #0c0518)',
        'warm-night':
          'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(255, 122, 89, 0.35), transparent 60%), radial-gradient(ellipse 70% 50% at 50% 0%, rgba(111, 92, 244, 0.35), transparent 60%), linear-gradient(180deg, #160a2c, #0a0517)',
        deep: 'linear-gradient(180deg, #120822, #0a0414 70%)',
        'lecture-frame':
          'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(111, 92, 244, 0.4), transparent 60%), linear-gradient(135deg, #4b3cd4, #2a1a4a)',
        'reframe-bottom':
          'radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255, 122, 89, 0.4), transparent 60%), linear-gradient(135deg, #4b3cd4, #1c103c)',
      },
    },
  },
  plugins: [],
} satisfies Config;
