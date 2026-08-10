import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Site-wide SEO",
    description: "These power the <title> and meta description for the whole site and social sharing.",
    path: "seo",
    fields: [
      { key: "siteTitle", label: "Site title", type: "text" },
      { key: "siteDescription", label: "Site description", type: "textarea", rows: 3 },
      { key: "keywords", label: "Keywords (comma separated)", type: "textarea", rows: 2 },
      { key: "perPage.home.title", label: "Homepage title", type: "text" },
      { key: "perPage.home.description", label: "Homepage description", type: "textarea", rows: 2 },
      { key: "perPage.about.title", label: "History page title", type: "text" },
      { key: "perPage.about.description", label: "History page description", type: "textarea", rows: 2 },
      { key: "perPage.coconut.title", label: "Coconut page title", type: "text" },
      { key: "perPage.coconut.description", label: "Coconut page description", type: "textarea", rows: 2 },
      { key: "perPage.leadership.title", label: "Leadership page title", type: "text" },
      { key: "perPage.leadership.description", label: "Leadership page description", type: "textarea", rows: 2 },
      { key: "perPage.contact.title", label: "Contact page title", type: "text" },
      { key: "perPage.contact.description", label: "Contact page description", type: "textarea", rows: 2 },
      { key: "ogImage", label: "Share image (OG)", type: "image", help: "The image shown when the site is shared on social media" },
    ],
  },
];

export default async function SEOAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">SEO</h1>
      <p className="mt-1 text-sm text-slate-500">
        Titles, descriptions and keywords for Google and other search engines.
      </p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}