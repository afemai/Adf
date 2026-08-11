"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { SeasonalSettings } from "@/lib/types";

// Seasonal atmosphere for the Afemai Descendants Forum. Deliberately light
// and distinct from a typical church-style overlay: a slim in-flow ribbon
// (never covers the navbar) plus a small drift of themed particles.
// All decorative layers are pointer-transparent and honour reduced motion.

const RIBBON: Record<string, { text: string; cls: string }> = {
  christmas: {
    text: "🎄 Merry Christmas from the Afemai Descendants Forum — unity is the gift that keeps giving.",
    cls: "bg-gradient-to-r from-[#6E1423] via-[#8C1D2F] to-[#6E1423] text-amber-100 border-b border-amber-200/20",
  },
  newyear: {
    text: "🎆 Happy New Year! Wishing every Afemai descendant a prosperous year ahead.",
    cls: "bg-gradient-to-r from-[#10142B] via-[#1B2140] to-[#10142B] text-amber-200 border-b border-amber-300/20",
  },
  easter: {
    text: "🌸 Happy Easter — renewal, hope and joy to every Afemai family.",
    cls: "bg-gradient-to-r from-[#4A2C6D] via-[#6A4A93] to-[#4A2C6D] text-rose-100 border-b border-rose-200/20",
  },
  independence: {
    text: "🇳🇬 Happy Independence Day, Nigeria — one nation, one destiny. Oct 1st.",
    cls: "bg-gradient-to-r from-[#0B3D2E] via-[#008751] to-[#0B3D2E] text-white border-b border-white/20",
  },
};

const PARTICLES: Record<string, { glyph: string; count: number; cls: string }> = {
  christmas: { glyph: "❄", count: 16, cls: "text-amber-200/70" },
  newyear: { glyph: "✦", count: 18, cls: "text-amber-300/80" },
  easter: { glyph: "🌸", count: 12, cls: "opacity-70" },
  independence: { glyph: "●", count: 20, cls: "text-[#008751]/70" },
};

export default function SeasonalDecorations({ seasonal }: { seasonal: SeasonalSettings }) {
  const mode = seasonal.mode;
  const ribbon = mode !== "none" ? RIBBON[mode] : null;
  const particles = mode !== "none" ? PARTICLES[mode] : null;

  const drops = useMemo(() => {
    if (!particles) return [];
    return Array.from({ length: particles.count }, (_, i) => ({
      left: `${(i * 53) % 100}%`,
      delay: `${((i * 37) % 100) / 10}s`,
      dur: `${9 + ((i * 13) % 7)}s`,
      size: 10 + ((i * 7) % 12),
    }));
  }, [particles]);

  if (!ribbon || !particles) return null;

  return (
    <>
      {/* Slim seasonal ribbon — in flow, never overlaps the navbar */}
      {ribbon && (
        <div className={`relative z-40 px-4 py-1.5 text-center text-xs font-semibold tracking-wide ${ribbon.cls}`}>
          {ribbon.text}
        </div>
      )}

      {/* Gentle particle drift */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        {drops.map((d, i) => (
          <motion.span
            key={i}
            className={`absolute top-0 select-none ${particles.cls}`}
            style={{ left: d.left, fontSize: d.size }}
            initial={{ y: "-8vh", opacity: 0 }}
            animate={{ y: "108vh", opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: Number(d.dur), delay: Number(d.delay), repeat: Infinity, ease: "linear" }}
          >
            {particles.glyph}
          </motion.span>
        ))}
      </div>
    </>
  );
}
