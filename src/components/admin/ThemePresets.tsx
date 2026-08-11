"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESETS = [
  {
    name: "Royal Gold",
    desc: "The classic ADF navy & gold",
    primary: "#0B2447",
    secondary: "#F2B705",
    accent: "#1E7A46",
  },
  {
    name: "Forest Heritage",
    desc: "Deep green with amber",
    primary: "#0E2A1F",
    secondary: "#D9A404",
    accent: "#2E8B57",
  },
  {
    name: "Sunset Ember",
    desc: "Rich maroon & copper",
    primary: "#3B0D1B",
    secondary: "#FF9F1C",
    accent: "#C2410C",
  },
  {
    name: "Ocean Calm",
    desc: "Teal & sand",
    primary: "#062A3A",
    secondary: "#E8C872",
    accent: "#0F766E",
  },
  {
    name: "Independence",
    desc: "Nigeria green & white",
    primary: "#00462B",
    secondary: "#F2B705",
    accent: "#15803D",
  },
];

export default function ThemePresets() {
  const [busy, setBusy] = useState<string | null>(null);

  async function apply(name: string, colors: (typeof PRESETS)[number]) {
    setBusy(name);
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("read");
      const data = await res.json();
      data.theme = {
        ...data.theme,
        primaryColor: colors.primary,
        secondaryColor: colors.secondary,
        accentColor: colors.accent,
      };
      const save = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: data.theme }),
      });
      if (!save.ok) throw new Error("save");
      toast.success(`Theme "${name}" applied — the site is restyled.`);
    } catch {
      toast.error("Could not apply the theme. Are you still signed in?");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {PRESETS.map((p) => (
        <button
          key={p.name}
          type="button"
          disabled={busy !== null}
          onClick={() => apply(p.name, p)}
          className="group rounded-2xl border border-navy-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
        >
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-full ring-2 ring-offset-1" style={{ backgroundColor: p.primary, ["--tw-ring-color" as string]: p.secondary }} />
            <span className="h-7 w-7 rounded-full ring-2 ring-offset-1" style={{ backgroundColor: p.secondary, ["--tw-ring-color" as string]: p.accent }} />
            <span className="h-7 w-7 rounded-full ring-2 ring-offset-1" style={{ backgroundColor: p.accent, ["--tw-ring-color" as string]: p.primary }} />
            {busy === p.name && <Loader2 className="ml-auto h-4 w-4 animate-spin text-gold-600" aria-hidden />}
            {busy !== null && busy !== p.name && <Check className="ml-auto h-4 w-4 text-slate-300" aria-hidden />}
          </div>
          <p className="mt-3 text-sm font-bold text-navy-900">{p.name}</p>
          <p className="mt-0.5 text-xs text-slate-500">{p.desc}</p>
        </button>
      ))}
    </div>
  );
}