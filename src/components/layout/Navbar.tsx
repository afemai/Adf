"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SeasonalMode } from "@/lib/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our History" },
  { href: "/coconut", label: "Coconut Business" },
  { href: "/leadership", label: "Leadership" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({
  orgName,
  logo,
  announcement,
  seasonalMode = "none",
}: {
  orgName: string;
  logo?: string;
  announcement?: { enabled: boolean; text: string; link?: string; linkLabel?: string };
  seasonalMode?: SeasonalMode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {announcement?.enabled && (
        <div className="bg-gold-500 text-navy-900 text-center text-sm font-medium px-4 py-2">
          {announcement.text}
          {announcement.link && announcement.linkLabel && (
            <Link href={announcement.link} className="underline underline-offset-2 ml-2 font-semibold hover:text-navy-700">
              {announcement.linkLabel}
            </Link>
          )}
        </div>
      )}

      <nav
        aria-label="Main navigation"
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-cream-50/90 shadow-[0_4px_24px_rgba(6,15,34,0.1)] backdrop-blur-xl"
            : "bg-cream-50/70 backdrop-blur-sm"
        )}
      >
        <div className="container-site flex items-center justify-between h-18">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={`${orgName} — home`}>
            <span className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo || "/brand/logo.jpeg"} alt="Afemai Descendants Forum logo" className="h-11 w-11 rounded-full object-cover ring-2 ring-gold-500/60" width={44} height={44} />
            </span>
            <span className="hidden sm:block font-display text-navy-900 leading-tight">
              <span className="block text-[13px] uppercase tracking-[0.18em] text-navy-700 font-semibold">Afemai Descendant</span>
              <span className="block text-[11px] tracking-[0.3em] uppercase text-gold-700">Forum · Unity is Power</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "nav-link-underline px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    active ? "bg-navy-800 text-cream-50 is-active" : "text-navy-800 hover:bg-navy-100/60"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-5 py-2.5 text-sm font-bold text-navy-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Get in Touch
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 hover:bg-navy-100/70"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-navy-100 bg-cream-50 px-4 py-4 shadow-xl">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium",
                    pathname === l.href ? "bg-navy-800 text-cream-50" : "text-navy-900 hover:bg-navy-100/60"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-base font-bold text-navy-900"
              >
                <Phone className="h-5 w-5" aria-hidden />
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}