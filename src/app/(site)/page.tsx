import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Handshake, Landmark, Sprout, Newspaper, CalendarDays, MapPin, Clock, BadgeCheck } from "lucide-react";
import { loadPublicData } from "@/lib/dataStore";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import HeritagePattern from "@/components/ui/HeritagePattern";
import StatsBand from "@/components/home/StatsBand";
import AutoplayVideo from "@/components/coconut/AutoplayVideo";
import Countdown from "@/components/home/Countdown";
import { formatDate } from "@/lib/utils";

const PILLAR_ICONS: Record<string, typeof Handshake> = {
  handshake: Handshake,
  landmark: Landmark,
  sprout: Sprout,
};

export const revalidate = 300;

export default async function HomePage() {
  const data = await loadPublicData();

  const featuredEvent = data.events.events.find((e) => e.featured) ?? data.events.events[0];

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-navy-900">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* aurora orbs */}
          <div className="animate-aurora absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-gold-500/20 blur-3xl" />
          <div className="animate-aurora absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-leaf-600/30 blur-3xl" style={{ animationDelay: "-6s" }} />
          <div className="animate-aurora absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-navy-500/40 blur-3xl" style={{ animationDelay: "-12s" }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden>
            <defs>
              <pattern id="adf-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0v40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#adf-grid)" className="text-gold-400" />
          </svg>
          <HeritagePattern className="absolute inset-0 h-full w-full opacity-[0.05] text-gold-300" />
        </div>

        <div className="container-site relative grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-28">
          <div>
            <Reveal>
              <div className="flex flex-col items-start gap-5">
                {/* Logo medallion with rotating ring */}
                <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                  <span aria-hidden className="animate-spin-slow absolute -inset-2 rounded-full border-2 border-dashed border-gold-500/60" />
                  <span aria-hidden className="animate-glow-pulse absolute -inset-4 rounded-full bg-gold-500/15 blur-xl" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.general.logo || "/brand/logo.jpeg"}
                    alt="Afemhai Descendant Forum emblem"
                    className="relative h-full w-full rounded-full object-cover ring-2 ring-gold-500/70 shadow-xl shadow-gold-500/20"
                    width={112}
                    height={112}
                  />
                </div>
                <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                  <BadgeCheck className="h-4 w-4" aria-hidden />
                  {data.homepage.heroBadge}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white text-balance sm:text-5xl lg:text-[3.4rem]">
                {data.homepage.heroTitle}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
                {data.homepage.heroSubtitle}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={data.homepage.ctaPrimary.link}
                  className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-8 py-4 text-sm font-bold text-navy-900 shadow-lg shadow-gold-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/40 active:scale-[0.98]"
                >
                  {data.homepage.ctaPrimary.text}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={data.homepage.ctaSecondary.link}
                  className="inline-flex items-center gap-2 rounded-full border border-cream-100/30 px-7 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-400"
                >
                  {data.homepage.ctaSecondary.text}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="mt-9 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cream-100/50">
                <BadgeCheck className="h-4 w-4 text-gold-500/80" aria-hidden />
                Incorporated with the CAC · Reg. No. {data.general.regNo} · {data.general.incDate}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="relative mx-auto max-w-md">
              <span aria-hidden className="animate-glow-pulse absolute -inset-4 rounded-[2.5rem] bg-gold-500/10 blur-2xl" />
              <div aria-hidden className="animate-float-slow absolute -inset-3 rounded-[2rem] border border-gold-500/40" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-navy-950/60 ring-1 ring-gold-500/30">
                <Image
                  src={data.homepage.heroImage}
                  alt="Executives of the Afemhai Descendant Forum at an official gathering"
                  fill
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="animate-ken-burns object-cover"
                  priority
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-navy-950/75 px-5 py-4 backdrop-blur-md">
                  <p className="font-display text-lg font-semibold text-white leading-snug">{data.general.tagline}</p>
                  <p className="mt-0.5 text-xs text-cream-100/70">{data.general.philosophy}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="heritage-border h-1.5" aria-hidden />
      </section>

      <StatsBand stats={data.homepage.stats} />

      {/* ---------------- PRODUCT MARQUEE ---------------- */}
      <div aria-hidden className="marquee-paused overflow-hidden border-y border-gold-500/25 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 py-4">
        <div className="animate-marquee flex w-max items-center gap-10">
          {[...data.coconut.products, ...data.coconut.products].map((p, i) => (
            <span key={`${p.id}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-400">{p.name}</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold-500/60" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- PILLARS ---------------- */}
      <section className="container-site py-16 lg:py-24">
        <Reveal>
          <SectionHeader
            eyebrow="What We Stand For"
            title="Three Pillars, One People"
            description="The Forum exists to unite Afemai descendants wherever they are, to preserve the heritage our ancestors handed down, and to turn that unity into development for our communities."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {data.homepage.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[p.icon] ?? Handshake;
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="group h-full rounded-3xl border border-navy-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-800 text-gold-500 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- COCONUT TEASER ---------------- */}
      <section className="bg-white">
        <div className="container-site grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Agro-Industry"
              title={data.homepage.coconutTeaserTitle}
              description={data.homepage.coconutTeaserText}
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/coconut"
                className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3.5 text-sm font-bold text-cream-50 transition-all hover:bg-navy-700 active:scale-[0.98]"
              >
                Explore the Industry
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-gold-500/15" />
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-navy-100">
                <AutoplayVideo
                  src="/videos/factory.mp4"
                  label="Coconut de-husking machine at the Afemhai processing facility"
                />
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">Inside the Forum&apos;s coconut processing facility — scroll-past auto play, sound off</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- EVENT SPOTLIGHT ---------------- */}
      {featuredEvent && (
        <section className="bg-navy-900">
          <div className="container-site py-16 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr_auto]">
              <Reveal>
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-3xl bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/25 sm:h-32 sm:w-32">
                  <span className="font-display text-4xl font-bold leading-none sm:text-5xl">{new Date(featuredEvent.date).getDate()}</span>
                  <span className="mt-1 text-xs font-bold uppercase tracking-widest">
                    {new Date(featuredEvent.date).toLocaleString("en-GB", { month: "short" })}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Upcoming Ceremony</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white text-balance sm:text-4xl">{featuredEvent.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/80 sm:text-base">{featuredEvent.description}</p>
                <div className="mt-5 flex flex-wrap gap-6 text-sm text-cream-100/70">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gold-400" aria-hidden />
                    {formatDate(featuredEvent.date)}
                  </span>
                  {featuredEvent.location && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold-400" aria-hidden />
                      {featuredEvent.location}
                    </span>
                  )}
                </div>
                {featuredEvent.date && (
                  <div className="mt-6">
                    <Countdown target={featuredEvent.date} />
                  </div>
                )}
              </Reveal>
              <Reveal delay={0.2}>
                <Link
                  href="/leadership"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-gold-500 px-6 py-3 text-sm font-bold text-gold-400 transition-colors hover:bg-gold-500 hover:text-navy-900"
                >
                  Learn About the Honour
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Reveal>
            </div>
          </div>
          <div className="heritage-border h-1.5" aria-hidden />
        </section>
      )}

      {/* ---------------- NEWS ---------------- */}
      <section className="container-site py-16 lg:py-24">
        <Reveal>
          <SectionHeader
            eyebrow="In the News"
            title="The Forum in the Press"
            description="Afemhai Descendants Forum engages candidates and communities on good governance, security and development."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.press.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <a
                href={item.url || "#"}
                target={item.url ? "_blank" : undefined}
                rel={item.url ? "noopener noreferrer" : undefined}
                className="group block h-full rounded-3xl border border-navy-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-700">
                  <Newspaper className="h-4 w-4" aria-hidden />
                  {item.source}
                  {item.date && <span className="text-slate-400">· {item.date}</span>}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-navy-900 group-hover:text-navy-700">
                  {item.headline}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CTA BAND ---------------- */}
      <section className="relative overflow-hidden bg-navy-950">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        </div>
        <div className="container-site relative py-20 text-center lg:py-28">
          <Reveal>
            <p className="font-display text-2xl font-medium italic text-gold-400 sm:text-3xl lg:text-4xl">
              &ldquo;{data.about.philosophy}&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream-100/70 sm:text-base">
              Descendant at home or abroad? Partner, volunteer, collaborate, or simply reconnect with your roots.
              The Forum welcomes every Afemhai son and daughter.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-navy-900 shadow-lg hover:bg-gold-400 transition-colors active:scale-[0.98]"
              >
                Join the Conversation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/coconut"
                className="inline-flex items-center gap-2 rounded-full border border-cream-100/25 px-8 py-4 text-sm font-semibold text-cream-50 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                <Sprout className="h-4 w-4" aria-hidden />
                Partner on Coconut
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}