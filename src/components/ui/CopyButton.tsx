"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${text}`}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all active:scale-90",
        copied
          ? "bg-leaf-600/20 text-leaf-500 ring-1 ring-leaf-500/50"
          : "bg-gold-500/10 text-gold-500 ring-1 ring-gold-500/40 hover:bg-gold-500/25 hover:text-gold-300",
        className,
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
