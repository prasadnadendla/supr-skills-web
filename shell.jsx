// Stories shell — data-driven, headless-ish.
// Manages slide index, progress, auto-advance, tap zones, pause-on-hold.

const { useState, useEffect, useRef, useCallback } = React;

function ProgressBar({ slides, index, progress }) {
  return (
    <div className="story-progress">
      {slides.map((s, i) => {
        const done = i < index;
        const active = i === index;
        const w = done ? 100 : active ? progress * 100 : 0;
        return (
          <div key={s.id} className={"progress-seg " + (done ? "done" : "")}>
            <span className="progress-fill" style={{ width: w + "%" }} />
          </div>
        );
      })}
    </div>
  );
}

function StoriesShell({ slides, onCTA, slideProps = {} }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 of current slide
  const [paused, setPaused] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const startRef = useRef(null);
  const elapsedRef = useRef(0); // ms within current slide
  const rafRef = useRef(null);
  const holdTimerRef = useRef(null);
  const touchStartRef = useRef(null);

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

  // Persist slide index in localStorage so refresh-keeps-place
  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem('supr_slide') || '0', 10);
      if (saved >= 0 && saved < slides.length) {
        setIndex(saved);
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try { localStorage.setItem('supr_slide', String(index)); } catch (e) {}
  }, [index]);

  // Reset elapsed when index changes
  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
    startRef.current = null;
  }, [index]);

  // Auto-advance loop
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

  // Navigation
  const next = useCallback(() => {
    setIndex((i) => Math.min(slides.length - 1, i + 1));
  }, [slides.length]);
  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Long-press to pause
  const onPointerDown = useCallback((dir) => (e) => {
    touchStartRef.current = { x: e.clientX, t: Date.now(), dir };
    holdTimerRef.current = setTimeout(() => {
      setPaused(true);
      holdTimerRef.current = null;
    }, 220);
  }, []);
  const onPointerUp = useCallback((dir) => (e) => {
    const isHoldRelease = holdTimerRef.current == null;
    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
    if (isHoldRelease) {
      // it was a hold → just unpause, don't navigate
      setPaused(false);
    } else {
      // it was a tap → navigate
      if (dir === 'left') prev();
      else next();
    }
  }, [next, prev]);
  const onPointerCancel = useCallback(() => {
    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
    setPaused(false);
  }, []);

  return (
    <div className="story">
      <ProgressBar slides={slides} index={index} progress={progress} />

      <div className="story-header">
        <div className="brand">
          <div className="brand-mark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14 9L21 11L14 13L12 22L10 13L3 11L10 9L12 2Z" fill="white"/>
            </svg>
          </div>
          <span className="brand-name">supr<em>skills</em></span>
        </div>
        <div className="story-header-right">
          <span className="live-dot" />
          <span>Beta · {String(index + 1).padStart(2,'0')}/{String(slides.length).padStart(2,'0')}</span>
          <button className="menu-btn" aria-label="More">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
          </button>
        </div>
      </div>

      {paused && <div className="paused-badge">Paused</div>}

      <div className="story-slides">
        {slides.map((s, i) => {
          const Comp = s.Comp;
          return (
            <div key={s.id} className={"slide " + (i === index ? "is-active" : "")} data-screen-label={String(i + 1).padStart(2,'0') + ' ' + s.id}>
              <Comp active={i === index} onCTA={onCTA} {...slideProps} />
            </div>
          );
        })}
      </div>

      <div className="tap-zones">
        <button
          className="tap-zone"
          aria-label="Previous"
          onPointerDown={onPointerDown('left')}
          onPointerUp={onPointerUp('left')}
          onPointerLeave={onPointerCancel}
          onPointerCancel={onPointerCancel}
        />
        <button
          className="tap-zone"
          aria-label="Next"
          onPointerDown={onPointerDown('right')}
          onPointerUp={onPointerUp('right')}
          onPointerLeave={onPointerCancel}
          onPointerCancel={onPointerCancel}
        />
      </div>

      {hintShown && (
        <div className="pause-hint">
          <span className="finger" />
          <span>Tap right · hold to pause</span>
        </div>
      )}
    </div>
  );
}

window.StoriesShell = StoriesShell;
