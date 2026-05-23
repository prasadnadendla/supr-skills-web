import { useEffect, useRef, type ReactNode } from 'react';

// Scales a fixed-size design surface to fill its parent container, on both
// axes independently. The Stories format is designed at 388×858 — this lets
// us guarantee the entire slide is visible with no horizontal or vertical
// scroll, on every viewport.
//
// Why CSS variables + runtime measurement instead of a CSS-only approach:
// the parent can be either a letterboxed phone frame (desktop) or full-bleed
// viewport (mobile), and the aspect ratio varies. There's no pure-CSS way
// to ask "scale me to fit my parent's current size". One ResizeObserver +
// two custom properties is the cleanest path.
//
// On phones close to the design aspect (iPhone 12+, Pixel) the non-uniform
// scale is imperceptible (<1% stretch). On shorter aspects (iPhone SE) the
// vertical squish is visible but content remains fully visible — preferable
// to either letterboxing on mobile or requiring scroll.

const DESIGN_W = 388;
const DESIGN_H = 858;

export function FitStage({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let raf = 0;
    const apply = () => {
      const r = host.getBoundingClientRect();
      if (!r.width || !r.height) return;
      host.style.setProperty('--fit-scale-x', (r.width / DESIGN_W).toFixed(4));
      host.style.setProperty('--fit-scale-y', (r.height / DESIGN_H).toFixed(4));
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(host);
    window.addEventListener('orientationchange', schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('orientationchange', schedule);
    };
  }, []);

  return (
    <div ref={hostRef} className="fit-stage absolute inset-0 overflow-hidden">
      <div className="fit-stage-inner">{children}</div>
    </div>
  );
}
