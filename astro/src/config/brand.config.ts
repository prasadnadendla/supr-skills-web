// Single source of truth for design tokens.
// Imported by tailwind.config.ts (for utility class generation) and by
// React components (for runtime config like partners list, pricing, etc.).
//
// Rule: never define a color/font/spacing token in tailwind.config.ts — it
// must come from here. See plan §5.6 (Brand component) and §5.1.2 (Tailwind
// usage rules) for the why.

export const brandConfig = {
  name: 'Supr Skills',
  shortName: 'Supr',
  tagline: 'The future of learning is one tap away.',

  // -------- Colors --------
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    ink: '#0C0518',
    aubergine: '#1B0F2E',
    purple: {
      DEFAULT: '#6F5CF4',
      deep: '#3F2EA8',
    },
    coral: {
      DEFAULT: '#FF7A59',
      soft: '#FFB199',
    },
    cream: {
      DEFAULT: '#F7F1E8',
      warm: '#EFE5D2',
    },
    teal: '#5DD9C1',
    gold: '#F4C16B',
    // semantic
    bg: '#0C0518',
    fg: '#F7F1E8',
    muted: 'rgba(247, 241, 232, 0.55)',
    rule: 'rgba(247, 241, 232, 0.12)',
  },

  // -------- Typography --------
  typography: {
    families: {
      display: ['"Bricolage Grotesque"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      serif: ['"Instrument Serif"', '"Times New Roman"', 'serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
    },
  },

  // -------- Spacing extensions --------
  spacing: {
    'phone-w': '400px',
    'phone-h': '870px',
    'screen-safe': '100dvh',
  },

  // -------- Breakpoints --------
  // Stories format has two layouts only: phone viewport and letterboxed
  // phone-frame on wider screens.
  screens: {
    phone: { max: '430px' },
    frame: { min: '431px' },
  },

  // -------- Partners (slide 3) --------
  partners: [
    { id: 'mit', name: 'MIT OpenCourseWare', sub: '6.0001 · 6.S191 · 18.06 · +12 more' },
    { id: 'cs50', name: 'Harvard CS50', sub: 'CS · Web · AI · Cyber · Python' },
    { id: 'fs', name: 'Full-Stack Track', sub: 'React · Node · Postgres · Deploy' },
  ],

  // -------- Pricing (slide 7) --------
  pricing: {
    bootcamp: '₹3,20,000',
    supr: '≈ ₹499 / month · cancel anytime',
    punchline: 'Less than dinner.',
  },

  // -------- Waitlist scarcity (slide 9) --------
  scarcity: {
    seats: 500,
    claim: 'First 500 learners get lifetime access. Free.',
  },
} as const;

export type BrandConfig = typeof brandConfig;
