"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { SeasonalSettings } from "@/lib/types";

// Site-wide seasonal effects — adapted from the church-site pattern with
// lighter particle counts so the effect never taxes low-end phones.
// Particles are generated once (lazy useState) to keep renders pure.

function Snowflake({ delay, left, duration }: { delay: number; left: number; duration: number }) {
  const [{ fontSize, drift }] = useState(() => ({
    fontSize: Math.random() * 14 + 10,
    drift: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
  }));
  return (
    <motion.div
      className="pointer-events-none fixed z-40 text-white/80"
      style={{ left: `${left}%`, fontSize: `${fontSize}px` }}
      initial={{ top: -40, opacity: 0, rotate: 0 }}
      animate={{ top: "108vh", opacity: [0, 1, 1, 0], rotate: 360, x: drift }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      *
    </motion.div>
  );
}

function Firework({ delay, left }: { delay: number; left: number }) {
  const [{ color, repeatDelay }] = useState(() => {
    const colors = ["#fbbf24", "#ef4444", "#22c55e", "#3b82f6", "#a855f7"];
    return { color: colors[Math.floor(Math.random() * colors.length)], repeatDelay: Math.random() * 5 + 4 };
  });
  return (
    <motion.div
      className="pointer-events-none fixed z-40"
      style={{ left: `${left}%`, bottom: "22%" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay }}
    >
      <div className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 18px ${color}, 0 0 36px ${color}` }} />
    </motion.div>
  );
}

function Confetti({ delay, left }: { delay: number; left: number }) {
  const [{ color, size, round, rotateTo, drift, duration }] = useState(() => {
    const colors = ["#fbbf24", "#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];
    return {
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 7 + 4,
      round: Math.random() > 0.5,
      rotateTo: Math.random() * 720 - 360,
      drift: [0, Math.random() * 80 - 40, Math.random() * 80 - 40],
      duration: Math.random() * 3 + 4,
    };
  });
  return (
    <motion.div
      className="pointer-events-none fixed z-40"
      style={{ left: `${left}%`, backgroundColor: color, width: `${size}px`, height: `${size}px`, borderRadius: round ? "50%" : "0" }}
      initial={{ top: -20, opacity: 1, rotate: 0 }}
      animate={{ top: "108vh", opacity: [1, 1, 0], rotate: rotateTo, x: drift }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeIn" }}
    />
  );
}

function Bloom({ delay, left, top }: { delay: number; left: number; top: number }) {
  const [flower] = useState(() => ["🌷", "🌸", "🌺", "🌻", "🌼"][Math.floor(Math.random() * 5)]);
  return (
    <motion.div
      className="pointer-events-none fixed z-30 text-2xl"
      style={{ left: `${left}%`, top: `${top}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0], rotate: [0, 12, -12, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, repeatDelay: 2 }}
    >
      {flower}
    </motion.div>
  );
}

const BANNERS: Record<string, { gradient: string; fallback: string }> = {
  christmas: { gradient: "from-red-600 via-green-600 to-red-600", fallback: "Merry Christmas! 🎄" },
  newyear: { gradient: "from-yellow-500 via-purple-600 to-yellow-500", fallback: "Happy New Year! 🎆" },
  independence: { gradient: "from-green-600 via-white to-green-600", fallback: "Happy Independence Day, Nigeria! 🇳🇬" },
  easter: { gradient: "from-purple-500 via-pink-400 to-purple-500", fallback: "He is risen — Happy Easter! 🌷" },
};

export default function SeasonalDecorations({ seasonal }: { seasonal: SeasonalSettings }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!mounted || !seasonal || seasonal.mode === "none") return null;

  const mode = seasonal.mode;
  const banner = BANNERS[mode];

  return (
    <AnimatePresence>
      {mode === "christmas" &&
        Array.from({ length: 18 }).map((_, i) => (
          <Snowflake key={`s${i}`} delay={Math.random() * 8} left={Math.random() * 100} duration={Math.random() * 5 + 8} />
        ))}
      {mode === "newyear" && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <Firework key={`f${i}`} delay={Math.random() * 8} left={Math.random() * 100} />
          ))}
          {Array.from({ length: 24 }).map((_, i) => (
            <Confetti key={`c${i}`} delay={Math.random() * 8} left={Math.random() * 100} />
          ))}
        </>
      )}
      {mode === "independence" &&
        Array.from({ length: 24 }).map((_, i) => (
          <Confetti key={`i${i}`} delay={Math.random() * 8} left={Math.random() * 100} />
        ))}
      {mode === "easter" &&
        Array.from({ length: 14 }).map((_, i) => (
          <Bloom key={`b${i}`} delay={Math.random() * 8} left={Math.random() * 100} top={Math.random() * 100} />
        ))}
      {banner && (
        <motion.div
          className={`fixed inset-x-0 top-0 z-50 bg-gradient-to-r ${banner.gradient} py-3 text-center font-bold text-white shadow-lg`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
        >
          <span className="text-base sm:text-xl">{seasonal.message || banner.fallback}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}