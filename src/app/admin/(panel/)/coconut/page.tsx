import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Page introduction",
    path: "coconut",
    fields: [
      { key: "introTitle", label: "Title", type: "text" },
      { key: "introText", label: "Introduction", type: "textarea", rows: 4 },
      { key: "journeyTitle", label: "3D farm section title", type: "text" },
      { key: "journeyText", label: "3D farm section text", type: "textarea", rows: 3 },
      { key: "factoryTitle", label: "Factory video title", type: "text" },
      { key: "factoryText", label: "Factory video text", type: "textarea", rows: 3 },
      { key: "productsTitle", label: "Products section title", type: "text" },
      { key: "productsIntro", label: "Products section text", type: "textarea", rows: 3 },
      { key: "ctaTitle", label: "Partnership card title", type: "text" },
      { key: "ctaText", label: "Partnership card text", type: "textarea", rows: 3 },
    ],
  },
  {
    title: "Products",
    description: "Categories: Food & Nutrition · Health & Beauty · Coir & Industrial · Crafts & Energy. Order is automatic.",
    path: "coconut",
    fields: [
      {
        key: "products", label: "Products", type: "array",
        itemTitle: (it) => String(it.name || "Product"),
        itemFields: [
          { key: "name", label: "Product name", type: "text" },
          { key: "category", label: "Category", type: "text", help: "Must match one of the four categories above" },
          { key: "description", label: "Description", type: "textarea", rows: 3 },
        ],
      },
    ],
  },
];

export default async function CoconutAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Coconut Business</h1>
      <p className="mt-1 text-sm text-slate-500">Farm story, factory video captions, and the full product range.</p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}