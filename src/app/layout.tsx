import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { loadPublicData } from "@/lib/dataStore";
import ThemeStyleInjector from "@/components/layout/ThemeStyleInjector";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadPublicData();
  const seo = data.seo;
  return {
    metadataBase: new URL(BASE),
    title: {
      default: seo.siteTitle,
      template: `%s | ${data.general.orgName}`,
    },
    description: seo.siteDescription,
    keywords: seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    icons: {
      icon: "/brand/logo.jpeg",
      apple: "/brand/logo.jpeg",
    },
    openGraph: {
      type: "website",
      siteName: data.general.orgName,
      title: `${data.general.orgName} — Unity is Power`,
      description: seo.siteDescription,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
      locale: "en_NG",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.siteTitle,
      description: seo.siteDescription,
      images: [seo.ogImage || "/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    other: {
      "theme-color": "#0B2447",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B2447",
};

export const revalidate = 300;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await loadPublicData();
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream-50 font-body text-navy-900 antialiased">
        <ThemeStyleInjector theme={data.theme} />
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}