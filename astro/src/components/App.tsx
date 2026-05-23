import { useCallback, useEffect, useState } from 'react';
import { StoriesShell } from './StoriesShell';
import { SLIDES } from './Slides';
import { FitStage } from './FitStage';
import { Toast } from './Toast';

const CTA_LABELS: Record<string, string> = {
  'see-it-live': 'Demo modal would open',
  'start-building': 'Waitlist would open',
  compare: 'Comparison page would open',
  waitlist: 'Joining the waitlist…',
  tour: '60-second tour would play',
};

// Root client island — composes the phone frame, stage chrome, and Stories
// shell. Mounts via `<App client:load />` from src/pages/index.astro.
//
// Why an island and not the whole page: per plan §5.1.1, Astro ships zero JS
// by default. Captions, gradients, and the page chrome live in static HTML;
// only the interactive surface (the Stories experience) hydrates as React.
export default function App() {
  const [toast, setToast] = useState<string | null>(null);

  // Coral + purple are read by the brand-mark gradient in StoriesShell.
  // In the production app they come from brand.config tokens; this effect
  // exists so Phase 2 can introduce a runtime accent override (e.g. via a
  // future settings panel) without restructuring the gradient consumers.
  useEffect(() => {
    document.documentElement.style.setProperty('--coral', '#FF7A59');
    document.documentElement.style.setProperty('--purple', '#6F5CF4');
  }, []);

  const handleCTA = useCallback((id: string) => {
    setToast(CTA_LABELS[id] ?? id);
    // TODO Phase 1: wire to PostHog / Mixpanel via analytics callback.
    // The Stories shell already exposes onCTA — analytics is a one-line add.
  }, []);

  return (
    <>
      <div className="stage-backdrop fixed inset-0 grid place-items-center p-6 frame:p-6 phone:p-0 overflow-hidden">
        <div className="stage-noise absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay" />

        {/* Desktop chrome — hidden on mobile breakpoint */}
        <div className="absolute left-8 bottom-7 z-[5] font-mono text-[11px] uppercase tracking-wider text-cream/40 max-w-[220px] phone:hidden">
          <strong className="text-cream/70 font-medium">Supr Skills</strong> · Stories-format landing
          <br />
          v0.2 · Astro 6 + React + Tailwind
        </div>
        <div className="absolute right-8 bottom-7 z-[5] flex gap-[18px] font-mono text-[11px] uppercase tracking-wider text-cream/50 phone:hidden">
          <span>
            <kbd className="inline-block font-mono px-[7px] py-[3px] mr-1.5 border border-cream/20 rounded text-cream bg-cream/5 text-[10px]">
              ←
            </kbd>
            <kbd className="inline-block font-mono px-[7px] py-[3px] mr-1.5 border border-cream/20 rounded text-cream bg-cream/5 text-[10px]">
              →
            </kbd>
            navigate
          </span>
          <span>
            <kbd className="inline-block font-mono px-[7px] py-[3px] mr-1.5 border border-cream/20 rounded text-cream bg-cream/5 text-[10px]">
              Space
            </kbd>
            pause
          </span>
        </div>

        {/* Phone frame — letterboxed on desktop, full-bleed on mobile.
            FitStage scales the inner 388×858 design to fill whatever the
            frame ends up being so nothing scrolls on any screen. */}
        <div className="relative bg-[#0a0510] overflow-hidden w-[400px] h-[870px] rounded-[52px] shadow-phone phone:w-screen phone:h-[100dvh] phone:rounded-none phone:shadow-none">
          <div className="absolute left-1/2 top-3.5 -translate-x-1/2 w-[116px] h-8 bg-black rounded-[18px] z-[60] pointer-events-none phone:hidden" />
          <div className="absolute inset-1.5 rounded-[46px] overflow-hidden bg-ink phone:inset-0 phone:rounded-none">
            <FitStage>
              <StoriesShell slides={SLIDES} onCTA={handleCTA} />
            </FitStage>
          </div>
        </div>
      </div>

      <Toast message={toast} onDone={() => setToast(null)} />
    </>
  );
}
