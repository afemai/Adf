import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import type { GeneralInfo } from "@/lib/types";

export default function Footer({ general, logo }: { general: GeneralInfo; logo?: string }) {
  const year = new Date().getFullYear();
  const socials = general.socials;
  const valid = (u?: string) => Boolean(u && /^https?:\/\/.+/.test(u));
  const hasSocials =
    valid(socials.facebook) || valid(socials.instagram) || valid(socials.twitter) || valid(socials.youtube);

  return (
    <footer className="bg-navy-950 text-cream-100">
      <div className="heritage-border h-1.5" aria-hidden />
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo || general.logo || "/brand/logo.jpeg"} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-gold-500/70" width={48} height={48} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white">{general.orgName}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-gold-400">{general.tagline}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream-100/80">{general.philosophy}</p>
            <p className="mt-4 text-xs text-cream-100/50">
              Incorporated Trustee · Reg. No. {general.regNo}
              <br />
              Since {general.incDate}
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-gold-400 uppercase tracking-wider">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "Our History" },
                { href: "/coconut", label: "Coconut Business" },
                { href: "/leadership", label: "Leadership & Trustees" },
                { href: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream-100/80 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-gold-400 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream-100/80">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-gold-500 mt-0.5" aria-hidden />
                <span>{general.address}</span>
              </li>
              {general.phones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold-500 mt-0.5" aria-hidden />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-gold-400 transition-colors">
                    {p}
                  </a>
                </li>
              ))}
              {general.emails.map((e) => (
                <li key={e} className="flex gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-gold-500 mt-0.5" aria-hidden />
                  <a href={`mailto:${e}`} className="hover:text-gold-400 transition-colors break-all">
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-gold-400 uppercase tracking-wider">Follow Us</h3>
            {hasSocials ? (
              <div className="mt-4 flex gap-3">
                {/^https?:\/\/.+/.test(socials.facebook || "") && (
                  <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-cream-100 hover:bg-gold-500 hover:text-navy-900 transition-colors">
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                )}
                {/^https?:\/\/.+/.test(socials.instagram || "") && (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-cream-100 hover:bg-gold-500 hover:text-navy-900 transition-colors">
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                )}
                {/^https?:\/\/.+/.test(socials.twitter || "") && (
                  <a href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-cream-100 hover:bg-gold-500 hover:text-navy-900 transition-colors">
                    <XIcon className="h-5 w-5" />
                  </a>
                )}
                {/^https?:\/\/.+/.test(socials.youtube || "") && (
                  <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-cream-100 hover:bg-gold-500 hover:text-navy-900 transition-colors">
                    <YoutubeIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-4 text-sm text-cream-100/60">
                Our official Facebook, Instagram and X pages are on the way — follow the Forum soon.
              </p>
            )}
            <p className="mt-6 text-xs leading-relaxed text-cream-100/50">
              We honour the traditional institutions of the Afemai — many kingdoms, one people.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-center text-xs text-cream-100/60 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {year} {general.orgName}. All rights reserved.
          </p>
          <p>
            Registered with the Corporate Affairs Commission, Nigeria · TIN {general.tin}
          </p>
        </div>
      </div>
    </footer>
  );
}