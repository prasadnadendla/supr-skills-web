import { useEffect } from 'react';

export function Toast({ message, onDone }: { message: string | null; onDone: () => void }) {
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
