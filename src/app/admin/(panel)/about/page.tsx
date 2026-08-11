import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Introduction & origins",
    path: "about",
    fields: [
      { key: "introTitle", label: "Section title", type: "text" },
      { key: "introText", label: "Introduction", type: "textarea", rows: 5 },
      { key: "introImage", label: "Intro photo", type: "image", help: "Featured photo in the page hero (landscape works best)" },
      { key: "originTitle", label: "Origin section title", type: "text" },
      { key: "originText", label: "Origin text", type: "textarea", rows: 5 },
      { key: "kukurukuTitle", label: "Kukuruku section title", type: "text" },
      { key: "kukurukuText", label: "Kukuruku text", type: "textarea", rows: 4 },
      { key: "divisionsTitle", label: "Divisions title", type: "text" },
      { key: "divisionsText", label: "Divisions text", type: "textarea", rows: 3 },
      { key: "philosophy", label: "Philosophy quote", type: "text" },
    ],
  },
  {
    title: "The six Local Government Areas",
    description: "Each card on the History page. Communities and rulers are shown as chips/lists.",
    path: "about",
    fields: [
      {
        key: "lgas", label: "Local Government Areas", type: "array",
        itemFields: [
          { key: "name", label: "Name", type: "text" },
          { key: "headquarters", label: "Headquarters", type: "text" },
          { key: "division", label: "Division", type: "text", help: "Etsako | Owan | Akoko-Edo" },
          { key: "economy", label: "Overview / economy", type: "textarea", rows: 4 },
          { key: "communities", label: "Major communities", type: "lines", rows: 3, help: "One per line — each line becomes a chip" },
          { key: "rulers", label: "Traditional institutions", type: "lines", rows: 3, help: "One per line" },
        ],
      },
    ],
  },
  {
    title: "Timeline",
    path: "about",
    fields: [
      {
        key: "timeline", label: "Timeline entries", type: "array",
        itemFields: [
          { key: "era", label: "Era / period", type: "text" },
          { key: "text", label: "What happened", type: "textarea", rows: 2 },
        ],
      },
    ],
  },
  {
    title: "Aims & objectives",
    path: "about",
    fields: [
      {
        key: "aims", label: "Aims", type: "array",
        itemFields: [
          { key: "title", label: "Short title", type: "text" },
          { key: "text", label: "Full aim text", type: "textarea", rows: 3 },
        ],
      },
    ],
  },
];

export default async function AboutAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">History &amp; About</h1>
      <p className="mt-1 text-sm text-slate-500">Origins, the six LGAs, timeline and aims of the Forum.</p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}