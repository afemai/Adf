import { loadPublicData } from "@/lib/dataStore";
import { pageMetadata } from "@/lib/seo";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { MapPin, Shield, Landmark, ScrollText, Quote } from "lucide-react";

export const revalidate = 300;

export async function generateMetadata() {
  return pageMetadata("about");
}

export default async function AboutPage() {
  const data = await loadPublicData();
  const about = data.about;

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden>
            <defs>
              <pattern id="adf-grid-about" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0v40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#adf-grid-about)" className="text-gold-400" />
          </svg>
        </div>
        <div className="container-site relative py-16 lg:py-20">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Our History &amp; Heritage</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
              The Story of the Afemai People
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/80 sm:text-lg">{about.introText}</p>
          </Reveal>
        </div>
        <div className="heritage-border h-1.5" aria-hidden />
      </section>

      {/* Origin + Kukuruku */}
      <section className="container-site py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-navy-100 bg-white p-8 shadow-sm sm:p-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-gold-500">
                <MapPin className="h-6 w-6" aria-hidden />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-navy-900">{about.originTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{about.originText}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-navy-100 bg-white p-8 shadow-sm sm:p-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-navy-900">
                <Shield className="h-6 w-6" aria-hidden />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-navy-900">{about.kukurukuTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{about.kukurukuText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The 6 LGAs */}
      <section className="bg-white">
        <div className="container-site py-16 lg:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="Edo North"
              title={about.divisionsTitle}
              description={about.divisionsText}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {about.lgas.map((lga, i) => (
              <Reveal key={lga.id} delay={(i % 3) * 0.08}>
                <details className="group h-full overflow-hidden rounded-3xl border border-navy-100 bg-cream-50 shadow-sm transition-shadow open:shadow-xl open:shadow-navy-900/10">
                  <summary className="cursor-pointer list-none p-7 [&::-webkit-details-marker]:hidden">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-700">{lga.division}</p>
                        <h3 className="mt-1 font-display text-2xl font-semibold text-navy-900">{lga.name}</h3>
                        <p className="mt-1 text-sm font-medium text-navy-700">
                          Headquarters: {lga.headquarters}
                        </p>
                      </div>
                      <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-800 text-gold-500 transition-transform group-open:rotate-45">
                        <Landmark className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </summary>
                  <div className="border-t border-navy-100 px-7 pb-7">
                    {lga.communities.length > 0 && (
                      <div className="mt-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-navy-700">Major communities</p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {lga.communities.map((c) => (
                            <li key={c} className="rounded-full bg-navy-100/70 px-3 py-1 text-xs font-medium text-navy-800">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {lga.rulers.length > 0 && (
                      <div className="mt-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-navy-700">Traditional institutions</p>
                        <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                          {lga.rulers.map((r) => (
                            <li key={r} className="flex gap-2">
                              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="mt-5 text-sm leading-relaxed text-slate-600">{lga.economy}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-site py-16 lg:py-24">
        <Reveal>
          <SectionHeader eyebrow="Through the Ages" title={about.timelineTitle} />
        </Reveal>
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-gold-500 via-navy-300 to-transparent sm:left-1/2" />
          <div className="space-y-8">
            {about.timeline.map((t, i) => (
              <Reveal key={t.era} delay={Math.min(i * 0.05, 0.3)}>
                <div className={`relative flex gap-6 pl-10 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right sm:flex-row-reverse"}`}>
                  <span
                    aria-hidden
                    className={`absolute top-1 left-4 -translate-x-1/2 h-4 w-4 rounded-full border-4 border-cream-50 bg-gold-500 sm:left-0 ${i % 2 ? "sm:left-auto sm:-right-2 sm:translate-x-1/2" : "sm:left-auto sm:-right-2 sm:translate-x-1/2"}`}
                  />
                  <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-700">{t.era}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Aims & objectives */}
      <section className="bg-navy-900">
        <div className="container-site py-16 lg:py-24">
          <Reveal>
            <SectionHeader
              light
              eyebrow="Our Charter"
              title={about.aimsTitle}
              description={about.aimsIntro}
            />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {about.aims.map((aim, i) => (
              <Reveal key={aim.title} delay={Math.min((i % 2) * 0.08, 0.16)}>
                <details className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors open:bg-white/10">
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 font-display text-sm font-bold text-navy-900">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex-1 font-display text-lg font-semibold text-white">{aim.title}</h3>
                    <ScrollText className="h-5 w-5 shrink-0 text-gold-400 transition-transform group-open:rotate-90" aria-hidden />
                  </summary>
                  <p className="px-5 pb-5 pl-[4.5rem] text-sm leading-relaxed text-cream-100/80">{aim.text}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <figure className="mx-auto mt-16 max-w-3xl text-center">
              <Quote className="mx-auto h-8 w-8 text-gold-400" aria-hidden />
              <blockquote className="mt-4 font-display text-2xl font-medium leading-snug text-white text-balance sm:text-3xl">
                &ldquo;{about.philosophy}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.3em] text-gold-400">
                Philosophy of the {data.general.orgName}
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="heritage-border h-1.5" aria-hidden />
      </section>
    </>
  );
}