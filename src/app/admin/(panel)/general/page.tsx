import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Organisation identity",
    description: "The legal name, motto and philosophy of the Forum — these appear across the whole site.",
    path: "general",
    fields: [
      { key: "orgName", label: "Organisation name", type: "text", help: "As registered with CAC: AFEMHAI DESCENDANT FORUM" },
      { key: "orgNameFull", label: "Full legal name", type: "text" },
      { key: "shortName", label: "Short name", type: "text" },
      { key: "tagline", label: "Motto / tagline", type: "text", help: "e.g. 'Unity is Power'" },
      { key: "philosophy", label: "Philosophy", type: "text" },
      { key: "logo", label: "Logo / emblem", type: "image", help: "Shown in the navbar, footer, hero and admin panel" },
      { key: "regNo", label: "CAC Registration number", type: "text" },
      { key: "tin", label: "TIN", type: "text" },
      { key: "incDate", label: "Date of incorporation", type: "text" },
    ],
  },
  {
    title: "Contact details",
    description: "Address, phones, emails and social media links shown in the footer and contact page.",
    path: "general",
    fields: [
      { key: "address", label: "Headquarters address", type: "textarea", rows: 2 },
      { key: "phones", label: "Phone numbers", type: "array", itemFields: [{ key: "value", label: "Phone number", type: "text", placeholder: "+234 803 000 0000" }] },
      { key: "emails", label: "Email addresses", type: "array", itemFields: [{ key: "value", label: "Email", type: "text", placeholder: "name@example.com" }] },
      { key: "socials.facebook", label: "Facebook URL", type: "url" },
      { key: "socials.instagram", label: "Instagram URL", type: "url" },
      { key: "socials.twitter", label: "X (Twitter) URL", type: "url" },
      { key: "socials.youtube", label: "YouTube URL", type: "url" },
      { key: "socials.whatsapp", label: "WhatsApp number (full international)", type: "text", placeholder: "+234 803 000 0000" },
    ],
  },
  {
    title: "Contact page texts",
    description: "Headline, intro and form copy on /contact. The map automatically points at the HQ address above — or override it below.",
    path: "contact",
    fields: [
      { key: "introTitle", label: "Page headline", type: "text" },
      { key: "introText", label: "Page introduction", type: "textarea", rows: 3 },
      { key: "formTitle", label: "Form title", type: "text" },
      { key: "formText", label: "Form help text", type: "text" },
      { key: "mapUrl", label: "Map override URL (optional)", type: "url", help: "Leave empty to auto-point Google Maps at the headquarters address" },
    ],
  },
];

export default async function GeneralAdminPage() {
  const data = await loadData();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">General Info</h1>
      <p className="mt-1 text-sm text-slate-500">Legal identity, motto, contact details and social links.</p>
      <div className="mt-6">
        <ContentEditor sections={SECTIONS} initialData={data} />
      </div>
    </div>
  );
}