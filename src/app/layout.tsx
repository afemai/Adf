import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

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

// Static brand metadata. Per-page generateMetadata() overrides titles and
// descriptions from the CMS at request time (routes are force-dynamic).
// Keeping this layout free of database fetches lets /_not-found and error
// pages render statically.
export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Afemhai Descendant Forum | Unity is Power",
    template: "%s | Afemhai Descendant Forum",
  },
  description:
    "Afemhai Descendant Forum — uniting the sons and daughters of Afemai land (Edo North, Nigeria). One People. Diverse Communities. Shared Heritage. Common Future.",
  keywords: ["Afemhai", "Afemai", "ADF", "Auchi", "Edo North", "coconut farming", "Etsako", "Owan", "Akoko-Edo"],
  icons: {
    icon: "/brand/logo.jpeg",
    apple: "/brand/logo.jpeg",
  },
  openGraph: {
    type: "website",
    siteName: "Afemhai Descendant Forum",
    title: "Afemhai Descendant Forum — Unity is Power",
    description:
      "Uniting the sons and daughters of Afemai land (Edo North, Nigeria). One People. Diverse Communities. Shared Heritage. Common Future.",
    images: [{ url: "/opengraph-image" }],
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afemhai Descendant Forum | Unity is Power",
    description:
      "Uniting the sons and daughters of Afemai land (Edo North, Nigeria). One People. Diverse Communities. Shared Heritage. Common Future.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B2447",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream-50 font-body text-navy-900 antialiased">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}