import Link from "next/link";
import { ArrowRight, ArrowUpRight, Apple, Sparkles, Layers, Flame, Package } from "lucide-react";
import { loadPublicData } from "@/lib/dataStore";
import { pageMetadata } from "@/lib/seo";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import HeritagePattern from "@/components/ui/HeritagePattern";
import PlantationShowcase from "@/components/coconut/PlantationShowcase";
import AutoplayVideo from "@/components/coconut/AutoplayVideo";
import HeroBackdrop from "@/components/layout/HeroBackdrop";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return pageMetadata("coconut");
}

const CATEGORY_ICONS: Record<string, typeof Package> = {
  "Food & Nutrition": Apple,
  "Health & Beauty": Sparkles,
  "Coir & Industrial": Layers,
  "Crafts & Energy": Flame,
};

const CATEGORY_ORDER = ["Food & Nutrition", "Health & Beauty", "Coir & Industrial", "Crafts & Energy"];

export default async function CoconutPage() {
  const data = await loadPublicData();
  const coco = data.coconut;

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: coco.products.filter((p) => p.category === cat).sort((a, b) => a.order - b.order),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <HeroBackdrop src="/videos/plantation-aerial.mp4" poster="/images/poster-plantation-aerial.jpg" />
          <div className="absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-leaf-600/30 blur-3xl" />
          <HeritagePattern id="adf-palms-coconut" className="absolute inset-0 h-full w-full opacity-[0.05] text-gold-300" />
        </div>
        <div className="container-site relative py-16 lg:py-20">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Agro-Industry &amp; Enterprise</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
              {coco.introTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/80 sm:text-lg">{coco.introText}</p>
          </Reveal>
        </div>
        <div className="heritage-border h-1.5" aria-hidden />
      </section>

      {/* Plantation in motion */}
      <section className="container-site py-16 lg:py-20">
        <Reveal>
          <SectionHeader eyebrow="The Farm in Motion" title={coco.journeyTitle} description={coco.journeyText} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <PlantationShowcase clips={coco.videos} />
          </div>
        </Reveal>
      </section>

      {/* Factory video */}
      <section className="bg-white">
        <div className="container-site grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Processing"
              title={coco.factoryTitle}
              description={coco.factoryText}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {["De-husking", "Kernel extraction", "Milling & pressing", "Drying & packaging"].map((step) => (
                <span key={step} className="rounded-full bg-navy-100/70 px-4 py-1.5 text-xs font-semibold text-navy-800">
                  {step}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-gold-500/15" />
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-navy-100">
                <AutoplayVideo
                  src="/videos/factory.mp4"
                  label="Coconut de-husking machine in operation at the Afemai processing facility"
                />
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">Real footage — the de-husking line at work (auto plays, sound off)</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="container-site py-16 lg:py-24">
        <Reveal>
          <SectionHeader eyebrow="The Range" title={coco.productsTitle} description={coco.productsIntro} />
        </Reveal>

        {grouped.map((group) => {
          const Icon = CATEGORY_ICONS[group.category] ?? Package;
          return (
            <div key={group.category} className="mt-14">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-gold-500">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-navy-900">{group.category}</h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-gold-700">
                      {group.items.length} product{group.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((p, i) => (
                  <Reveal key={p.id} delay={Math.min((i % 3) * 0.06, 0.18)}>
                    <div className="group h-full rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-500/50 hover:shadow-lg">
                      {p.image && (
                        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-navy-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.image}
                            alt={p.name}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold text-navy-900">{p.name}</h3>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-600 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}

        {/* Partnership CTA */}
        <Reveal delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-[2rem] bg-navy-900 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-semibold text-white text-balance sm:text-3xl">{coco.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/75 sm:text-base">{coco.ctaText}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-navy-900 shadow-lg transition-colors hover:bg-gold-400 active:scale-[0.98]"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}