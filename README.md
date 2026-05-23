# Supr Skills — Web

Stories-format landing page for Supr Skills. This repo currently holds the **design prototype** described in the implementation plan — a tap-through, WhatsApp-Status-style experience with an AI buddy as the hero through-line.

## What's in here today

| File | Purpose |
|---|---|
| `index.html` | Entry point. Loads fonts, Tailwind Play CDN, brand tokens, and the React app. |
| `brand.config.js` | **Single source of truth** for design tokens — colors, typography, spacing, partners, pricing, scarcity. Mirrors `brand.config.ts` in the production Astro project. |
| `styles.css` | **One-off** complex styling — gradient meshes, AI buddy character, keyframes. Per plan §5.1.2: layout/spacing/typography/colors go to Tailwind utilities, not here. |
| `buddy.jsx` | Animated AI Buddy character (lives in CSS because Tailwind can't compose its layered radial gradients cleanly). |
| `slides.jsx` | All 9 slides (Hook → Promise → Foundation → Buddy → Humans → Ship → Reframe → Who → CTA). |
| `shell.jsx` | Stories shell: progress bars, tap zones, auto-advance, pause-on-hold, keyboard nav. Data-driven; doesn't know what Supr Skills is. |
| `app.jsx` | Root composition, phone frame, stage chrome, Tweaks panel. |
| `tweaks-panel.jsx` | In-design tweak controls (accent, CTA copy, etc.). |

The prototype uses React + Babel and Tailwind from CDN — no bundler, no install needed to render. The `package.json` exists so the repo is a proper Node project and `npm run dev` gives you a local server.

## Tailwind setup

Per implementation plan §5.1.2, Tailwind is in the stack with strict usage rules:

- **Design tokens flow from `brand.config.js` into the Tailwind config.** Inline in `index.html` for the prototype; will move to `tailwind.config.ts` in the production Astro project.
- **Use utilities inline for layout, spacing, typography, colors.** This is Tailwind's sweet spot — and you'll see this all over `slides.jsx`, `shell.jsx`, and `app.jsx`.
- **`@apply` is not used.** Repeated patterns become React components (`SLIDE_ROOT`, `CAPTION`, etc. exported as constants in `slides.jsx`).
- **Complex one-off styling stays in `styles.css`** — gradient meshes, the AI buddy character, keyframes, pseudo-element silhouettes. Tailwind utilities can't compose them cleanly.
- **Custom breakpoints**: `phone` (≤430px) and `frame` (≥431px). The default `sm/md/lg` breakpoints don't match the Stories format and aren't configured.
- **`100dvh`** is used for the mobile viewport (avoids the iOS Safari address-bar collapse bug).

⚠️ The prototype loads Tailwind from `cdn.tailwindcss.com`. This is documented for prototypes only — production uses `npx astro add tailwind` for a proper PostCSS build with JIT.

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

The implementation plan (`docs/landing-page.md`) calls for **Astro 6 with React islands**, Tailwind, a reusable `<Stories>` package, a `<Brand />` component, real videos on Slides 4 and 6, and a true Three.js 3D buddy.

What's in this repo is the **visual + interaction prototype** of that experience — the slide rhythm, motion, copy, AI-buddy presence, and Tailwind token discipline are all here. What's not yet:

- Buddy is a stylized 2D animated SVG, not a Three.js model
- Slides 4 & 6 use mock lecture/build scenes, not recorded video
- The Stories shell is composed inline; not yet extracted into a `packages/stories` library
- The Brand component is implied (one config in `brand.config.js`) rather than a separate package
- No analytics callbacks wired (the `onCTA` prop is the placeholder surface)

These are intentional scoping decisions for the prototype stage. Next step is to port this into a real Astro 6 project — see the plan for the phased build.

## License

UNLICENSED · internal prototype.
