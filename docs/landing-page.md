# Supr Skills — Landing Page Implementation Plan

A WhatsApp-Status-style, tap-through landing experience with an AI buddy as the hero through-line. This document covers the slide structure, technical architecture, AI buddy capabilities, and a phased build plan.

---

## 1. Product Positioning

**Tagline:** *The future of learning is one tap away.*

**Core differentiator:** World-class free courses (MIT, Harvard CS50, full-stack tracks) augmented by an always-on AI buddy that *watches the lecture with you*, understands when you're confused, explains in real time, and brings in a human expert when needed.

**Phase 1 audience:** Engineering graduates and final-year students in India.
**Phase 2 audience:** Earlier-stage engineering students and working professionals upskilling into deep learning, model building, and full-stack.

**Tone:** Futuristic but warm. Confident but not arrogant. Never names competitors.

---

## 2. Interaction Model

Borrowed directly from WhatsApp/Instagram Stories — zero learning curve.

- **Tap right half of screen** → next slide
- **Tap left half** → previous slide
- **Long-press anywhere** → pause auto-advance
- **Swipe up** → trigger primary CTA for current slide (where applicable)
- **Progress bars** at top, one segment per slide, fill in real time
- **Last slide parks** — does not auto-loop back; loops only on manual tap

A one-time "tap and hold to pause" hint appears on first visit and never again (stored in localStorage).

---

## 3. Slide-by-Slide Specification

### Slide 1 — The Hook *(3s)*
- **Background:** Animated mesh gradient, slow and ambient
- **Text (two beats):** *"The AI race won't wait."* → *"Neither should you."*
- **Motion:** Letter-by-letter fade-up; second line replaces first
- **CTA:** None
- **Logo:** Small, top-left

### Slide 2 — The Promise *(4s)*
- **Visual:** 3D AI buddy beside a floating laptop showing a lecture frame
- **Caption:** *"Learning, finally with a companion."*
- **Motion:** Buddy fades in first, laptop materializes, caption types in. Buddy has continuous idle animation (breathing, blinks)
- **CTA:** None

### Slide 3 — World-Class Foundation *(4s)*
- **Visual:** MIT, Harvard CS50, and "Full-Stack" badges stagger in
- **Caption:** *"The world's best courses. Always free."*
- **Motion:** Staggered fade-up with soft scale
- **CTA:** None

### Slide 4 — The AI Buddy in Action *(7s, video)*
- **Visual:** Embedded muted auto-loop video (~12s) — lecture playing, user webcam tile, 3D buddy pausing video and explaining concepts in real time
- **Caption:** *"Confused? It already knows."*
- **Motion:** Video plays instantly, caption fades up at 2s
- **CTA:** *"See it live →"* (bottom-right, opens longer demo in modal)

### Slide 5 — Real Humans, On Standby *(4s)*
- **Visual:** AI buddy steps aside; human expert video tile slides in
- **Caption:** *"When AI isn't enough, a human is."*
- **Motion:** Buddy slides left and dims; expert tile slides in with glow ring
- **CTA:** None

### Slide 6 — Ship Something Real *(6s, video)*
- **Visual:** Auto-loop video (~15s) of a user building a mobile app — code appearing, UI taking shape, app running on a real phone
- **Caption:** *"Your first app. Before the week ends."*
- **Motion:** Video plays immediately; caption fades up at 2s
- **CTA:** *"Start building →"* (primary, opens waitlist)

### Slide 7 — The Reframe *(5s)*
- **Visual:** Stacked or split — top: tired bootcamp footage (desaturated); bottom: vibrant Supr Skills interface
- **Caption (two beats):** *"Bootcamps cost lakhs."* → *"This costs less than dinner."*
- **Motion:** Top half plays and dims; bottom brightens as second caption appears
- **CTA:** *"See how we compare →"* (subtle text link, opens comparison page)

### Slide 8 — Who It's For *(4s)*
- **Visual:** Three minimal portraits/silhouettes stagger in — grad, student, professional
- **Caption:** *"Built for engineers. Every stage."*
- **Motion:** Left-to-right stagger with soft pulse
- **CTA:** None

