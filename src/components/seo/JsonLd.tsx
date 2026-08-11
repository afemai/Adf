import type { SiteData } from "@/lib/types";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Structured data: Organization, WebSite and the flagship Event, so search
// engines can surface the Forum (name, address, phones) and the investiture.
export default function JsonLd({ data }: { data: SiteData }) {
  const g = data.general;
  const ev = data.events.events.find((e) => e.featured) || data.events.events[0];

  const org = {
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: g.orgName,
    alternateName: g.shortName,
    url: BASE,
    logo: `${BASE}${g.logo}`,
    email: g.emails[0],
    telephone: g.phones[0],
    foundingDate: "2024-01-23",
    address: {
      "@type": "PostalAddress",
      streetAddress: g.address.split(",")[0]?.trim(),
      addressLocality: "Auchi",
      addressRegion: "Edo State",
      addressCountry: "NG",
    },
  };

  const graph: Record<string, unknown>[] = [
    org,
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      name: g.orgName,
      url: BASE,
      publisher: { "@id": `${BASE}/#organization` },
      inLanguage: "en-NG",
    },
  ];

  if (ev) {
    graph.push({
      "@type": "Event",
      name: ev.title,
      startDate: ev.date,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: ev.location || "Auchi, Edo State, Nigeria" },
      description: ev.description,
      organizer: { "@id": `${BASE}/#organization` },
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
