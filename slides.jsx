// All 9 slides for the Supr Skills landing story.
// Each slide receives `{ active, onCTA }` props.

const { useState, useEffect, useMemo } = React;

// ---------- helper: letter-by-letter reveal ----------
function LetterReveal({ text, delay = 0, step = 22 }) {
  return (
    <span className="lbl">
      {text.split("").map((ch, i) => (
        <span key={i} style={{ animationDelay: (delay + i * step) + "ms" }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

// ============================================================
// SLIDE 1 — The Hook
// ============================================================
function Slide1({ active }) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!active) { setBeat(0); return; }
    const t = setTimeout(() => setBeat(1), 1700);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="slide-content bg-mesh-1 s1">
      <span className="tag-corner">// THE FUTURE OF LEARNING</span>
      <h1 className={"headline-display beat " + (beat === 0 ? "enter" : "exit")}>
        {active && beat === 0 && <LetterReveal text="The AI race won't wait." />}
      </h1>
      <h1 className={"headline-display beat " + (beat === 1 ? "enter" : "")} style={{opacity: beat === 1 ? undefined : 0}}>
        {active && beat === 1 && (
          <>
            <LetterReveal text="Neither should " />
            <em><LetterReveal text="you." delay={300} /></em>
          </>
        )}
      </h1>
    </div>
  );
}

// ============================================================
// SLIDE 2 — The Promise
// ============================================================
function Slide2({ active }) {
  return (
    <div className="slide-content bg-warm-night s2">
      <div className="scene">
        <div className="buddy-spot">
          <Buddy size="md" mood="idle" />
        </div>
        <div className="laptop">
          <div className="lec-frame">
            <div className="scrub" />
          </div>
        </div>
      </div>
      <p className="caption">
        Learning, <em>finally</em><br/>with a companion.
      </p>
    </div>
  );
}

// ============================================================
// SLIDE 3 — World-Class Foundation
// ============================================================
function Slide3({ active }) {
  return (
    <div className="slide-content bg-warm-night s3">
      <p className="eyebrow">// The curriculum</p>
      <p className="caption">
        The world's best courses.<br/>
        <em>Always</em> free.
      </p>
      <div className="badges" key={active ? "a" : "b"}>
        <div className="badge">
          <div className="badge-mark mit">M</div>
          <div className="badge-info">
            <div className="title">MIT OpenCourseWare</div>
            <div className="sub">6.0001 · 6.S191 · 18.06 · +12 more</div>
          </div>
          <div className="badge-free">Free</div>
        </div>
        <div className="badge">
          <div className="badge-mark cs50">cs</div>
          <div className="badge-info">
            <div className="title">Harvard CS50</div>
            <div className="sub">CS · Web · AI · Cyber · Python</div>
          </div>
          <div className="badge-free">Free</div>
        </div>
        <div className="badge">
          <div className="badge-mark fs">⌘</div>
          <div className="badge-info">
            <div className="title">Full-Stack Track</div>
            <div className="sub">React · Node · Postgres · Deploy</div>
          </div>
          <div className="badge-free">Free</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SLIDE 4 — Buddy in Action (lecture player)
// ============================================================
function Slide4({ active, onCTA }) {
  return (
    <div className="slide-content bg-deep s4">
      <p className="eyebrow">// AI buddy · live</p>
      <div className="player">
        <div className="player-frame">
          <div className="lecture-board">
            <span className="ln w90" />
            <span className="ln w70" />
            <span className="ln hl w90" />
            <span className="ln w50" />
            <div className="formula">∂L/∂w = −(y − ŷ) · x</div>
            <span className="ln w70" />
          </div>
          <div className="cam-tile">
            <div className="ava" />
            <span className="signal" />
            <span className="cam-label">YOU</span>
          </div>
          <div className="buddy-bubble">
            <Buddy size="sm" mood="listen" />
            <div className="bubble">
              Looked like you replayed that — want me to break it down?
            </div>
          </div>
        </div>
        <div className="player-controls">
          <div className="play">▶</div>
          <div className="scrub" />
          <div className="time">08:42</div>
        </div>
      </div>
      <p className="caption">
        Confused? <em>It already knows.</em>
      </p>
      <button className="cta-btn cta-btn-secondary cta-floating" onClick={() => onCTA?.('see-it-live')}>
        See it live <span>→</span>
      </button>
    </div>
  );
}

// ============================================================
// SLIDE 5 — Real Humans, On Standby
// ============================================================
function Slide5({ active }) {
  return (
    <div className="slide-content bg-deep s5">
      <p className="eyebrow">// When AI hits its limit</p>
      <div className="row">
        <div className="pane buddy-pane">
          <span className="label">AI Buddy</span>
          <span className="signal" />
          <Buddy size="sm" mood="dim" />
        </div>
        <div className="pane expert-pane">
          <span className="label">Expert · Live</span>
          <span className="signal" />
          <div className="expert-avatar">
            <div className="expert-head" />
          </div>
          <span className="expert-name">Priya R.</span>
          <span className="expert-role">ML · 8 yrs</span>
        </div>
      </div>
      <p className="caption">
        When AI isn't enough,<br/>
        <em>a human is.</em>
      </p>
    </div>
  );
}

// ============================================================
// SLIDE 6 — Ship Something Real
// ============================================================
function Slide6({ active, onCTA }) {
  return (
    <div className="slide-content bg-warm-night s6">
      <p className="eyebrow">// Build · week 1</p>
      <div className="build-scene" key={active ? "a" : "b"}>
        <div className="code-window">
          <span className="line"><span className="kw">import</span> {"{ "}useState{" }"} <span className="kw">from</span> <span className="str">"react"</span></span>
          <span className="line"><span className="com">// your first screen</span></span>
          <span className="line"><span className="kw">export default function</span> <span className="fn">App</span>() {"{"}</span>
          <span className="line">{"  "}<span className="kw">const</span> [city, setCity] = <span className="fn">useState</span>(<span className="str">"Hyderabad"</span>)</span>
          <span className="line">{"  "}<span className="kw">return</span> (</span>
          <span className="line">{"    "}{"<"}<span className="fn">Card</span> title={"{"}city{"}"} /{">"}</span>
          <span className="line">{"  "})</span>
          <span className="line">{"}"}</span>
        </div>
        <div className="mini-phone">
          <div className="screen">
            <span className="app-title">Tiffin</span>
            <span className="app-sub">today's plate</span>
            <div className="card">
              <div className="row1"><span className="dot" /><span className="title">Hyderabad</span></div>
              <span className="ln" />
              <span className="ln short" />
            </div>
            <div className="card">
              <div className="row1"><span className="dot" /><span className="title">Order #042</span></div>
              <span className="ln short" />
            </div>
            <div className="card">
              <div className="row1"><span className="dot" /><span className="title">Rider</span></div>
              <span className="ln" />
            </div>
            <div className="running">Live</div>
          </div>
        </div>
      </div>
      <p className="caption">
        Your first app.<br/>
        <em>Before the week ends.</em>
      </p>
      <button className="cta-btn cta-btn-primary cta-floating" onClick={() => onCTA?.('start-building')}>
        Start building <span>→</span>
      </button>
    </div>
  );
}

// ============================================================
// SLIDE 7 — The Reframe
// ============================================================
function Slide7({ active, onCTA }) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!active) { setBeat(0); return; }
    const t = setTimeout(() => setBeat(1), 2200);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="slide-content bg-split s7">
      <p className="eyebrow">// The math</p>
      <div className="split-stack">
        <div className="split-pane top">
          <span className="label">Bootcamp · 24 wks</span>
          <div className="bootcamp-mock">
            <div className="row"><div className="box" /><div className="lines"><div className="ln" /><div className="ln short" /></div></div>
            <div className="row"><div className="box" /><div className="lines"><div className="ln" /><div className="ln short" /></div></div>
            <div className="row"><div className="box" /><div className="lines"><div className="ln" /><div className="ln short" /></div></div>
          </div>
          <div className="price-tag">
            <span className="strike">₹3,20,000</span>
          </div>
        </div>
        <div className="split-pane bottom">
          <span className="label">Supr Skills · forever</span>
          <div className="price-tag">
            Less than <em>dinner.</em>
            <span className="small">≈ ₹499 / month · cancel anytime</span>
          </div>
        </div>
      </div>
      <p className="caption" key={beat}>
        {beat === 0 ? (
          <>Bootcamps cost <em>lakhs.</em></>
        ) : (
          <>This costs less than <em>dinner.</em></>
        )}
      </p>
      <button className="cta-btn cta-btn-link cta-bottom" onClick={() => onCTA?.('compare')}>
        See how we compare →
      </button>
    </div>
  );
}

// ============================================================
// SLIDE 8 — Who It's For
// ============================================================
function Slide8({ active }) {
  return (
    <div className="slide-content bg-warm-night s8">
      <p className="eyebrow">// Built for</p>
      <div className="who-row" key={active ? "a" : "b"}>
        <div className="who-card">
          <div className="who-portrait grad" />
          <div className="who-label">Graduates</div>
          <div className="who-sub">First job · 0–2 yrs</div>
        </div>
        <div className="who-card">
          <div className="who-portrait student" />
          <div className="who-label">Students</div>
          <div className="who-sub">Final years · interns</div>
        </div>
        <div className="who-card">
          <div className="who-portrait pro" />
          <div className="who-label">Engineers</div>
          <div className="who-sub">Upskilling · AI · ML</div>
        </div>
      </div>
      <p className="caption">
        Built for engineers.<br/>
        <em>Every stage.</em>
      </p>
    </div>
  );
}

// ============================================================
// SLIDE 9 — Final CTA (parks here)
// ============================================================
function Slide9({ active, onCTA, ctaCopy = "Join the waitlist" }) {
  return (
    <div className="slide-content bg-mesh-1 s9">
      <div className="buddy-spot">
        <Buddy size="lg" mood="idle" />
      </div>
      <h1 className="headline-display">
        The future of learning<br/>
        is <em>one tap</em> away.
      </h1>
      <p className="subtext">
        First 500 learners get<br/><span style={{color: 'var(--cream)'}}>lifetime access. Free.</span>
      </p>
      <div className="cta-actions">
        <button className="cta-btn cta-btn-primary" onClick={() => onCTA?.('waitlist')}>
          {ctaCopy}
        </button>
        <button className="cta-btn cta-btn-secondary" onClick={() => onCTA?.('tour')}>
          Watch the 60-second tour
        </button>
      </div>
      <div className="parked-tag">tap left to revisit</div>
    </div>
  );
}

// Slide registry — index aligns with progress bar segments
const SLIDES = [
  { id: 'hook',       Comp: Slide1, duration: 3500,  parkOnArrival: false },
  { id: 'promise',    Comp: Slide2, duration: 4000,  parkOnArrival: false },
  { id: 'foundation', Comp: Slide3, duration: 4500,  parkOnArrival: false },
  { id: 'buddy',      Comp: Slide4, duration: 7000,  parkOnArrival: false },
  { id: 'humans',     Comp: Slide5, duration: 4000,  parkOnArrival: false },
  { id: 'ship',       Comp: Slide6, duration: 6500,  parkOnArrival: false },
  { id: 'reframe',    Comp: Slide7, duration: 5500,  parkOnArrival: false },
  { id: 'who',        Comp: Slide8, duration: 4500,  parkOnArrival: false },
  { id: 'cta',        Comp: Slide9, duration: 99999, parkOnArrival: true  },
];

window.SLIDES = SLIDES;
