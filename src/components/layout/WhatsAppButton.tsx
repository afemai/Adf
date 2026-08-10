"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Floating WhatsApp button. Opens a chat with the configured number (or the
// first published phone as a fallback).
export default function WhatsAppButton({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  if (!phone) return null;

  const digits = phone.replace(/[^\d]/g, "");
  const wa = `https://wa.me/${digits.startsWith("0") ? "234" + digits.slice(1) : digits}?text=${encodeURIComponent(
    "Hello! I found the Afemhai Descendant Forum website and I'd like to make an enquiry."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-navy-100">
          <p className="text-sm font-semibold text-navy-900">Chat with the Forum</p>
          <p className="mt-1 text-xs text-slate-500">
            Send us a message on WhatsApp and the secretariat will respond.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white hover:brightness-95"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Open WhatsApp
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        className={cn(
          "inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all active:scale-95",
          open ? "bg-navy-800 text-cream-50" : "bg-[#25D366] text-white hover:brightness-95"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}