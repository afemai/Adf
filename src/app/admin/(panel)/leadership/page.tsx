import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Page intro & honor roll",
    path: "leadership",
    fields: [
      { key: "introTitle", label: "Title", type: "text" },
      { key: "introText", label: "Introduction", type: "textarea", rows: 4 },
      { key: "execsTitle", label: "Executives section title", type: "text" },
      { key: "execsIntro", label: "Executives section text", type: "textarea", rows: 2 },
      { key: "trusteesTitle", label: "Trustees section title", type: "text" },
      { key: "trusteesIntro", label: "Trustees section text", type: "textarea", rows: 2 },
      { key: "honorTitle", label: "Honor roll title", type: "text" },
      { key: "honorText", label: "Honor roll description", type: "textarea", rows: 4 },
      { key: "galleryTitle", label: "Gallery title", type: "text" },
      { key: "galleryIntro", label: "Gallery text", type: "textarea", rows: 2 },
    ],
  },
  {
    title: "Leaders & trustees",
    description: "The first ones (order 1–2) appear as National Executives; the rest as Trustees. Upload a portrait to replace the initials.",
    path: "leadership",
    fields: [
      {
        key: "leaders", label: "Leaders", type: "array",
        itemTitle: (it) => String(it.name || "Leader"),
        itemFields: [
          { key: "name", label: "Full name", type: "text" },
          { key: "title", label: "Title / role", type: "text" },
          { key: "bio", label: "Short bio", type: "textarea", rows: 2 },
          { key: "email", label: "Email", type: "text" },
          { key: "phone", label: "Phone", type: "text" },
          { key: "image", label: "Portrait photo", type: "image", help: "Leave empty for an initials avatar" },
          { key: "honorRoll", label: "Shown on honor roll", type: "toggle" },
        ],
      },
    ],
  },
  {
    title: "Gallery",
    description: "Photos shown on the Leadership page.",
    path: "leadership",
    fields: [
      {
        key: "gallery", label: "Gallery images", type: "array",
        itemTitle: (it) => String((it as Record<string, unknown>).caption || "Photo"),
        itemFields: [
          { key: "url", label: "Image", type: "image" },
          { key: "caption", label: "Caption", type: "text" },
        ],
      },
    ],
  },
];

export default async function LeadershipAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Leadership</h1>
      <p className="mt-1 text-sm text-slate-500">Executives, trustees, the honor roll and the picture gallery.</p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}