import type { SeasonalMode, SeasonalSettings } from "./types";

// Resolve the logo that should be shown for the active seasonal mode.
export function seasonalLogo(s: SeasonalSettings | undefined, fallback: string): string {
  if (!s) return fallback;
  switch (s.mode) {
    case "christmas":
      return s.logoChristmas || fallback;
    case "newyear":
      return s.logoNewYear || fallback;
    case "easter":
      return s.logoEaster || fallback;
    case "independence":
      return s.logoIndependence || fallback;
    default:
      return fallback;
  }
}

export interface SeasonalPalette {
  name: string;
  primary: string; // deep background / heading color
  secondary: string; // accent-gold — buttons, highlights
  accent: string; // leaf accent
}

// Distinct seasonal palettes for the Afemai Descendants Forum (deliberately
// different from the church site's approach — one identity, four celebrations).
export const SEASONAL_PALETTES: Record<Exclude<SeasonalMode, "none">, SeasonalPalette> = {
  christmas: {
    name: "Christmas",
    primary: "#6E1423",
    secondary: "#E8B44A",
    accent: "#1E5C3B",
  },
  newyear: {
    name: "New Year",
    primary: "#10142B",
    secondary: "#F5C518",
    accent: "#C9A227",
  },
  easter: {
    name: "Easter",
    primary: "#4A2C6D",
    secondary: "#E9B8C8",
    accent: "#6FA84B",
  },
  independence: {
    name: "Independence",
    primary: "#0B3D2E",
    secondary: "#F2B705",
    accent: "#008751",
  },
};

export function seasonalPalette(mode: SeasonalMode): SeasonalPalette | null {
  if (mode === "none") return null;
  return SEASONAL_PALETTES[mode];
}