### Slide 9 — The CTA *(parks here)*
- **Visual:** 3D buddy idle-animating in upper third
- **Headline:** *"The future of learning is one tap away."*
- **Buttons:**
  - Primary (filled): *Join the waitlist*
  - Secondary (outlined): *Watch the 60-second tour*
- **Subtext:** *"First 500 learners get lifetime access. Free."*
- **Motion:** Ambient gradient drift in background; no auto-advance

---

## 4. The AI Buddy — Capabilities & Architecture

The buddy is the brand. It must feel alive, attentive, and helpful — not animated wallpaper.

### 4.1 Capabilities

**a) Lip-sync + speech (audio)**
- Real-time text-to-speech with phoneme-level lip-sync on the 3D model
- Voice should feel approachable, energetic, slightly informal — *not* corporate
- Multi-language support roadmap: English first, Hindi + Telugu in Phase 2 (matches Indian audience priority)

**b) Behavior understanding (computer vision)**
- Webcam analysis: detects confusion, distraction, fatigue, prolonged absence
- Signals trigger different buddy responses:
  - *Confusion (furrowed brow, replaying segment)* → buddy offers simplified explanation
  - *Distraction (looking away, phone in frame)* → gentle nudge, not a scold
  - *Fatigue (yawns, slumped posture, long session)* → suggests a break with a specific duration
  - *Absence (no face for >2 min)* → pauses lecture automatically

**c) Contextual hints**
- Buddy knows what timestamp of which lecture the user is on
- Can surface relevant hints: "This concept comes up again in week 3 — worth pausing on"
- For lab exercises: contextual scaffolding (not solutions) — "Try printing the variable here to see what's happening"

**d) Real-world examples on demand**
- User asks "where would I use this?" → buddy generates a domain-specific example (fintech, healthcare, e-commerce based on stated interest)

**e) Simplified explanation mode**
- ELI5 toggle: same concept re-explained with analogies, no jargon

**f) Human handoff**
- Buddy detects when it's hit its limit (repeated confusion on same concept, frustration cues) → offers to bring in a human expert
- Expert joins live, sees the same lecture timestamp and the user's recent buddy conversation

### 4.2 Technical stack (recommended)

| Layer | Technology | Notes |
|---|---|---|
| 3D buddy rendering | Three.js or Unity WebGL | Three.js is lighter for the landing page; Unity if reusing the product model |
| Lip-sync | Rhubarb Lip Sync or NVIDIA Audio2Face | Real-time phoneme extraction from TTS audio |
| TTS | ElevenLabs or OpenAI TTS | ElevenLabs has better emotional range |
| Speech-to-text (user) | Whisper (real-time variant) | For user questions to the buddy |
| Vision (behavior) | MediaPipe Face Mesh + custom classifier | Runs in-browser; privacy-friendly |
| LLM brain | Claude Sonnet 4.6 or GPT-4-class | Context: lecture transcript + timestamp + user history |
| Real-time orchestration | WebRTC + WebSocket | For sub-300ms response latency |
| Expert handoff | LiveKit or Daily.co | Video infrastructure for live expert calls |

### 4.3 Privacy & trust

- All webcam processing happens **on-device** by default (MediaPipe runs in-browser)
- Only aggregated behavior signals (not raw video) are sent to the server
- Clear consent flow on first webcam use — opt-in, never default-on
- This must be communicated on the landing page eventually, possibly as a small trust line near the CTA

### 4.4 Landing page version of the buddy

On the landing page itself, the buddy does **not** need full behavior detection. It needs to:
1. Render in 3D with idle animation (breathing, blinks, occasional head tilt)
2. Optionally speak the tagline on Slide 1 or Slide 9 (with lip-sync) — *but muted by default with a tap-to-unmute affordance*
3. React to slide transitions (subtle nod when a new slide loads)

Full behavior capabilities are showcased *in the embedded demo videos* on Slides 4 and 6 — not run live on the landing page. This keeps page load fast and avoids spooking visitors with a webcam prompt before they're sold.

---

## 5. Technical Architecture (Landing Page)

