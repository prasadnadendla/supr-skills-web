// Stories shell — data-driven, headless-ish.
// Manages slide index, progress, auto-advance, tap zones, pause-on-hold.

const { useState, useEffect, useRef, useCallback } = React;

function ProgressBar({ slides, index, progress }) {
  return (
    <div className="absolute top-0 inset-x-0 z-40 flex gap-1 px-4 pt-3.5 pb-1.5 pointer-events-none">
      {slides.map((s, i) => {
        const done = i < index;
        const active = i === index;
        const w = done ? 100 : active ? progress * 100 : 0;
        return (
          <div key={s.id} className="flex-1 h-[3px] bg-white/20 rounded-sm overflow-hidden">
            <span
              className="block h-full bg-cream rounded-sm"
              style={{ width: w + "%", transition: "width 90ms linear" }}
            />
          </div>
        );
      })}
    </div>
  );
}

function StoriesShell({ slides, onCTA, slideProps = {} }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const startRef = useRef(null);
  const elapsedRef = useRef(0);
  const rafRef = useRef(null);
  const holdTimerRef = useRef(null);

  const current = slides[index];
  const parked = current?.parkOnArrival;

  // First-visit hint
  useEffect(() => {
    try {
      const seen = localStorage.getItem('supr_hint_seen');
      if (!seen) {
        setHintShown(true);
        localStorage.setItem('supr_hint_seen', '1');
        const t = setTimeout(() => setHintShown(false), 5000);
        return () => clearTimeout(t);
      }
    } catch (e) {}
  }, []);

  // Restore last slide
  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem('supr_slide') || '0', 10);
      if (saved >= 0 && saved < slides.length) setIndex(saved);
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try { localStorage.setItem('supr_slide', String(index)); } catch (e) {}
  }, [index]);

  // Reset elapsed on slide change
  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
    startRef.current = null;
  }, [index]);

  // Auto-advance
  useEffect(() => {
    if (paused || parked) {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      return;
    }
    const dur = current.duration;
    const tick = (t) => {
      if (startRef.current == null) startRef.current = t - elapsedRef.current;
      const e = t - startRef.current;
      elapsedRef.current = e;
      const p = Math.min(1, e / dur);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => Math.min(slides.length - 1, i + 1));
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, paused, parked, current, slides.length]);

  const next = useCallback(() => setIndex((i) => Math.min(slides.length - 1, i + 1)), [slides.length]);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const onPointerDown = useCallback((dir) => (e) => {
    holdTimerRef.current = setTimeout(() => {
      setPaused(true);
      holdTimerRef.current = null;
    }, 220);
  }, []);
  const onPointerUp = useCallback((dir) => (e) => {
    const isHoldRelease = holdTimerRef.current == null;
    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
    if (isHoldRelease) setPaused(false);
    else if (dir === 'left') prev();
    else next();
  }, [next, prev]);
  const onPointerCancel = useCallback(() => {
    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
    setPaused(false);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col">
      <ProgressBar slides={slides} index={index} progress={progress} />

      {/* Header */}
      <div className="absolute top-8 inset-x-0 z-40 flex items-center justify-between px-[18px] py-2 pointer-events-none">
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="w-7 h-7 rounded-[9px] grid place-items-center shadow-[0_8px_24px_-8px_rgba(111,92,244,0.6)]"
            style={{ background: 'linear-gradient(135deg, var(--coral, #FF7A59), var(--purple, #6F5CF4))' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14 9L21 11L14 13L12 22L10 13L3 11L10 9L12 2Z" fill="white"/>
            </svg>
          </div>
          <span className="font-display font-semibold text-[15px] tracking-tight text-cream">
            supr<em className="font-serif italic font-normal">skills</em>
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.06em] text-cream/60 pointer-events-auto">
          <span className="w-[7px] h-[7px] rounded-full bg-coral pulse-coral" style={{ boxShadow: '0 0 12px #FF7A59' }} />
          <span>Beta · {String(index + 1).padStart(2,'0')}/{String(slides.length).padStart(2,'0')}</span>
          <button className="w-7 h-7 grid place-items-center rounded-lg text-cream/70 hover:text-cream" aria-label="More">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
          </button>
        </div>
      </div>

      {paused && (
        <div className="absolute top-[90px] left-1/2 -translate-x-1/2 z-[45] font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 bg-[rgba(20,12,38,0.7)] border border-cream/15 rounded text-cream pointer-events-none">
          Paused
        </div>
      )}

      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => {
          const Comp = s.Comp;
          return (
            <div
              key={s.id}
              className={"absolute inset-0 flex flex-col transition-opacity duration-300 " + (i === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
              data-screen-label={String(i + 1).padStart(2,'0') + ' ' + s.id}
            >
              <Comp active={i === index} onCTA={onCTA} {...slideProps} />
            </div>
          );
        })}
      </div>

      {/* Tap zones */}
      <div className="absolute inset-0 z-30 grid grid-cols-[1fr_2fr]">
        <button
          className="block focus:outline-none"
          aria-label="Previous"
          onPointerDown={onPointerDown('left')}
          onPointerUp={onPointerUp('left')}
          onPointerLeave={onPointerCancel}
          onPointerCancel={onPointerCancel}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />
        <button
          className="block focus:outline-none"
          aria-label="Next"
          onPointerDown={onPointerDown('right')}
          onPointerUp={onPointerUp('right')}
          onPointerLeave={onPointerCancel}
          onPointerCancel={onPointerCancel}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />
      </div>

      {hintShown && (
        <div className="absolute bottom-[110px] left-1/2 -translate-x-1/2 z-50 hint-fade inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[rgba(20,12,38,0.75)] backdrop-blur-md border border-cream/15 text-cream text-xs font-mono tracking-wide pointer-events-none">
          <span className="tap-finger w-3.5 h-3.5 rounded-full bg-coral" style={{ boxShadow: '0 0 0 4px rgba(255,122,89,0.25)' }} />
          <span>Tap right · hold to pause</span>
        </div>
      )}
    </div>
  );
}

window.StoriesShell = StoriesShell;
