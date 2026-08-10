import Link from "next/link";
import bcrypt from "bcryptjs";
import { loadData } from "@/lib/dataStore";
import {
  ArrowRight, Leaf, MapPinned, Users, Mail, AlertTriangle, Inbox, CircleCheck,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const data = await loadData();
  const messages = data.contact.messages ?? [];
  const unread = messages.filter((m) => !m.isRead).length;
  const isDefaultPassword = bcrypt.compareSync(
    process.env.ADMIN_INITIAL_PASSWORD || "Afemhai2026!",
    data.settings.adminPasswordHash
  );

  const stats = [
    { label: "Coconut products", value: data.coconut.products.length, icon: Leaf, href: "/admin/coconut" },
    { label: "Local Government Areas", value: data.about.lgas.length, icon: MapPinned, href: "/admin/about" },
    { label: "Leaders & trustees", value: data.leadership.leaders.length, icon: Users, href: "/admin/leadership" },
    { label: "Unread messages", value: unread, icon: Inbox, href: "/admin/messages" },
  ];

  const quickLinks = [
    { href: "/admin/general", label: "General info & contact details" },
    { href: "/admin/homepage", label: "Homepage hero, stats & CTAs" },
    { href: "/admin/coconut", label: "Coconut products & farm content" },
    { href: "/admin/leadership", label: "Leaders, trustees & gallery" },
    { href: "/admin/events", label: "Events (e.g. the investiture)" },
    { href: "/admin/seo", label: "Titles & descriptions for Google" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back. Every change you save appears on the live website instantly.
        </p>
      </div>

      {isDefaultPassword && (
        <div className="flex items-start gap-3 rounded-2xl border border-gold-500/60 bg-gold-500/10 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" aria-hidden />
          <div>
            <p className="text-sm font-bold text-navy-900">You are still using the default admin password.</p>
            <p className="mt-1 text-sm text-slate-600">
              Change it now in{" "}
              <Link href="/admin/settings" className="font-semibold text-navy-800 underline">Settings</Link>{" "}
              before handing the site to the client — anyone who knows the default can take over.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-800 text-gold-500">
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden />
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-navy-900">{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
            <Inbox className="h-5 w-5 text-gold-600" aria-hidden /> Recent messages
          </h2>
          {messages.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-navy-200 py-10 text-center">
              <CircleCheck className="h-8 w-8 text-leaf-600" aria-hidden />
              <p className="text-sm text-slate-500">No messages yet. Contact-form submissions will appear here.</p>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-navy-100">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-start justify-between gap-4 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-navy-900">
                      {m.isRead ? null : <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-gold-500 align-middle" aria-hidden />}
                      {m.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{m.subject || m.message.slice(0, 70)}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-slate-400">{m.submittedAt.slice(0, 10)}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/messages" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-navy-600">
            Open inbox <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
            <Mail className="h-5 w-5 text-gold-600" aria-hidden /> Quick edits
          </h2>
          <ul className="mt-4 space-y-1">
            {quickLinks.map((q) => (
              <li key={q.href}>
                <Link href={q.href} className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-800 hover:bg-navy-100/70">
                  {q.label}
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-600" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          {data.events.events[0] && (
            <div className="mt-5 rounded-2xl bg-navy-900 p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-400">Next event</p>
              <p className="mt-1 text-sm font-semibold text-white">{data.events.events[0].title}</p>
              <p className="mt-0.5 text-xs text-cream-100/70">
                {formatDate(data.events.events[0].date)}
                {data.events.events[0].location ? ` · ${data.events.events[0].location}` : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}