### 5.1 Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Astro 6.x** | Ships zero JS by default; perfect for content-first landing page |
| Interactive islands | React (via Astro integration) | Buddy + Stories shell hydrate as isolated islands |
| Styling | **Tailwind CSS** | Design token enforcement, fast component variants, ~10KB gzipped bundle |
| Animation | Framer Motion | Best-in-class for orchestrated UI motion (used inside React islands) |
| 3D rendering | React Three Fiber (Three.js) | Composable with React, lighter than Unity for web |
| State | Zustand | Tiny, sufficient for slide index + pause state |
| Video | Mux or Cloudflare Stream | Adaptive bitrate; critical for Indian mobile networks |
| Analytics | PostHog or Mixpanel | Need per-slide drop-off, not just page views |
| Hosting | Vercel or Cloudflare Pages | Both have first-class Astro support and edge-CDN |

### 5.1.1 Why Astro 6 over Next.js

The landing page is 95% static content — captions, gradients, embedded videos, a 3D buddy. There's no auth, no personalized content, no server-rendered dashboards. Astro's "islands architecture" is purpose-built for this:

- **Zero JS by default** — Next.js ships a React runtime on every page. Astro ships pure HTML, then hydrates only the interactive parts. Expected LCP improvement: 300-600ms on 4G versus an equivalent Next.js build.
- **React still works** — The 3D buddy and Stories shell run as React islands (`<BuddyScene client:load />`, `<StoriesShell client:load />`). The rest of the page is static HTML.
- **Simpler mental model** — No App Router, no Server Components, no `"use client"` boundaries to debate.
- **Lighthouse 95+ without effort** — Critical for SEO and the perception of "futuristic" you want to project. A slow landing page contradicts the brand.

#### Why Astro 6 specifically

Astro 6 brings several improvements that matter for this build:

- **Redesigned dev server on Vite's Environment API** — unifies dev and prod runtimes, eliminating the "works in dev, breaks in prod" class of bugs. Important when we're orchestrating 3D rendering, video autoplay, and gesture handling.
- **First-class Cloudflare Workers support via the official Vite plugin** — local dev runs in `workerd`, the same runtime that powers Cloudflare in production. If we deploy to Cloudflare Pages (recommended for cost and edge presence in India), this eliminates a whole category of deployment surprises.
- **Stable live content collections** — useful later if waitlist count, partner logos, or pricing should update without a redeploy.
- **Built-in Content Security Policy support** — security hardening without a custom middleware layer. Matters once we handle waitlist submissions and embed third-party video.

#### Setup requirements

- **Node 22+** is required (Astro 6 dropped support for older Node versions). The team's local environments and CI must be on Node 22 LTS before Phase 0 starts.
- **Several deprecated APIs from Astro 4/5 have been removed.** Since we're starting fresh, this doesn't affect us — but worth flagging if anyone tries to copy patterns from older Astro tutorials.

**Architectural decision:** Marketing site (`suprskills.com`) and product app (`app.suprskills.com`) should be separate codebases with separate deploys. The product app can use Next.js or whatever the team picks — the landing page does not need to share that stack.

**Caveat:** If the team has zero Astro experience and is racing the clock, "use what we know" is a legitimate fallback. Astro takes a few days to pick up for a React dev, but under launch pressure that may not be worth the switch. In that case: Next.js with aggressive static export (`output: 'export'`) and disabled telemetry gets close to the same outcome — not as clean, but workable.

### 5.1.2 Tailwind CSS — Usage Rules

Tailwind is in the stack, but **not primarily for responsiveness** — the Stories format has essentially two layouts (phone viewport, and phone-frame letterboxed on desktop), which is the simplest responsive problem possible. The real reasons:

- **Design token enforcement.** `tailwind.config.ts` imports tokens from `brand.config.ts`, so colors, spacing, and typography have a single source of truth. No more "use the primary blue" and getting three different blues.
- **Velocity in Storybook.** We're building a component library (Stories, Brand, slot renderers). Tailwind makes building variants fast.
- **Small bundle.** JIT compiler ships only used classes — typically 8-15KB gzipped for a page this size.
- **Native Astro integration.** Single command setup, works cleanly with islands.

