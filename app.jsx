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
    <div style={{
      position: 'fixed',
      left: '50%', bottom: '40px', transform: 'translateX(-50%)',
      padding: '12px 18px',
      background: 'rgba(20, 12, 38, 0.92)',
      color: 'var(--cream)',
      borderRadius: '999px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      letterSpacing: '0.04em',
      border: '1px solid rgba(247,241,232,0.18)',
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    }}>
      {message}
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--coral', t.accent);
    // soft variant
    const lighten = (hex) => {
      // crude lighten: take hex, push toward white 30%
      const h = hex.replace('#','');
      const r = parseInt(h.substring(0,2), 16);
      const g = parseInt(h.substring(2,4), 16);
      const b = parseInt(h.substring(4,6), 16);
      const lr = Math.round(r + (255 - r) * 0.35);
      const lg = Math.round(g + (255 - g) * 0.35);
      const lb = Math.round(b + (255 - b) * 0.35);
      return '#' + lr.toString(16).padStart(2,'0') + lg.toString(16).padStart(2,'0') + lb.toString(16).padStart(2,'0');
    };
    document.documentElement.style.setProperty('--coral-soft', lighten(t.accent));
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
      <div className="stage">
        <div className="stage-bg-noise" />
        {t.showStageChrome && (
          <>
            <div className="stage-meta">
              <strong>Supr Skills</strong> · Stories-format landing<br/>
              v0.1 · React + Astro target
            </div>
            <div className="stage-help">
              <span><kbd>←</kbd>/<kbd>→</kbd> navigate</span>
              <span><kbd>Space</kbd> pause</span>
            </div>
          </>
        )}
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-screen">
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
  const [resetKey, setResetKey] = useState(0);
  const resetStory = () => {
    try { localStorage.removeItem('supr_slide'); localStorage.removeItem('supr_hint_seen'); } catch(e) {}
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
