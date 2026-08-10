import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Announcement bar",
    description: "The gold strip at the very top of the site. Perfect for event notices.",
    path: "homepage",
    fields: [
      { key: "announcement.enabled", label: "Show announcement bar", type: "toggle" },
      { key: "announcement.text", label: "Announcement text", type: "textarea", rows: 2 },
      { key: "announcement.linkLabel", label: "Link label", type: "text", placeholder: "Read more" },
      { key: "announcement.link", label: "Link destination", type: "url" },
    ],
  },
  {
    title: "Hero section",
    description: "The first thing visitors see.",
    path: "homepage",
    fields: [
      { key: "heroTitle", label: "Hero title", type: "textarea", rows: 2, help: "The big headline under the logo" },
      { key: "heroSubtitle", label: "Hero subtitle", type: "textarea", rows: 3 },
      { key: "heroBadge", label: "Hero badge text", type: "text" },
      { key: "heroImage", label: "Hero image", type: "image", help: "Large feature image (landscape works best)" },
    ],
  },
  {
    title: "Key figures (stats band)",
    description: "The animated numbers under the hero. Keep values short: '6', '21+', '3'.",
    path: "homepage",
    fields: [
      {
        key: "stats", label: "Stats", type: "array",
        itemTitle: (it) => `${it.value || "?"} — ${it.label || "stat"}`,
        itemFields: [
          { key: "value", label: "Value", type: "text", placeholder: "6" },
          { key: "label", label: "Label", type: "text", placeholder: "Local Government Areas" },
          { key: "suffix", label: "Suffix (optional)", type: "text", placeholder: "+ or %" },
        ],
      },
    ],
  },
  {
    title: "Pillars",
    description: "The three cards: Unity, Heritage, Development.",
    path: "homepage",
    fields: [
      {
        key: "pillars", label: "Pillars", type: "array",
        itemTitle: (it) => String(it.title || "Pillar"),
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea", rows: 3 },
          { key: "icon", label: "Icon key", type: "text", help: "handshake | landmark | sprout" },
        ],
      },
    ],
  },
  {
    title: "Coconut teaser",
    description: "The split section with the factory video.",
    path: "homepage",
    fields: [
      { key: "coconutTeaserTitle", label: "Title", type: "text" },
      { key: "coconutTeaserText", label: "Text", type: "textarea", rows: 3 },
      { key: "ctaPrimary.text", label: "Primary button label", type: "text" },
      { key: "ctaPrimary.link", label: "Primary button link", type: "url" },
      { key: "ctaSecondary.text", label: "Secondary button label", type: "text" },
      { key: "ctaSecondary.link", label: "Secondary button link", type: "url" },
    ],
  },
];

export default async function HomepageAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Homepage</h1>
      <p className="mt-1 text-sm text-slate-500">Every block that appears on the landing page.</p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}