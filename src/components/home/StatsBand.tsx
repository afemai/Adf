"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { StatItem } from "@/lib/types";

function CountUp({ value, suffix }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const numeric = parseFloat(value);
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(String(Math.round(numeric * eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBand({ stats }: { stats: StatItem[] }) {
  return (
    <section aria-label="Key figures" className="bg-navy-900">
      <div className="heritage-border h-1" aria-hidden />
      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:grid-cols-4 lg:py-14">
        {stats.map((s, i) => (
          <div key={s.label} className="group text-center">
            <p className="text-gold-gradient font-display text-4xl font-bold sm:text-5xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cream-100/70 transition-colors group-hover:text-gold-400 sm:text-sm">
              {s.label}
            </p>
            {i < stats.length - 1 && null}
          </div>
        ))}
      </div>
    </section>
  );
}