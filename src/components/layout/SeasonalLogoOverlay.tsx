import type { SeasonalMode } from "@/lib/types";

// Overlay placed on the site logo in the navbar/footer/admin bar when a
// seasonal mode is active. Christmas puts a Santa hat on the crest;
// Independence shows the Nigerian flag; New Year a party hat; Easter a bloom.
export default function SeasonalLogoOverlay({ mode, size = "md" }: { mode: SeasonalMode; size?: "md" | "lg" }) {
  if (!mode || mode === "none") return null;
  const hat = size === "lg" ? "h-9 w-9" : "h-6 w-6";
  return (
    <span aria-hidden className="pointer-events-none absolute -top-1.5 -right-2 z-10">
      {mode === "christmas" && (
        <svg viewBox="0 0 64 40" className={hat}>
          <path d="M32 2 52 26H12L32 2Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <rect x="6" y="24" width="52" height="10" rx="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="32" cy="20" r="4" fill="#fbbf24" />
        </svg>
      )}
      {mode === "newyear" && (
        <svg viewBox="0 0 64 44" className={hat}>
          <path d="M32 4 60 36H4L32 4Z" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2" />
          <circle cx="32" cy="10" r="6" fill="#fbbf24" />
          <rect x="2" y="34" width="60" height="9" rx="4.5" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        </svg>
      )}
      {mode === "independence" && (
        <svg viewBox="0 0 64 40" className={hat}>
          <rect x="2" y="4" width="60" height="12" fill="#008751" />
          <rect x="2" y="16" width="60" height="9" fill="#f8fafc" />
          <rect x="2" y="25" width="60" height="11" fill="#008751" />
        </svg>
      )}
      {mode === "easter" && <span className="text-xl leading-none">🌷</span>}
    </span>
  );
}