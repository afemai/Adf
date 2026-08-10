import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { loadPublicData } from "@/lib/dataStore";
import { pageMetadata } from "@/lib/seo";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/contact/ContactForm";

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

              <div className="overflow-hidden rounded-3xl border border-navy-100 shadow-sm">
                <iframe
                  title="Map — Afemhai Descendant Forum, Auchi, Edo State"
                  src={c.mapUrl}
                  className="h-72 w-full border-0 bg-navy-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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