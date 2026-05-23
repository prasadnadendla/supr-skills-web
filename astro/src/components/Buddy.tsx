// AI Buddy — a stylized animated character.
// The character chrome (layered radial gradients, breathing, blinking) lives
// in global.css per plan §5.1.2 — complex one-off styling stays in plain CSS.
//
// Phase 2 (per plan) replaces this with a React Three Fiber 3D model. The
// public API is intentionally minimal so the swap is a drop-in.

export type BuddySize = 'sm' | 'md' | 'lg';
export type BuddyMood = 'idle' | 'listen' | 'dim';

export interface BuddyProps {
  size?: BuddySize;
  mood?: BuddyMood;
  className?: string;
}

export function Buddy({ size = 'md', mood = 'idle', className = '' }: BuddyProps) {
  const sizeClass = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : '';
  return (
    <div className={`buddy ${sizeClass} ${className}`}>
      <div className="buddy-glow" />
      <div className={`buddy-body mood-${mood}`}>
        <div className="buddy-spark" />
        <div className="buddy-face">
          <span className="buddy-eye" />
          <span className="buddy-eye" />
        </div>
      </div>
    </div>
  );
}
