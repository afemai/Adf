"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, FileText, Home, BookOpen, Leaf, Users, CalendarDays,
  Newspaper, Award, Palette, MessageSquare, Settings, ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/general", label: "General Info", icon: FileText },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/about", label: "History & About", icon: BookOpen },
  { href: "/admin/coconut", label: "Coconut Business", icon: Leaf },
  { href: "/admin/leadership", label: "Leadership", icon: Users },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/press", label: "News & Press", icon: Newspaper },
  { href: "/admin/seo", label: "SEO", icon: Award },
  { href: "/admin/theme", label: "Theme & Colors", icon: Palette },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children, orgName, logo }: { children: React.ReactNode; orgName: string; logo?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-navy-100 bg-navy-900 text-white">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo || "/brand/logo.jpeg"} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-gold-500/60" width={36} height={36} />
            <div className="leading-tight">
              <p className="text-sm font-bold truncate">{orgName}</p>
              <p className="flex items-center gap-1 text-[11px] text-gold-400">
                <ShieldCheck className="h-3 w-3" aria-hidden /> Admin Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="hidden rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:border-gold-400 hover:text-gold-400 sm:block">
              View live site ↗
            </Link>
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="rounded-full bg-ember-500/15 px-4 py-2 text-xs font-bold text-ember-500 hover:bg-ember-500/25 disabled:opacity-60"
            >
              {loggingOut ? "…" : "Log out"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1" aria-label="Admin sections">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                    active ? "bg-navy-900 text-cream-50 shadow" : "text-navy-800 hover:bg-white"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile nav toggle */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-bold text-cream-50"
            >
              {open ? "Close menu" : "Admin sections"} ▾
            </button>
            {open && (
              <nav className="mt-2 grid grid-cols-2 gap-1 rounded-2xl border border-navy-100 bg-white p-2 shadow-lg" aria-label="Admin sections mobile">
                {NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold",
                        active ? "bg-navy-900 text-cream-50" : "text-navy-800 hover:bg-slate-100"
                      )}
                    >
                      <item.icon className="h-4 w-4 text-gold-600" aria-hidden />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}