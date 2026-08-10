import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Brand colors",
    description: "These replace the navy, gold and green throughout the whole site — links, buttons, headers, footers.",
    path: "theme",
    fields: [
      { key: "primaryColor", label: "Primary (deep navy)", type: "color" },
      { key: "secondaryColor", label: "Secondary (gold)", type: "color" },
      { key: "accentColor", label: "Accent (leaf green)", type: "color" },
    ],
  },
];

export default async function ThemeAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Theme &amp; Colors</h1>
      <p className="mt-1 text-sm text-slate-500">
        Pick any colors — save and the whole public site restyles instantly.
      </p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}