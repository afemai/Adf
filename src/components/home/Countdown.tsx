"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Live countdown to a target ISO date. Text-only updates (no layout thrash),
// respects reduced motion via the parent's CSS guard.
export default function Countdown({ target, label }: { target: string; label?: string }) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Server and first client render must match (hydration): render a neutral
  // placeholder until the timer is mounted, then start ticking.
  const t = new Date(target).getTime();
  const diff = mounted ? Math.max(0, t - now) : 0;

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 sm:gap-3" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            {i > 0 && <span className="font-display text-xl font-bold text-gold-500/70">:</span>}
            <div className="rounded-xl border border-gold-500/30 bg-navy-950/70 px-3 py-2 text-center backdrop-blur sm:px-4 sm:py-3">
              <p className="font-display text-2xl font-bold leading-none text-gold-400 tabular-nums sm:text-3xl">– –</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-cream-100/60">—</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (diff <= 0) {
    return <p className="text-sm font-bold text-gold-400">{label || "It is happening now!"}</p>;
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);

  const cells = [
    { v: pad(days), l: "Days" },
    { v: pad(hours), l: "Hours" },
    { v: pad(mins), l: "Mins" },
    { v: pad(secs), l: "Secs" },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {cells.map((c, i) => (
        <div key={c.l} className="flex items-center gap-2 sm:gap-3">
          {i > 0 && <span className="font-display text-xl font-bold text-gold-500/70">:</span>}
          <div className="rounded-xl border border-gold-500/30 bg-navy-950/70 px-3 py-2 text-center backdrop-blur sm:px-4 sm:py-3">
            <p className="font-display text-2xl font-bold leading-none text-gold-400 tabular-nums sm:text-3xl">{c.v}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-cream-100/60">{c.l}</p>
          </div>
        </div>
      ))}
    </div>
  );
}