"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

const EMPTY = { name: "", email: "", phone: "", company: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: new FormData(e.currentTarget as HTMLFormElement) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setSent(true);
        setForm(EMPTY);
      } else {
        toast.error(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error — please try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-leaf-600/30 bg-leaf-600/5 p-10 text-center">
        <p className="font-display text-2xl font-semibold text-navy-900">Message sent!</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Thank you for reaching out. The Forum&apos;s secretariat will respond shortly.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-full bg-navy-800 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-navy-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 transition";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-800">
            Full name <span className="text-ember-500">*</span>
          </label>
          <input id="cf-name" name="name" required maxLength={120} value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-800">
            Email address
          </label>
          <input id="cf-email" name="email" type="email" maxLength={120} value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-800">
            Phone / WhatsApp
          </label>
          <input id="cf-phone" name="phone" maxLength={40} value={form.phone} onChange={set("phone")} placeholder="+234 …" className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-subject" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-800">
            Subject
          </label>
          <input id="cf-subject" name="subject" maxLength={150} value={form.subject} onChange={set("subject")} placeholder="What is this about?" className={inputCls} />
        </div>
      </div>
      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-800">
          Message <span className="text-ember-500">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          minLength={5}
          maxLength={4000}
          rows={6}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us how we can help, or how you'd like to work with the Forum…"
          className={inputCls}
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-4 text-sm font-bold text-navy-900 shadow-md transition-all hover:bg-gold-400 active:scale-[0.99] disabled:opacity-60 sm:w-auto"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        {sending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}