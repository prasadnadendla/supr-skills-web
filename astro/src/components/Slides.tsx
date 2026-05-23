// All 9 slides for the Supr Skills landing story.
// Per plan §5.1.2: layout/spacing/typography/colors → Tailwind utilities.
// Complex one-off styling (gradient meshes, AI buddy, portrait shoulders,
// keyframes) lives in src/styles/global.css.
//
// In Phase 0 of the real build, each slide becomes a separate file under
// src/components/slides/ and gets a Storybook entry. For now they live
// together for readability.

import { useEffect, useState, type ReactNode } from 'react';
import { Buddy } from './Buddy';
import type { SlideDef, SlideRenderProps } from './StoriesShell';
import { brandConfig } from '@/config/brand.config';

// ---------- shared classes ----------
const SLIDE_ROOT = 'absolute inset-0 pt-24 pb-[110px] px-[26px] flex flex-col';
const EYEBROW = 'font-mono text-[10px] tracking-[0.18em] uppercase text-cream/55 m-0';
const CAPTION = 'font-display font-medium text-[26px] leading-[1.12] tracking-tight text-cream text-balance m-0';
const HEADLINE = 'font-display font-semibold leading-none tracking-tight text-balance text-cream m-0';

// ---------- helpers ----------
function LetterReveal({ text, delay = 0, step = 22 }: { text: string; delay?: number; step?: number }) {
  return (
    <span className="lbl">
      {text.split('').map((ch, i) => (
        <span key={i} style={{ animationDelay: delay + i * step + 'ms' }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

interface Slide9Props extends SlideRenderProps {
  ctaCopy?: string;
}

// ============================================================
// SLIDE 1 — The Hook
// ============================================================
function Slide1({ active }: SlideRenderProps) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!active) {
      setBeat(0);
      return;
    }
    const t = setTimeout(() => setBeat(1), 1700);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className={`${SLIDE_ROOT} bg-mesh-1 drift items-center justify-center text-center`}>
      <span className="absolute top-24 left-[26px] font-mono text-[10px] tracking-[0.16em] uppercase text-cream/60">
        // THE FUTURE OF LEARNING
      </span>
      <h1
        className={`${HEADLINE} text-[54px] absolute left-[26px] right-[26px] top-1/2 -translate-y-1/2 ${
          beat === 0 ? 'beat-in' : 'beat-out'
        }`}
      >
        {active && beat === 0 && <LetterReveal text="The AI race won't wait." />}
      </h1>
      <h1
        className={`${HEADLINE} text-[54px] absolute left-[26px] right-[26px] top-1/2 -translate-y-1/2 ${
          beat === 1 ? 'beat-in' : ''
        }`}
        style={{ opacity: beat === 1 ? undefined : 0 }}
      >
        {active && beat === 1 && (
          <>
            <LetterReveal text="Neither should " />
            <em className="font-serif italic font-normal text-coral-soft tracking-tight">
              <LetterReveal text="you." delay={300} />
            </em>
          </>
        )}
      </h1>
    </div>
  );
}

// ============================================================
// SLIDE 2 — The Promise
// ============================================================
function Slide2(_: SlideRenderProps) {
  return (
    <div className={`${SLIDE_ROOT} bg-warm-night items-center justify-center text-center`}>
      <div className="relative h-[360px] w-full flex items-center justify-center mt-3 mb-9">
        <div className="absolute left-6 top-[60px]">
          <Buddy size="md" mood="idle" />
        </div>
        <div
          className="absolute right-1 top-20 w-[200px] rounded-xl bg-aubergine border border-cream/15 p-[7px] float-laptop"
          style={{ boxShadow: '0 20px 50px -20px rgba(111, 92, 244, 0.5)' }}
        >
          <div
            className="lecture-frame relative rounded-[7px] overflow-hidden aspect-[16/10]"
            style={{ background: 'linear-gradient(135deg, #2a1a4a, #4b3cd4)' }}
          >
            <div className="absolute left-[8%] right-[8%] bottom-[10%] h-[3px] bg-white/20 rounded-sm">
              <div className="absolute left-0 top-0 w-[38%] h-full bg-coral rounded-sm" />
            </div>
          </div>
        </div>
      </div>
      <p className={CAPTION}>
        Learning, <em className="font-serif italic font-normal">finally</em>
        <br />
        with a companion.
      </p>
    </div>
  );
}

// ============================================================
// SLIDE 3 — World-Class Foundation
// ============================================================
function Slide3({ active }: SlideRenderProps) {
  type Badge = { mark: string; label: string; sub: string; bg: string; style?: React.CSSProperties };
  const badges: Badge[] = [
    { mark: 'M', label: brandConfig.partners[0].name, sub: brandConfig.partners[0].sub, bg: 'bg-[#8B0000] text-cream' },
    { mark: 'cs', label: brandConfig.partners[1].name, sub: brandConfig.partners[1].sub, bg: 'bg-ink text-coral border border-coral/40' },
    {
      mark: '⌘',
      label: brandConfig.partners[2].name,
      sub: brandConfig.partners[2].sub,
      bg: 'text-cream',
      style: { background: 'linear-gradient(135deg, #FF7A59, #6F5CF4)' },
    },
  ];

  return (
    <div className={`${SLIDE_ROOT} bg-warm-night`}>
      <p className={`${EYEBROW} mt-2.5`}>// The curriculum</p>
      <p className={`${CAPTION} mt-6`}>
        The world's best courses.
        <br />
        <em className="font-serif italic font-normal">Always</em> free.
      </p>
      <div className="mt-9 flex flex-col gap-4" key={active ? 'a' : 'b'}>
        {badges.map((b, i) => (
          <div
            key={b.label}
            className="stagger-in flex items-center gap-4 px-[18px] py-[18px] bg-cream/5 border border-cream/10 rounded-[18px] backdrop-blur"
            style={{ animationDelay: 0.2 + i * 0.3 + 's' }}
          >
            <div
              className={`w-[52px] h-[52px] rounded-xl grid place-items-center font-serif italic text-[24px] font-normal flex-shrink-0 ${b.bg}`}
              style={b.style}
            >
              {b.mark}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-[16px] text-cream tracking-tight">{b.label}</div>
              <div className="font-mono text-[11px] text-cream/55 tracking-[0.04em] mt-0.5">{b.sub}</div>
            </div>
            <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-coral px-2.5 py-[5px] border border-coral/40 rounded-md flex-shrink-0">
              Free
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SLIDE 4 — Buddy in Action (lecture player)
// ============================================================
function Slide4({ onCTA }: SlideRenderProps) {
  return (
    <div className={`${SLIDE_ROOT} bg-deep`}>
      <p className={EYEBROW}>// AI buddy · live</p>
      <div
        className="w-full mt-7 rounded-[20px] border border-cream/15 overflow-hidden flex flex-col aspect-[9/14]"
        style={{ background: 'linear-gradient(180deg, #1c103c, #0e0822)' }}
      >
        <div className="flex-1 relative overflow-hidden bg-lecture-frame">
          {/* Lecture board */}
          <div className="absolute top-4 left-4 right-4 bottom-[110px] rounded-[10px] bg-ink/40 border border-cream/10 p-4 flex flex-col gap-2 backdrop-blur-sm">
            <span className="h-1.5 w-[90%] rounded-sm bg-cream/25" />
            <span className="h-1.5 w-[70%] rounded-sm bg-cream/25" />
            <span className="h-1.5 w-[90%] rounded-sm bg-coral" style={{ boxShadow: '0 0 14px #FF7A59' }} />
            <span className="h-1.5 w-[50%] rounded-sm bg-cream/25" />
            <div className="mt-3 self-start font-mono text-[12px] text-coral-soft px-2.5 py-2 border border-dashed border-coral/40 rounded-md">
              ∂L/∂w = −(y − ŷ) · x
            </div>
            <span className="h-1.5 w-[70%] rounded-sm bg-cream/25 mt-1" />
          </div>
          {/* Webcam tile */}
          <div
            className="absolute top-3.5 right-3.5 w-[76px] h-[100px] rounded-[10px] border border-cream/20 overflow-hidden flex items-end justify-center pb-2"
            style={{ background: 'linear-gradient(180deg, #2a1a4a, #14082a)' }}
          >
            <div className="relative mb-2">
              <div
                className="w-[46px] h-[46px] rounded-full"
                style={{ background: 'linear-gradient(135deg, #F4C16B, #e07a3a)' }}
              />
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-[70px] h-[30px] rounded-t-[30px] bg-[#5a3a22]" />
            </div>
            <span className="absolute bottom-[5px] left-[6px] font-mono text-[9px] text-cream/70">YOU</span>
            <span
              className="absolute top-[6px] right-[6px] w-[7px] h-[7px] rounded-full bg-coral"
              style={{ boxShadow: '0 0 8px #FF7A59' }}
            />
          </div>
          {/* Buddy bubble */}
          <div className="absolute left-3 bottom-[110px] flex items-end gap-2.5 max-w-[78%]">
            <Buddy size="sm" mood="listen" className="flex-shrink-0 !w-14 !h-14" />
            <div className="bg-cream text-ink rounded-[18px] rounded-bl-[4px] px-3 py-2.5 text-[12.5px] leading-[1.32] font-medium text-balance shadow-glow-coral">
              Looked like you replayed that — want me to break it down?
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="px-4 py-3 bg-ink/70 border-t border-cream/10 flex items-center gap-3">
          <div className="w-[30px] h-[30px] rounded-full bg-cream text-ink grid place-items-center text-[11px]">▶</div>
          <div className="scrubber-paused-tag flex-1 relative h-[3px] bg-cream/[0.18] rounded-sm">
            <div className="absolute left-0 top-0 h-full w-[32%] bg-coral rounded-sm" />
          </div>
          <div className="font-mono text-[10px] text-cream/55 tracking-wider">08:42</div>
        </div>
      </div>
      <p className={`${CAPTION} mt-4`}>
        Confused? <em className="font-serif italic font-normal">It already knows.</em>
      </p>
      <button
        type="button"
        onClick={() => onCTA?.('see-it-live')}
        className="absolute right-5 bottom-9 inline-flex items-center gap-2 font-display font-medium text-[14px] px-[18px] py-3 rounded-full bg-cream/10 border border-cream/25 text-cream hover:bg-cream/15 backdrop-blur transition pointer-events-auto"
      >
        See it live <span>→</span>
      </button>
    </div>
  );
}

// ============================================================
// SLIDE 5 — Real Humans, On Standby
// ============================================================
function Slide5(_: SlideRenderProps) {
  return (
    <div className={`${SLIDE_ROOT} bg-deep`}>
      <p className={EYEBROW}>// When AI hits its limit</p>
      <div className="flex items-end gap-2 mt-3 h-[280px] relative">
        <div
          className="flex-1 h-full rounded-[18px] border border-cream/10 relative overflow-hidden flex items-end justify-center p-4"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(111, 92, 244, 0.4), transparent 60%), linear-gradient(180deg, #1c103c, #0e0822)',
          }}
        >
          <span className="absolute top-3 left-3.5 font-mono text-[9px] tracking-[0.14em] uppercase text-cream/70">
            AI Buddy
          </span>
          <span className="absolute top-3 right-3.5 w-[7px] h-[7px] rounded-full bg-cream/40" />
          <Buddy size="sm" mood="dim" />
        </div>
        <div
          className="flex-1 h-full rounded-[18px] border border-cream/10 relative overflow-hidden flex items-end justify-center p-4 shadow-ring-teal"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(93, 217, 193, 0.3), transparent 60%), linear-gradient(180deg, #102c2a, #061a18)',
          }}
        >
          <span className="absolute top-3 left-3.5 font-mono text-[9px] tracking-[0.14em] uppercase text-cream/70">
            Expert · Live
          </span>
          <span
            className="absolute top-3 right-3.5 w-[7px] h-[7px] rounded-full bg-teal"
            style={{ boxShadow: '0 0 10px #5DD9C1' }}
          />
          <div
            className="absolute inset-x-6 top-8 bottom-[60px] rounded-xl overflow-hidden flex items-end justify-center"
            style={{ background: 'linear-gradient(180deg, #2a1a3a, #0a0517)' }}
          >
            <div className="expert-portrait mb-7">
              <div
                className="w-[90px] h-[90px] rounded-full"
                style={{ background: 'linear-gradient(135deg, #d8a890, #8b5a45)' }}
              />
            </div>
          </div>
          <span className="absolute bottom-3 left-3.5 font-display font-semibold text-[13px] text-cream">Priya R.</span>
          <span className="absolute bottom-3.5 right-3.5 font-mono text-[9px] tracking-wider uppercase text-teal">
            ML · 8 yrs
          </span>
        </div>
      </div>
      <p className={`${CAPTION} mt-7`}>
        When AI isn't enough,
        <br />
        <em className="font-serif italic font-normal">a human is.</em>
      </p>
    </div>
  );
}

// ============================================================
// SLIDE 6 — Ship Something Real
// ============================================================
function Slide6({ active, onCTA }: SlideRenderProps) {
  const codeLines: ReactNode[] = [
    <>
      <span className="text-coral">import</span> {'{ '}useState{' }'} <span className="text-coral">from</span>{' '}
      <span className="text-teal">"react"</span>
    </>,
    <span className="text-cream/35 italic">{'// your first screen'}</span>,
    <>
      <span className="text-coral">export default function</span> <span className="text-gold">App</span>() {'{'}
    </>,
    <>
      {'  '}
      <span className="text-coral">const</span> [city, setCity] = <span className="text-gold">useState</span>(
      <span className="text-teal">"Hyderabad"</span>)
    </>,
    <>
      {'  '}
      <span className="text-coral">return</span> (
    </>,
    <>
      {'    '}
      {'<'}
      <span className="text-gold">Card</span> title={'{'}city{'}'} /{'>'}
    </>,
    <>{'  '})</>,
    <>{'}'}</>,
  ];

  return (
    <div className={`${SLIDE_ROOT} bg-warm-night`}>
      <p className={EYEBROW}>// Build · week 1</p>
      <div className="mt-6 grid gap-3.5 h-[380px]" style={{ gridTemplateColumns: '1fr 132px' }} key={active ? 'a' : 'b'}>
        {/* Code window */}
        <div className="rounded-[14px] bg-aubergine border border-cream/12 p-3.5 font-mono text-[10.5px] leading-[1.65] text-cream overflow-hidden relative">
          <span className="absolute top-1 right-3 font-mono text-[9px] tracking-wider text-cream/40">App.tsx</span>
          {codeLines.map((line, i) => (
            <span key={i} className="block fade-in" style={{ animationDelay: 0.4 + i * 0.2 + 's' }}>
              {line}
            </span>
          ))}
        </div>
        {/* Mini phone */}
        <div className="rounded-[22px] bg-black border-2 border-[#2a1f3d] p-1.5 relative overflow-hidden">
          <div
            className="rounded-[16px] h-full px-2.5 pt-3.5 pb-3.5 flex flex-col relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #F7F1E8, #EFE5D2)' }}
          >
            <span className="font-display font-bold text-[13px] text-ink tracking-tight">Tiffin</span>
            <span className="text-[9px] text-ink/55 mt-0.5">today's plate</span>
            {['Hyderabad', 'Order #042', 'Rider'].map((t, i) => (
              <div
                key={t}
                className="fade-in mt-2.5 bg-cream border border-ink/10 rounded-lg p-2 flex flex-col gap-1"
                style={{ animationDelay: 1.0 + i * 0.4 + 's' }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #FF7A59, #6F5CF4)' }}
                  />
                  <span className="text-[10px] font-semibold text-ink">{t}</span>
                </div>
                <span className="h-1 bg-ink/10 rounded-sm" />
                {i === 0 && <span className="h-1 w-[60%] bg-ink/10 rounded-sm" />}
              </div>
            ))}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.12em] uppercase text-coral flex items-center gap-1">
              <span
                className="w-1.5 h-1.5 rounded-full bg-coral pulse-coral"
                style={{ boxShadow: '0 0 6px #FF7A59' }}
              />
              Live
            </div>
          </div>
        </div>
      </div>
      <p className={`${CAPTION} mt-5`}>
        Your first app.
        <br />
        <em className="font-serif italic font-normal">Before the week ends.</em>
      </p>
      <button
        type="button"
        onClick={() => onCTA?.('start-building')}
        className="absolute right-5 bottom-9 inline-flex items-center gap-2 font-display font-medium text-[14px] px-[18px] py-3 rounded-full bg-cream text-ink hover:bg-coral hover:text-cream transition pointer-events-auto"
      >
        Start building <span>→</span>
      </button>
    </div>
  );
}

// ============================================================
// SLIDE 7 — The Reframe
// ============================================================
function Slide7({ active, onCTA }: SlideRenderProps) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!active) {
      setBeat(0);
      return;
    }
    const t = setTimeout(() => setBeat(1), 2200);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className={`${SLIDE_ROOT} bg-ink`}>
      <p className={EYEBROW}>// The math</p>
      <div className="mt-1 flex flex-col gap-3 h-[380px]">
        <div
          className="flex-1 rounded-[16px] overflow-hidden relative border border-cream/10 saturate-[0.2] flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #2a2a2a, #161616)' }}
        >
          <span className="absolute top-3 left-3.5 font-mono text-[9px] tracking-[0.14em] uppercase text-[#999]">
            Bootcamp · 24 wks
          </span>
          <div className="absolute inset-8 flex flex-col gap-2">
            {[0, 1, 2].map((i) => (
              <div className="flex items-center gap-2.5" key={i}>
                <div className="w-7 h-7 bg-[#444] rounded" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="h-[5px] bg-[#4a4a4a] rounded-sm" />
                  <div className="h-[5px] w-[60%] bg-[#4a4a4a] rounded-sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="font-display font-bold text-[30px] tracking-tight text-[#888] z-10">
            <span className="line-through decoration-[3px] decoration-coral">{brandConfig.pricing.bootcamp}</span>
          </div>
        </div>
        <div className="flex-1 rounded-[16px] overflow-hidden relative border border-cream/10 bg-reframe-bottom flex items-center justify-center">
          <span className="absolute top-3 left-3.5 font-mono text-[9px] tracking-[0.14em] uppercase text-cream/85">
            Supr Skills · forever
          </span>
          <div className="font-display font-bold text-[34px] tracking-tight text-cream text-center">
            Less than <em className="font-serif italic font-normal text-coral-soft">dinner.</em>
            <span className="block font-mono text-[10px] font-normal tracking-wider uppercase mt-2 text-cream/60">
              {brandConfig.pricing.supr}
            </span>
          </div>
        </div>
      </div>
      <p
        className={`${CAPTION} absolute left-[26px] right-[26px] bottom-36 text-[22px] text-left`}
        key={beat}
      >
        {beat === 0 ? (
          <>
            Bootcamps cost <em className="font-serif italic font-normal">lakhs.</em>
          </>
        ) : (
          <>
            This costs less than <em className="font-serif italic font-normal">dinner.</em>
          </>
        )}
      </p>
      <button
        type="button"
        onClick={() => onCTA?.('compare')}
        className="absolute left-[26px] bottom-[100px] font-display text-[13px] text-cream underline underline-offset-4 decoration-cream/40 hover:decoration-cream py-2 pointer-events-auto"
      >
        See how we compare →
      </button>
    </div>
  );
}

// ============================================================
// SLIDE 8 — Who It's For
// ============================================================
function Slide8({ active }: SlideRenderProps) {
  const cards = [
    {
      kind: 'grad',
      portrait: 'from-[#F4C16B] to-[#c08840]',
      shoulders: 'portrait-shoulders-purple',
      label: 'Graduates',
      sub: 'First job · 0–2 yrs',
    },
    {
      kind: 'student',
      portrait: 'from-[#d8a890] to-[#8b5a45]',
      shoulders: 'portrait-shoulders-coral',
      label: 'Students',
      sub: 'Final years · interns',
    },
    {
      kind: 'pro',
      portrait: 'from-[#e8c8a0] to-[#8a6a45]',
      shoulders: 'portrait-shoulders-teal',
      label: 'Engineers',
      sub: 'Upskilling · AI · ML',
    },
  ];
  return (
    <div className={`${SLIDE_ROOT} bg-warm-night`}>
      <p className={EYEBROW}>// Built for</p>
      <div className="mt-8 flex gap-3 h-[290px]" key={active ? 'a' : 'b'}>
        {cards.map((c, i) => (
          <div
            key={c.kind}
            className="stagger-in flex-1 rounded-[18px] border border-cream/10 px-3 py-4 flex flex-col items-center justify-end text-center"
            style={{
              animationDelay: 0.15 + i * 0.3 + 's',
              background: 'linear-gradient(180deg, rgba(111, 92, 244, 0.18), rgba(20, 12, 38, 0.4))',
            }}
          >
            <div className={`portrait ${c.shoulders} w-16 h-16 rounded-full mb-4 bg-gradient-to-br ${c.portrait}`} />
            <div className="font-display font-semibold text-[14px] text-cream tracking-tight">{c.label}</div>
            <div className="font-mono text-[10px] text-cream/55 mt-1 tracking-wider uppercase">{c.sub}</div>
          </div>
        ))}
      </div>
      <p className={`${CAPTION} mt-9`}>
        Built for engineers.
        <br />
        <em className="font-serif italic font-normal">Every stage.</em>
      </p>
    </div>
  );
}

// ============================================================
// SLIDE 9 — Final CTA (parks here)
// ============================================================
function Slide9({ onCTA, ctaCopy = 'Join the waitlist' }: Slide9Props) {
  return (
    <div className={`${SLIDE_ROOT} bg-mesh-1 drift items-center text-center`}>
      <div className="mt-2 mb-6">
        <Buddy size="lg" mood="idle" />
      </div>
      <h1 className={`${HEADLINE} text-[44px] text-center`}>
        The future of learning
        <br />
        is <em className="font-serif italic font-normal text-coral">one tap</em> away.
      </h1>
      <p className="mt-5 font-mono text-[13.5px] text-cream/65 tracking-wide text-center text-balance">
        First {brandConfig.scarcity.seats} learners get
        <br />
        <span className="text-cream">lifetime access. Free.</span>
      </p>
      <div className="mt-7 flex flex-col gap-2.5 w-full">
        <button
          type="button"
          onClick={() => onCTA?.('waitlist')}
          className="inline-flex items-center justify-center gap-2 font-display font-medium text-[14px] px-[18px] py-3.5 rounded-full bg-cream text-ink hover:bg-coral hover:text-cream transition pointer-events-auto"
        >
          {ctaCopy}
        </button>
        <button
          type="button"
          onClick={() => onCTA?.('tour')}
          className="inline-flex items-center justify-center gap-2 font-display font-medium text-[14px] px-[18px] py-3.5 rounded-full bg-cream/10 border border-cream/25 text-cream hover:bg-cream/15 backdrop-blur transition pointer-events-auto"
        >
          Watch the 60-second tour
        </button>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.16em] uppercase text-cream/35">
        tap left to revisit
      </div>
    </div>
  );
}

// Slide registry — index aligns with progress bar segments
export const SLIDES: SlideDef[] = [
  { id: 'hook', Comp: Slide1, duration: 3500 },
  { id: 'promise', Comp: Slide2, duration: 4000 },
  { id: 'foundation', Comp: Slide3, duration: 4500 },
  { id: 'buddy', Comp: Slide4, duration: 7000 },
  { id: 'humans', Comp: Slide5, duration: 4000 },
  { id: 'ship', Comp: Slide6, duration: 6500 },
  { id: 'reframe', Comp: Slide7, duration: 5500 },
  { id: 'who', Comp: Slide8, duration: 4500 },
  { id: 'cta', Comp: Slide9, duration: 99999, parkOnArrival: true },
];
