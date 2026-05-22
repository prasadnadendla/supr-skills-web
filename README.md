# Supr Skills — Web

Stories-format landing page for Supr Skills. This repo currently holds the **design prototype** described in the implementation plan — a tap-through, WhatsApp-Status-style experience with an AI buddy as the hero through-line.

## What's in here today

- `index.html` — entry point
- `styles.css` — design tokens + all slide styles
- `buddy.jsx` — animated AI Buddy character
- `slides.jsx` — all 9 slides (Hook → Promise → Foundation → Buddy → Humans → Ship → Reframe → Who → CTA)
- `shell.jsx` — Stories shell: progress bars, tap zones, auto-advance, pause-on-hold, keyboard nav
- `app.jsx` — root composition, phone frame, Tweaks panel
- `tweaks-panel.jsx` — in-design tweak controls (accent, CTA copy, etc.)

The prototype uses React + Babel from CDN — no bundler, no install needed to render. The `package.json` exists so the repo is a proper Node project and so `npm run dev` gives you a local server.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:5173
```

Or just open `index.html` in a browser.

## Keyboard / interaction

- **Tap right** / `→` — next slide
- **Tap left** / `←` — previous slide
- **Long-press** / `Space` — pause auto-advance
- **Slide 9 parks** — does not auto-advance further

## How this maps to the production plan

The implementation plan (`docs/IMPLEMENTATION_PLAN.md`) calls for **Astro 4+ with React islands**, a reusable `<Stories>` package, a `<Brand>` component, real videos on Slides 4 and 6, and a true Three.js 3D buddy.

What's in this repo is the **visual + interaction prototype** of that experience — the slide rhythm, motion, copy, and AI-buddy presence are all here, but:

- Buddy is a stylized 2D animated SVG, not a Three.js model
- Slides 4 & 6 use mock lecture/build scenes, not recorded video
- The Stories shell is composed inline; it has not yet been extracted into a `packages/stories` library
- The Brand component is implied (one config object in `app.jsx`) rather than a separate package

These are intentional scoping decisions for the prototype stage. The next step is to port this into a real Astro project — see the plan for the phased build.

## License

UNLICENSED · internal prototype.