#### Usage rules (non-negotiable)

1. **Design tokens flow from `brand.config.ts` into `tailwind.config.ts`** — never define a color or font directly in Tailwind config. Import from brand.
2. **Use utilities inline for layout, spacing, typography, colors.** This is Tailwind's sweet spot.
3. **Do not use `@apply` heavily.** It defeats the purpose. If a pattern repeats, extract a React component, not an `@apply` class.
4. **Animations stay in Framer Motion.** Tailwind's transition utilities are too limited for the orchestrated motion we want.
5. **Complex one-off styling (the gradient mesh background, custom SVG fills, the 3D scene's CSS scaffolding) goes in plain CSS or CSS modules.** Don't force everything through utilities.
6. **Define custom breakpoints, not the default `sm/md/lg/xl`.** Those are built for traditional responsive sites and don't match the Stories format. Use:
   - `phone`: up to 430px (the actual experience)
   - `frame`: 431px and above (letterbox view with the phone-shaped container centered)

#### Tailwind config structure

```
// tailwind.config.ts
import { brandConfig } from './packages/brand/brand.config';

export default {
  content: [...],
  theme: {
    screens: {
      phone: { max: '430px' },
      frame: { min: '431px' },
    },
    colors: brandConfig.colors,
    fontFamily: brandConfig.typography.families,
    fontSize: brandConfig.typography.sizes,
    spacing: brandConfig.spacing,
    extend: {
      // Stories-specific tokens
      height: { 'screen-safe': '100dvh' }, // for mobile viewport quirks
    },
  },
}
```

The `100dvh` thing matters more than it sounds — mobile Safari's address bar collapse/expand will break a `100vh` Stories layout. Using `dvh` (dynamic viewport height) fixes it. Easy to miss, painful to debug.

### 5.2 Performance budget

- **First contentful paint:** under 1.2s on 4G
- **Largest contentful paint:** under 2.5s
- **Slide 1 must render instantly** — even before the 3D buddy loads. The buddy can pop in after a beat
- **Videos lazy-load** — only Slide 4 and Slide 6 videos preload; the rest fetch when user is 2 slides away
- **3D buddy model:** under 2MB; use Draco compression on the GLB file

### 5.3 Mobile-first

- Designed for portrait mobile (the dominant traffic for this audience in India)
- Desktop falls back to a centered phone-frame view (Stories format doesn't expand well to wide screens)
- Tap zones generous (minimum 44×44px hit target)

### 5.4 Accessibility

- All caption text has high contrast ratios (WCAG AA minimum)
- Auto-advance can be disabled by users who need more time (a small settings affordance, second visit onward)
- Videos have captions baked in
- Screen reader fallback: linear text version of the same story

### 5.5 Reusable Stories Component

The Stories shell must be a **standalone, data-driven component** — not a page hardcoded to the 9 landing slides. This is a deliberate architectural choice. We will reuse it for course intros, feature announcements, onboarding flows, marketing campaigns, and possibly even in-product tutorials. Build it once, configure it everywhere.

#### Design principles

- **Data in, experience out** — the component takes a `slides` array (the data source) plus a config object, and renders the full Stories experience. No business logic inside the component.
- **Zero knowledge of "landing page"** — the component doesn't know what Supr Skills is. It just knows how to render a tap-through slide sequence.
- **Slot-based content** — each slide type (text, image, video, 3D, split, custom) is a registered slot renderer. Adding a new slide type means registering a new renderer, not modifying the shell.
- **Headless where it matters** — exposes state and controls via hooks/callbacks so consumers can build custom progress bars, custom CTAs, or external pause buttons if needed.

#### Public API (conceptual contract)

```
<Stories
  slides={slidesData}
  config={{
    autoAdvance: true,
    loopOnEnd: false,
    pauseOnHold: true,
    showProgressBar: true,
    transition: 'crossfade' | 'slide',
    theme: themeTokens,
  }}
  onSlideView={(slideId, index) => {}}
  onCtaTap={(slideId, ctaId) => {}}
  onComplete={() => {}}
  onExit={() => {}}
/>
```

#### Slide data schema

Each slide in the `slides` array conforms to a typed shape. Example:

```
{
  id: 'hook',
  durationMs: 3000,
  parkOnArrival: false,
  type: 'text' | 'image' | 'video' | 'split' | 'three-d' | 'custom',
  content: { ... },         // shape depends on `type`
  motion: { ... },          // entrance/exit animation config
  cta?: {
    id: 'see-it-live',
    label: 'See it live',
    variant: 'primary' | 'secondary' | 'text-link',
    position: 'bottom' | 'bottom-right' | 'inline',
    action: { type: 'open-modal' | 'navigate' | 'submit' | 'custom', payload }
  },
  caption?: {
    text: string | string[],   // array = multi-beat reveals
    position: 'top' | 'center' | 'bottom',
    revealStyle: 'fade' | 'type' | 'letter-stagger'
  }
}
```

The 9 landing slides become 9 JSON objects in a `landing-slides.ts` file. The shell renders them. Nothing in the shell references Supr Skills specifically.

#### Slot renderers (extensibility)

Each slide `type` maps to a renderer component. The library ships with built-ins:

- `TextSlide` — captions on gradient/solid background
- `ImageSlide` — single image with caption overlay
- `VideoSlide` — auto-play muted video with caption overlay
- `SplitSlide` — top/bottom or left/right composition
- `ThreeDSlide` — React Three Fiber scene with caption overlay
- `CustomSlide` — accepts arbitrary children, escape hatch for one-offs

Consumers can register new types: `registerSlideType('quiz', QuizSlide)`. This is how the same component can later power in-product tutorials without being rewritten.

#### Shared concerns (stay inside the shell)

- Tap zones, gesture handling, long-press pause
- Progress bar logic and rendering
- Auto-advance timer and pause/resume
- Slide transitions
- Keyboard navigation (arrow keys for desktop)
- Analytics event emission (via the callback props, not directly tied to PostHog)
- Preloading the next slide's assets
- Reduced-motion preferences (`prefers-reduced-motion` disables transitions, keeps content)

#### Where it lives

- Package: `packages/stories/` (monorepo) or a private npm package if we want to share across repos
- Storybook for every slide type and slot renderer — non-negotiable. The team will use this for design review and QA.
- Unit tests for the timer, gesture, and analytics layers. Visual regression tests for transitions.

#### Future reuse cases (worth designing for now)

1. **Course intro stories** — each course has a 5-slide intro before the user starts
2. **Feature launch announcements** — in-product story bubbles when something new ships
3. **Onboarding flow** — first-time users see a 6-slide walkthrough
4. **Comparison page deep-dive** — could be a longer Stories sequence linked from Slide 7
5. **Expert profiles** — when a human joins, show a 3-slide intro to that expert

Designing this as a generic component now costs maybe 30% more dev time on Phase 0 but pays off the first time we need it again — which, given the list above, will be within weeks.

### 5.6 Brand Component

The name "Supr Skills" and its logo must **never** be hardcoded in slide content, captions, page chrome, or copy. They live inside a single `<Brand />` component, and every appearance of the brand on the site is a render of that component.

#### Why this matters

- **Renames are real.** Early-stage names change. If the brand becomes "Supr", "SkillsAI", or anything else, we change one component — not 40 strings across the codebase.
- **Logo iterations are constant.** The mark will go through redesigns. One source of truth means one place to swap.
- **Locale variants.** Hindi or Telugu rollouts may want a transliterated wordmark. The component handles that with a `locale` prop.
- **Context-appropriate sizing.** The logo in a slide footer is not the logo in a CTA button is not the logo in an Open Graph image. The component knows.
- **Marketing experiments.** A/B testing the wordmark, trying a beta badge, or running a campaign-specific variant — all become trivial.

#### Public API

```
<Brand
  variant="wordmark" | "logomark" | "lockup" | "favicon"
  size="xs" | "sm" | "md" | "lg" | "xl"
  tone="default" | "inverse" | "monochrome"
  withTagline={false}
  locale="en" | "hi" | "te"
  as="span" | "h1" | "a"   // semantic element
  href?: string             // if `as="a"`, links somewhere
/>
```

#### Variants explained

- **`wordmark`** — the name as styled text. Default for headers and most copy mentions.
- **`logomark`** — the icon/symbol only. For favicons, app icons, small UI moments.
- **`lockup`** — wordmark + logomark together. For hero placements, footer, OG images.
- **`favicon`** — optimized small-size logomark for browser tabs.

#### Usage rules

- **Never write the brand name as a plain string in JSX, captions, or content.** Always use `<Brand />`. Linting can enforce this.
- **Slide captions can reference the brand via a token** — e.g., the `caption.text` field supports `{{brand}}` interpolation, which the renderer replaces with `<Brand variant="wordmark" />`. This keeps slide data files clean while still respecting the rule.
- **Page titles and meta tags** also pull from the Brand config, not hardcoded strings.
- **Email templates, transactional comms** — same component, same source of truth (once we have email infrastructure).

#### Source of truth

A single `brand.config.ts` file holds:

```
{
  name: 'Supr Skills',
  shortName: 'Supr',
  tagline: 'The future of learning is one tap away.',
  wordmarkAssets: { default, inverse, monochrome },
  logomarkAssets: { default, inverse, monochrome },
  colors: { primary, secondary, accent },
  locales: {
    hi: { name: '...', tagline: '...' },
    te: { name: '...', tagline: '...' }
  }
}
```

Everything brand-related — colors, type, assets, copy — flows from this file. Rebrands become a config change, not a search-and-replace operation.

#### Where it lives

- Package: `packages/brand/` alongside `packages/stories/`
- Storybook entries for every variant × size × tone combination
- A lint rule (custom ESLint) that flags string literals matching `/supr\s*skills/i` outside the brand package itself

#### One more thing worth doing now

While we're at it, the **tagline, the institutional partners list (MIT, CS50, etc.), and the price point** should all live in config files too — not in slide data, not in component code. Same reasoning. If "less than dinner" becomes "under ₹999/month" after Slide 7 A/B tests, that's a config change, not a content rewrite.

Suggested config files:
- `brand.config.ts` — name, logo, colors, tagline
- `partners.config.ts` — the institutional list (MIT, Harvard CS50, etc.)
- `pricing.config.ts` — current price point, urgency claims ("first 500 lifetime free"), waitlist count

---

## 6. Analytics & Success Metrics

Per-slide instrumentation is non-negotiable. We need to know exactly where people drop off.

### 6.1 Events to track

- `slide_viewed` (slide_index, duration_seen)
- `slide_skipped_forward` / `slide_skipped_back`
- `slide_paused` (duration_paused)
- `cta_tapped` (slide_index, cta_name)
- `video_completed` (slide_index, completion_percent)
- `flow_completed` (reached Slide 9)
- `waitlist_submitted` (with utm source)
- `comparison_page_opened` (from Slide 7)

### 6.2 North-star metrics

| Metric | Target (Month 1) |
|---|---|
| Slide 9 completion rate | 35% of unique visitors |
| Waitlist conversion | 12% of unique visitors |
| Slide 4 video completion | 60%+ |
| Slide 6 video completion | 50%+ |
| Median time on page | 30-45 seconds |

### 6.3 What to A/B test

- Slide 7 punchline — *"less than dinner"* vs *"under ₹999/month"* vs *"a fraction of the cost"*
- Slide 1 hook — current vs alternatives
- CTA button copy on Slide 9 — *Join the waitlist* vs *Reserve my spot* vs *Get early access*
- Auto-advance timing — current vs +1s on each slide

---

## 7. Phased Build Plan

### Phase 0 — Foundation (Week 1)
- Verify Node 22+ on all dev environments and CI (Astro 6 requirement)
- Set up Astro 6 project with React integration, configure Cloudflare Workers adapter, deploy pipeline, analytics scaffolding
- Add Tailwind CSS via `npx astro add tailwind`; wire `tailwind.config.ts` to import design tokens from `brand.config.ts`; define custom `phone` and `frame` breakpoints
- Set up the `stories` and `brand` packages (monorepo or private packages) with Storybook
- Build the `<Brand />` component with all variants, sizes, tones; wire `brand.config.ts`, `partners.config.ts`, `pricing.config.ts`
- Build the reusable Stories component: data-driven, slot-based, headless API
- Implement built-in slot renderers: Text, Image, Video, Split, ThreeD, Custom
- Implement core interactions: tap zones, progress bars, auto-advance, pause-on-hold, keyboard nav
- Implement transitions (cross-fade + slide-from-right) with Framer Motion
- Define `landing-slides.ts` data file with the 9 slides as placeholder content (uses `{{brand}}` interpolation where needed)
- Wire analytics callbacks (no PostHog coupling yet — just the event surface)
- Set up the ESLint rule that flags hardcoded brand-name strings outside the brand package

### Phase 1 — Content + Static Visuals (Week 2)
- Design and produce the 8 caption treatments
- Source/produce the institutional badges, portraits, gradient backgrounds
- Record placeholder videos for Slides 4 and 6 (can be screen recordings of an early product mock)
- Wire up all CTAs to waitlist form and modal

### Phase 2 — The 3D Buddy v1 (Week 3-4)
- Model and rig the 3D buddy (or commission it — recommend Ready Player Me as a starting base, then customize)
- Implement idle animation loop with React Three Fiber
- Add slide-transition reactions (head nod, blink)
- Optional: Slide 1 spoken tagline with lip-sync (muted default)

### Phase 3 — Real Demo Videos (Week 4-5)
- Once the actual product has the buddy + cam detection + expert handoff working at minimum quality
- Film the Slide 4 demo (buddy reacting to confused user)
- Film the Slide 6 demo (user shipping mobile app)
- Edit to under 15 seconds each, optimize for autoplay on mobile

### Phase 4 — Polish + Launch (Week 6)
- A/B test framework wired up
- Comparison page built (linked from Slide 7)
- 60-second tour video produced (linked from Slide 9)
- Performance audit, accessibility pass, cross-browser testing
- Soft launch to a small audience, watch the funnel for a week, iterate
- Public launch

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| 3D buddy slows page load and hurts SEO | Lazy-load buddy after first paint; static image fallback for first 500ms |
| Auto-advance feels pushy on info-dense slides (4, 6, 7) | Test timing with real users; build the "tap to pause" hint; let users disable auto-advance |
| Videos don't autoplay on iOS Safari | Ensure videos are muted, inline, and use `playsInline` attribute |
| AI buddy in demo videos looks fake | Use real product footage as soon as Phase 3 is ready; don't ship aspirational mockups as if they're live |
| Webcam consent on the actual product scares users | Make the landing page promise clear: "everything stays on your device" — but only when users get to the product, not on the landing page itself |
| Competitors copy the format | The format isn't the moat — the AI buddy + expert combo is. Ship faster, iterate on buddy capabilities |

---

## 9. Open Questions

These need answers before Phase 1 wraps:

1. **Price point confirmation** — Is "less than dinner" defensible? What's the actual subscription cost? This locks Slide 7 copy.
2. **First 500 lifetime free** — Is this real? If yes, it's a strong urgency lever. If not, remove from Slide 9.
3. **Buddy voice direction** — Male, female, neutral? Indian accent or international? This affects TTS provider and casting.
4. **Demo video timeline** — When will the product have enough functionality to film real demos for Slides 4 and 6? This is the biggest schedule risk.
5. **Expert network readiness** — How many human experts are on standby at launch? Slide 5's promise needs to be real on day one.

---

## 10. Out of Scope (For Now)

Deliberately not building in v1:
- Testimonials (no real users yet — fake testimonials destroy trust)
- Pricing page (free positioning + waitlist makes this unnecessary)
- Blog or content marketing
- Founder story / About page
- Detailed feature lists or course catalog
- Multi-language landing pages (English-first; localize after Phase 1 metrics validate)

These can come once the waitlist is converting and we have real users to feature.

---

*Last updated: May 22, 2026*