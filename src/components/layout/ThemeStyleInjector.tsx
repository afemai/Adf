import type { SeasonalMode, ThemeSettings } from "@/lib/types";
import { seasonalPalette } from "@/lib/seasonal";

// Injects brand colors as Tailwind v4 CSS-variable overrides so the admin
// Theme editor genuinely restyles the public site (hero, buttons, links…).
// When a seasonal mode is active its palette takes over the brand colors.
export default function ThemeStyleInjector({
  theme,
  seasonalMode = "none",
}: {
  theme: ThemeSettings;
  seasonalMode?: SeasonalMode;
}) {
  const p = seasonalPalette(seasonalMode);
  const primary = p ? p.primary : theme.primaryColor;
  const secondary = p ? p.secondary : theme.secondaryColor;
  const accent = p ? p.accent : theme.accentColor;

  const css = `
    :root {
      --color-navy-800: ${primary};
      --color-navy-900: ${primary};
      --color-navy-950: ${primary};
      --color-gold-400: ${secondary};
      --color-gold-500: ${secondary};
      --color-gold-600: ${secondary};
      --color-gold-700: ${secondary};
      --color-leaf-600: ${accent};
      --color-leaf-700: ${accent};
      --brand-primary: ${primary};
      --brand-secondary: ${secondary};
      --brand-accent: ${accent};
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
