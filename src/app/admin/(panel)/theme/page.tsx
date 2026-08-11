import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";
import ThemePresets from "@/components/admin/ThemePresets";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Brand colors",
    description:
      "These replace the navy, gold and green throughout the whole site — links, buttons, headers, footers. Use the presets above or flip the hex values yourself.",
    path: "theme",
    fields: [
      { key: "primaryColor", label: "Primary (deep navy)", type: "color" },
      { key: "secondaryColor", label: "Secondary (gold)", type: "color" },
      { key: "accentColor", label: "Accent (leaf green)", type: "color" },
    ],
  },
  {
    title: "Seasonal mode",
    description:
      "Turn on Christmas, New Year, Independence or Easter effects: falling snow, fireworks, confetti, a themed banner — and the logo itself gets a seasonal touch (Santa hat, flag, party hat).",
    path: "settings.seasonal",
    fields: [
      {
        key: "mode",
        label: "Season",
        type: "select",
        options: [
          { value: "none", label: "None — normal mode" },
          { value: "christmas", label: "Christmas — snow & Santa-hat logo 🎄" },
          { value: "newyear", label: "New Year — fireworks & confetti 🎆" },
          { value: "independence", label: "Independence — Nigerian colours 🇳🇬" },
          { value: "easter", label: "Easter — spring blooms 🌷" },
        ],
      },
      { key: "message", label: "Banner message (optional)", type: "text", placeholder: "e.g. Merry Christmas from Afemai Descendants Forum!" },
      { key: "logoChristmas", label: "Christmas logo", type: "image", help: "Upload the logo with the Santa hat" },
      { key: "logoNewYear", label: "New Year logo", type: "image", help: "Upload the festive New Year logo" },
      { key: "logoEaster", label: "Easter logo", type: "image", help: "Upload the spring/Easter logo" },
      { key: "logoIndependence", label: "Independence logo", type: "image", help: "Upload the green-white-green logo" },
    ],
  },
];

export default async function ThemeAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Theme, Colors &amp; Seasons</h1>
      <p className="mt-1 text-sm text-slate-500">
        Restyle the whole site in one click, flip colors yourself, or switch on seasonal mode — the logo and effects follow.
      </p>
      <div className="mt-6 rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-navy-900">Designer presets</h2>
        <p className="mt-1 text-sm text-slate-500">One click restyles the entire public site.</p>
        <div className="mt-4">
          <ThemePresets />
        </div>
      </div>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}