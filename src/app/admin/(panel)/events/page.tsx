import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Events",
    description: "Featured events are spotlighted on the homepage. The investiture is pre-filled — edit or add freely.",
    path: "events",
    fields: [
      {
        key: "events", label: "Events", type: "array",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea", rows: 3 },
          { key: "date", label: "Date (YYYY-MM-DD)", type: "text", placeholder: "2026-09-26" },
          { key: "time", label: "Time", type: "text", placeholder: "10:00 AM" },
          { key: "location", label: "Venue / location", type: "text" },
          { key: "featured", label: "Spotlight on homepage", type: "toggle" },
        ],
      },
    ],
  },
];

export default async function EventsAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Events</h1>
      <p className="mt-1 text-sm text-slate-500">Ceremonies, meetings and community programmes.</p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}