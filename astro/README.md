# Supr Skills — Web (Astro 6)

Production codebase for the Supr Skills landing page. WhatsApp-Status-style, tap-through Stories experience with an AI buddy as the through-line. See `../docs/landing-page.md` for the full implementation plan.

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 6 |
| Interactive islands | React 18 |
| Styling | Tailwind CSS (utilities) + plain CSS (one-offs) |
| Design tokens | Single source of truth in `src/config/brand.config.ts` |
| Hosting target | Cloudflare Pages or Vercel (both detect Astro automatically) |

## Requirements

- **Node 22 LTS or newer** — Astro 6 dropped support for older Node versions
- npm 10+ (ships with Node 22)

## Run locally

```bash
cd astro
npm install
npm run dev
# open http://localhost:4321
```

Other scripts:

```bash
npm run build      # static build to dist/
npm run preview    # serve the build locally
```

## Project structure

```
astro/
├── astro.config.mjs           # Astro + React + Tailwind integration
├── tailwind.config.ts         # Reads tokens from brand.config.ts (no hex inline)
├── tsconfig.json              # Strict TS, @/* alias to src/*
├── public/
│   └── favicon.svg
└── src/
    ├── pages/
    │   └── index.astro        # Page entry, mounts the React island
    ├── layouts/
    │   └── Base.astro         # HTML shell, fonts, global.css
    ├── components/
    │   ├── App.tsx            # Root island: phone frame + chrome + Stories
    │   ├── StoriesShell.tsx   # Reusable, data-driven Stories engine
    │   ├── Slides.tsx         # The 9 landing slides + SLIDES registry
    │   ├── FitStage.tsx       # Runtime scaler — fits 388×858 to any viewport
    │   ├── Buddy.tsx          # 2D animated AI buddy character
    │   └── Toast.tsx          # CTA confirmation toast
    ├── config/
    │   └── brand.config.ts    # Tokens: colors, type, partners, pricing
    └── styles/
        └── global.css         # @tailwind + complex one-off styling
```

## Architectural notes

- **Tokens flow from `brand.config.ts` into `tailwind.config.ts`** — never define a color or font directly in Tailwind config. See plan §5.1.2 for the full Tailwind usage rules.
- **One big React island, not many small ones.** The Stories shell, phone frame, and slides share state (active slide, pause flag, CTA handler) so splitting them into separate islands would just duplicate the state-passing. The static HTML payload is still tiny because everything outside `<App client:load />` is plain Astro.
- **No vertical or horizontal scroll on any viewport.** `<FitStage>` measures its container at runtime and applies non-uniform `scale()` so the 388×858 design fills the phone frame on every device. On phones close to that aspect (iPhone 12+) the stretch is imperceptible; on shorter phones (iPhone SE) there's a minor vertical squish but content is fully visible — better than scroll or letterboxing.
- **Custom breakpoints only.** `phone` (≤430px) and `frame` (≥431px). The default `sm/md/lg` breakpoints don't match the Stories format and aren't configured.

## What's still placeholder (vs. plan)

This codebase ports the **interaction prototype** into the real Astro stack. Per the phased plan in `docs/landing-page.md`:

| Plan item | Status |
|---|---|
| Astro 6 + React + Tailwind | ✅ Done |
| Tokens from `brand.config.ts` | ✅ Done |
| Custom `phone` / `frame` breakpoints | ✅ Done |
| Stories shell (data-driven, headless API) | ⚠️ In-page; not yet extracted to `packages/stories` |
| `<Brand />` component | ⚠️ Implied via config; not yet a separate component |
| 3D buddy (React Three Fiber) | ❌ Phase 2 — still 2D CSS character |
| Slide 4 & 6 real videos | ❌ Phase 3 — still mock scenes |
| PostHog/Mixpanel wiring | ❌ Phase 0 closure — surface exists (`onCTA`), not wired |
| Framer Motion transitions | ❌ Phase 0 — currently CSS keyframes |
| ESLint rule banning hardcoded brand strings | ❌ Phase 0 |

Next step is to extract `StoriesShell` + `Buddy` + the brand machinery into proper `packages/` (monorepo) with Storybook, per plan §5.5–§5.6.

## License

UNLICENSED · internal.
