import type { Metadata } from "next";
import { loadPublicData } from "./dataStore";

export type PageKey = "home" | "about" | "coconut" | "leadership" | "contact";

export async function pageMetadata(key: PageKey): Promise<Metadata> {
  const data = await loadPublicData();
  const seo = data.seo;
  const p = seo.perPage[key];
  // Page titles are stored complete; strip any org-suffix so the layout
  // template ("%s | orgName") does not duplicate it.
  const title = p.title.replace(/\s*\|\s*Afemhai Descendant Forum\s*$/i, "");
  return {
    title,
    description: p.description,
    openGraph: {
      title: p.title,
      description: p.description,
      siteName: data.general.orgName,
      images: [{ url: seo.ogImage || "/brand/logo.jpeg" }],
    },
  };
}