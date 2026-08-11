import { Award, Mail, Phone, Medal, Users } from "lucide-react";
import { loadPublicData } from "@/lib/dataStore";
import { pageMetadata } from "@/lib/seo";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import HeritagePattern from "@/components/ui/HeritagePattern";
import { initials } from "@/lib/utils";

export const revalidate = 300;

export async function generateMetadata() {
  return pageMetadata("leadership");
}

function LeaderCard({
  name,
  title,
  bio,
  email,
  phone,
  image,
}: {
  name: string;
  title: string;
  bio?: string;
  email?: string;
  phone?: string;
  image?: string;
}) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
      <div className="flex items-center gap-4">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={`Portrait of ${name}`}
            loading="lazy"
            decoding="async"
            className="h-[4.5rem] w-[4.5rem] rounded-2xl object-cover ring-2 ring-gold-500/50"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-navy-800 font-display text-xl font-bold text-gold-500"
          >
            {initials(name)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-tight text-navy-900">{name}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gold-700">{title}</p>
        </div>
      </div>
      {bio && <p className="mt-4 text-sm leading-relaxed text-slate-600">{bio}</p>}
      {(email || phone) && (
        <div className="mt-auto flex flex-col gap-1.5 pt-4 text-xs text-slate-500">
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-navy-800">
              <Phone className="h-3.5 w-3.5 text-gold-600" aria-hidden />
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 break-all hover:text-navy-800">
              <Mail className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden />
              {email}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default async function LeadershipPage() {
  const data = await loadPublicData();
  const lead = data.leadership;

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />
          <HeritagePattern id="adf-palms-leadership" className="absolute inset-0 h-full w-full opacity-[0.05] text-gold-300" />
        </div>
        <div className="container-site relative py-16 lg:py-20">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Leadership &amp; Trustees</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
              {lead.introTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/80 sm:text-lg">{lead.introText}</p>
          </Reveal>
        </div>
        <div className="heritage-border h-1.5" aria-hidden />
      </section>

      {/* Honor roll */}
      <section className="container-site py-16 lg:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-gold-500/50 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-8 shadow-xl sm:p-12">
            <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-2xl" />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30">
                <Award className="h-12 w-12" aria-hidden />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">{lead.honorTitle}</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white text-balance sm:text-3xl">
                  High Chief Luchy Ohimai
                </h2>
                <p className="mt-1 text-sm font-bold text-gold-400">The Ogbuduwemi of Owan Nation · CEO, Tarex Conglomerate</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream-100/80 sm:text-base">{lead.honorText}</p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-4 py-2 text-sm font-semibold text-gold-400">
                  <Medal className="h-4 w-4" aria-hidden />
                  Investiture: Saturday, 26 September 2026 · Auchi, Edo State
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Executives */}
        <div className="mt-20">
          <Reveal>
            <SectionHeader eyebrow="National Executives" title={lead.execsTitle} description={lead.execsIntro} />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lead.leaders.slice(0, 3).map((l, i) => (
              <Reveal key={l.id} delay={i * 0.08}>
                <LeaderCard name={l.name} title={l.title} bio={l.bio} email={l.email} phone={l.phone} image={l.image} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Trustees */}
        <div className="mt-20">
          <Reveal>
            <SectionHeader
              eyebrow="The Board"
              title={lead.trusteesTitle}
              description={lead.trusteesIntro}
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {lead.leaders.slice(3).map((l, i) => (
              <Reveal key={l.id} delay={(i % 4) * 0.06}>
                <LeaderCard name={l.name} title={l.title} bio={l.bio} email={l.email} phone={l.phone} image={l.image} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white">
        <div className="container-site py-16 lg:py-24">
          <Reveal>
            <SectionHeader eyebrow="Gallery" title={lead.galleryTitle} description={lead.galleryIntro} />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {lead.gallery.map((g, i) => (
              <Reveal key={g.id} delay={(i % 3) * 0.06}>
                <a
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-2xl bg-navy-100 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.url}
                      alt={g.caption}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-4 pt-10">
                    <p className="flex items-start gap-2 text-xs font-medium leading-snug text-cream-50">
                      <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden />
                      {g.caption}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}