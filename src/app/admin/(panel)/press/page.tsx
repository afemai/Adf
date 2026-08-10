import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Press coverage",
    description: "Articles and mentions shown on the homepage news strip.",
    path: "press",
    fields: [
      {
        key: "items", label: "Press items", type: "array",
        itemTitle: (it) => String(it.headline || "Article"),
        itemFields: [
          { key: "source", label: "Publication", type: "text" },
          { key: "headline", label: "Headline", type: "text" },
          { key: "url", label: "Article URL", type: "url" },
          { key: "date", label: "Date", type: "text", placeholder: "July 2024" },
        ],
      },
    ],
  },
];

export default async function PressAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">News &amp; Press</h1>
      <p className="mt-1 text-sm text-slate-500">The Forum in the news — cards link out to the original articles.</p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}