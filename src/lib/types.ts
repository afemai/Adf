// ---- Afemhai Descendant Forum - content model (single JSONB doc pattern, agcogbe-proven) ----

export interface LGARecord {
  id: string;
  name: string;
  shortName?: string;
  headquarters: string;
  division: "Etsako" | "Owan" | "Akoko-Edo";
  communities: string[];
  rulers: string[];
  economy: string;
  landmarks?: string;
}

export interface TimelineEra {
  era: string;
  text: string;
}

export interface AimItem {
  title: string;
  text: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Pillar {
  title: string;
  description: string;
  icon: string; // lucide icon key
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  email?: string;
  phone?: string;
  bio?: string;
  image?: string;
  honorRoll?: boolean;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  category: "Food & Nutrition" | "Health & Beauty" | "Coir & Industrial" | "Crafts & Energy";
  description: string;
  image?: string;
  order: number;
}

export interface ADFEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO
  time?: string;
  location?: string;
  featured?: boolean;
  image?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
}

export interface PressItem {
  id: string;
  source: string;
  headline: string;
  url?: string;
  date?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
}

export interface Socials {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  whatsapp?: string;
}

export interface GeneralInfo {
  orgName: string;
  orgNameFull: string;
  shortName: string;
  tagline: string;
  philosophy: string;
  logo: string;
  address: string;
  phones: string[];
  emails: string[];
  socials: { facebook: string; instagram: string; twitter: string; youtube: string; whatsapp: string };
  regNo: string;
  tin: string;
  incDate: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  announcement: { enabled: boolean; text: string; link?: string; linkLabel?: string };
  stats: StatItem[];
  pillars: Pillar[];
  coconutTeaserTitle: string;
  coconutTeaserText: string;
  ctaPrimary: { text: string; link: string };
  ctaSecondary: { text: string; link: string };
}

export interface AboutContent {
  introTitle: string;
  introText: string;
  introImage: string;
  originTitle: string;
  originText: string;
  kukurukuTitle: string;
  kukurukuText: string;
  divisionsTitle: string;
  divisionsText: string;
  lgas: LGARecord[];
  timelineTitle: string;
  timeline: TimelineEra[];
  aimsTitle: string;
  aimsIntro: string;
  aims: AimItem[];
  philosophy: string;
}

export interface PlantationClip {
  id: string;
  src: string;
  poster: string;
  label: string;
  caption: string;
}

export interface CoconutContent {
  introTitle: string;
  introText: string;
  journeyTitle: string;
  journeyText: string;
  videos: PlantationClip[];
  factoryTitle: string;
  factoryText: string;
  productsTitle: string;
  productsIntro: string;
  products: Product[];
  ctaTitle: string;
  ctaText: string;
}

export interface LeadershipContent {
  introTitle: string;
  introText: string;
  execsTitle: string;
  execsIntro: string;
  trusteesTitle: string;
  trusteesIntro: string;
  honorTitle: string;
  honorText: string;
  leaders: Leader[];
  galleryTitle: string;
  galleryIntro: string;
  gallery: GalleryItem[];
}

export interface ContactContent {
  introTitle: string;
  introText: string;
  formTitle: string;
  formText: string;
  mapUrl: string;
  mapLat: string;
  mapLng: string;
  messages: ContactMessage[];
}

export interface EventsContent {
  events: ADFEvent[];
}

export interface PressContent {
  items: PressItem[];
}

export interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  ogImage: string;
  perPage: Record<string, { title: string; description: string }>;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontDisplay: string;
  fontBody: string;
}

export type SeasonalMode = "none" | "christmas" | "newyear" | "independence" | "easter";

export interface SeasonalSettings {
  mode: SeasonalMode;
  message: string;
}

export interface AppSettings {
  adminPasswordHash: string;
  maintenanceMode: boolean;
  allowContactForm: boolean;
  seasonal: SeasonalSettings;
}

export interface SiteData {
  general: GeneralInfo;
  homepage: HomepageContent;
  about: AboutContent;
  coconut: CoconutContent;
  leadership: LeadershipContent;
  contact: ContactContent;
  events: EventsContent;
  press: PressContent;
  seo: SEOSettings;
  theme: ThemeSettings;
  settings: AppSettings;
  updatedAt: string;
}