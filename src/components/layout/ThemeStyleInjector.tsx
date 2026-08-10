import type { ThemeSettings } from "@/lib/types";

// Injects brand colors as Tailwind v4 CSS-variable overrides so the admin
// Theme editor genuinely restyles the public site (hero, buttons, links…).
// Shade variants (400/600/700) are mapped to the chosen color for a
// consistent look; tones can be refined later.
export default function ThemeStyleInjector({ theme }: { theme: ThemeSettings }) {
  const css = `
    :root {
      --color-navy-800: ${theme.primaryColor};
      --color-navy-900: ${theme.primaryColor};
      --color-gold-400: ${theme.secondaryColor};
      --color-gold-500: ${theme.secondaryColor};
      --color-gold-600: ${theme.secondaryColor};
      --color-gold-700: ${theme.secondaryColor};
      --color-leaf-600: ${theme.accentColor};
      --color-leaf-700: ${theme.accentColor};
      --brand-primary: ${theme.primaryColor};
      --brand-secondary: ${theme.secondaryColor};
      --brand-accent: ${theme.accentColor};
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}