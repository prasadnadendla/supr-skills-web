// Supr Skills — main app composition

const { useState, useEffect, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FF7A59",
  "ctaCopy": "Join the waitlist",
  "showStageChrome": true
}/*EDITMODE-END*/;

function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [message, onDone]);
  if (!message) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-10 px-[18px] py-3 bg-[rgba(20,12,38,0.92)] text-cream rounded-full font-mono text-xs tracking-wide border border-cream/20 z-[100] backdrop-blur-md">
      {message}
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Both --coral and --purple are read by the brand-mark gradient in shell.jsx.
    // We also drive Tailwind's coral via CSS variable fallback in the inline styles
    // that reference it; everything else uses the static palette from brand.config.
    document.documentElement.style.setProperty('--coral', t.accent);
    document.documentElement.style.setProperty('--purple', '#6F5CF4');
  }, [t.accent]);

  const handleCTA = useCallback((id) => {
    const labels = {
      'see-it-live': 'Demo modal would open',
      'start-building': 'Waitlist would open',
      'compare': 'Comparison page would open',
      'waitlist': 'Joining ' + t.ctaCopy + '…',
      'tour': '60-second tour would play',
    };
    setToast(labels[id] || id);
  }, [t.ctaCopy]);

  return (
    <>
      <div className="stage-backdrop fixed inset-0 grid place-items-center p-6 frame:p-6 phone:p-0">
        <div className="stage-noise absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay" />

        {t.showStageChrome && (
          <>
            <div className="absolute left-8 bottom-7 z-[5] font-mono text-[11px] uppercase tracking-wider text-cream/40 max-w-[220px] phone:hidden">
              <strong className="text-cream/70 font-medium">Supr Skills</strong> · Stories-format landing
              <br/>v0.2 · Astro 6 + React + Tailwind
            </div>
            <div className="absolute right-8 bottom-7 z-[5] flex gap-[18px] font-mono text-[11px] uppercase tracking-wider text-cream/50 phone:hidden">
              <span>
                <kbd className="inline-block font-mono px-[7px] py-[3px] mr-1.5 border border-cream/20 rounded text-cream bg-cream/5 text-[10px]">←</kbd>
                <kbd className="inline-block font-mono px-[7px] py-[3px] mr-1.5 border border-cream/20 rounded text-cream bg-cream/5 text-[10px]">→</kbd>
                navigate
              </span>
              <span>
                <kbd className="inline-block font-mono px-[7px] py-[3px] mr-1.5 border border-cream/20 rounded text-cream bg-cream/5 text-[10px]">Space</kbd>
                pause
              </span>
            </div>
          </>
        )}

        {/* Phone frame — letterboxed on desktop, full-bleed on mobile */}
        <div className="relative bg-[#0a0510] overflow-hidden
                        w-[400px] h-[870px] rounded-[52px] shadow-phone
                        phone:w-screen phone:h-[100dvh] phone:rounded-none phone:shadow-none">
          <div className="absolute left-1/2 top-3.5 -translate-x-1/2 w-[116px] h-8 bg-black rounded-[18px] z-[60] pointer-events-none phone:hidden" />
          <div className="absolute inset-1.5 rounded-[46px] overflow-hidden bg-ink
                          phone:inset-0 phone:rounded-none">
            <StoriesShell slides={SLIDES} onCTA={handleCTA} slideProps={{ ctaCopy: t.ctaCopy }} />
          </div>
        </div>
      </div>

      <Toast message={toast} onDone={() => setToast(null)} />

      <TweaksUI t={t} setTweak={setTweak} />
    </>
  );
}

function TweaksUI({ t, setTweak }) {
  const resetStory = () => {
    try {
      localStorage.removeItem('supr_slide');
      localStorage.removeItem('supr_hint_seen');
    } catch (e) {}
    window.location.reload();
  };
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Brand">
        <TweakColor
          label="Accent"
          value={t.accent}
          onChange={(v) => setTweak('accent', v)}
          options={['#FF7A59', '#6F5CF4', '#5DD9C1', '#F4C16B']}
        />
      </TweakSection>
      <TweakSection title="Final CTA (slide 9)">
        <TweakRadio
          label="Button copy"
          value={t.ctaCopy}
          onChange={(v) => setTweak('ctaCopy', v)}
          options={[
            { value: 'Join the waitlist', label: 'Join waitlist' },
            { value: 'Reserve my spot', label: 'Reserve spot' },
            { value: 'Get early access', label: 'Early access' },
          ]}
        />
      </TweakSection>
      <TweakSection title="Stage">
        <TweakToggle
          label="Show desktop chrome"
          value={t.showStageChrome}
          onChange={(v) => setTweak('showStageChrome', v)}
        />
        <TweakButton onClick={resetStory}>Restart story from slide 1</TweakButton>
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
