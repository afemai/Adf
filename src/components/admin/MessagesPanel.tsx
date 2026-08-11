"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Trash2, MailOpen, Loader2, Inbox } from "lucide-react";
import type { ContactMessage } from "@/lib/types";
import { formatDate } from "@/lib/utils";

// Admin inbox: mark read/unread, delete, reply-by-email links.
// Mutations go through the full-content save API (single-document store).
export default function MessagesPanel({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  async function mutate(next: ContactMessage[], id: string) {
    setBusyId(id);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: { messages: next } }),
      });
      if (res.ok) {
        setMessages(next);
        toast.success("Updated");
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setBusyId(null);
    }
  }

  const toggleRead = (m: ContactMessage) =>
    mutate(messages.map((x) => (x.id === m.id ? { ...x, isRead: !x.isRead } : x)), m.id);

  const remove = (m: ContactMessage) => {
    if (!confirm(`Delete the message from ${m.name}? This cannot be undone.`)) return;
    mutate(messages.filter((x) => x.id !== m.id), m.id);
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-navy-200 bg-white py-16 text-center">
        <Inbox className="h-10 w-10 text-slate-300" aria-hidden />
        <p className="text-sm text-slate-500">The inbox is empty. Messages from the contact form will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => {
        const open = openId === m.id;
        return (
          <article
            key={m.id}
            className={`rounded-2xl border bg-white p-5 shadow-sm transition-colors ${m.isRead ? "border-navy-100" : "border-gold-500/60"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                  {!m.isRead && <span className="inline-block h-2 w-2 rounded-full bg-gold-500" aria-hidden />}
                  {m.name}
                  {m.subject && <span className="font-normal text-slate-400">— {m.subject}</span>}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{formatDate(m.submittedAt)}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={`mailto:${m.email || ""}?subject=${encodeURIComponent("Re: " + (m.subject || "Your message to the Afemai Descendants Forum"))}`}
                  aria-label={m.email ? `Reply to ${m.email}` : "Reply (no email provided)"}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-100/70 text-navy-800 hover:bg-gold-500 hover:text-navy-900"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                </a>
                {m.phone && (
                  <a href={`tel:${m.phone.replace(/\s/g, "")}`} aria-label={`Call ${m.phone}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-100/70 text-navy-800 hover:bg-gold-500 hover:text-navy-900">
                    <Phone className="h-4 w-4" aria-hidden />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => toggleRead(m)}
                  aria-label={m.isRead ? "Mark as unread" : "Mark as read"}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-100/70 text-navy-800 hover:bg-gold-500 hover:text-navy-900"
                >
                  {busyId === m.id ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <MailOpen className="h-4 w-4" aria-hidden />}
                </button>
                <button
                  type="button"
                  onClick={() => remove(m)}
                  aria-label="Delete message"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ember-500/10 text-ember-500 hover:bg-ember-500/20"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
            <button type="button" onClick={() => setOpenId(open ? null : m.id)} className="mt-3 text-xs font-semibold text-navy-800 hover:text-navy-600">
              {open ? "Hide message" : "Read message"}
            </button>
            {open && (
              <p className="mt-2 rounded-xl bg-cream-50 p-4 text-sm leading-relaxed text-slate-700">
                {m.message}
                {m.email && <span className="mt-3 block text-xs text-slate-400">From: {m.email}</span>}
                {m.phone && <span className="mt-1 block text-xs text-slate-400">Phone: {m.phone}</span>}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}