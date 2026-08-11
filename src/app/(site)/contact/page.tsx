import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle } from "lucide-react";
import { loadPublicData } from "@/lib/dataStore";
import { pageMetadata } from "@/lib/seo";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { WhatsAppIcon } from "@/components/layout/WhatsAppButton";

export const revalidate = 300;

export async function generateMetadata() {
  return pageMetadata("contact");
}

export default async function ContactPage() {
  const data = await loadPublicData();
  const c = data.contact;
  const g = data.general;

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />
        </div>
        <div className="container-site relative py-16 lg:py-20">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Contact</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
              {c.introTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/80 sm:text-lg">{c.introText}</p>
          </Reveal>
        </div>
        <div className="heritage-border h-1.5" aria-hidden />
      </section>

      <section className="container-site py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* Info column */}
          <Reveal>
            <div className="space-y-4">
              {/* Quick actions — always in sync with the editable contact data */}
              <div className="grid grid-cols-2 gap-3">
                {g.phones[0] && (
                  <a
                    href={`tel:${g.phones[0].replace(/\s/g, "")}`}
                    className="group rounded-2xl bg-navy-900 p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Phone className="mx-auto h-5 w-5 text-gold-500" aria-hidden />
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-cream-50">Call us</p>
                  </a>
                )}
                <a
                  href={`https://wa.me/${(g.socials.whatsapp || g.phones[0] || "").replace(/[^\d]/g, "").replace(/^0/, "234")}?text=${encodeURIComponent("Hello! I found the Afemhai Descendant Forum website and I'd like to make an enquiry.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-[#1DA851] p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <WhatsAppIcon className="mx-auto h-5 w-5 text-white" />
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-white">WhatsApp</p>
                </a>
                {g.emails[0] && (
                  <a
                    href={`mailto:${g.emails[0]}`}
                    className="group rounded-2xl bg-gold-500 p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Mail className="mx-auto h-5 w-5 text-navy-900" aria-hidden />
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-navy-900">Email us</p>
                  </a>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(g.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-navy-200 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Navigation className="mx-auto h-5 w-5 text-navy-800" aria-hidden />
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-navy-900">Get directions</p>
                </a>
              </div>

              <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-800 text-gold-500">
                    <MapPin className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-navy-900">Our Headquarters</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.address}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-navy-900">
                    <Phone className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-navy-900">Call or WhatsApp</h2>
                  <div className="mt-2 space-y-1.5">
                    {g.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-sm text-slate-600 hover:text-navy-800">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-600 text-cream-50">
                    <Mail className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-navy-900">Email Us</h2>
                  <div className="mt-2 space-y-1.5">
                    {g.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`} className="block break-all text-sm text-slate-600 hover:text-navy-800">
                        {e}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-navy-100 bg-navy-900 p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-navy-900">
                    <Clock className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-white">Secretariat Hours</h2>
                    <p className="mt-2 text-sm leading-relaxed text-cream-100/75">
                      Mondays – Fridays: 9:00am – 5:00pm (WAT)
                      <br />
                      Saturdays: by appointment · Sundays: closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm">
                <iframe
                  title={`Map — ${g.address}`}
                  src={
                    c.mapUrl ||
                    `https://www.google.com/maps?q=${encodeURIComponent(g.address)}&z=15&output=embed`
                  }
                  className="h-72 w-full border-0 bg-navy-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex items-center justify-between gap-3 border-t border-navy-100 bg-white px-5 py-3">
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                    {g.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(g.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-full bg-navy-900 px-4 py-1.5 text-xs font-bold text-cream-50 hover:bg-navy-800"
                  >
                    Navigate ↗
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-lg shadow-navy-900/5 sm:p-9">
              <h2 className="font-display text-2xl font-semibold text-navy-900">{c.formTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">{c.formText}</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}