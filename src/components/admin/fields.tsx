"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, X, GripVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// ---- Generic admin field renderers used by ContentEditor ----

export type FieldDef =
  | { key: string; label: string; type: "text" | "url" | "number"; help?: string; placeholder?: string }
  | { key: string; label: string; type: "textarea"; help?: string; rows?: number; placeholder?: string }
  | { key: string; label: string; type: "lines"; help?: string; rows?: number; placeholder?: string }
  | { key: string; label: string; type: "color"; help?: string }
  | { key: string; label: string; type: "toggle"; help?: string }
  | { key: string; label: string; type: "select"; help?: string; placeholder?: string; options: { value: string; label: string }[] }
  | { key: string; label: string; type: "image"; help?: string }
  | { key: string; label: string; type: "array"; help?: string; itemFields: FieldDef[] };

export const inputCls =
  "w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 transition";

// Array item titles are derived client-side (no functions cross the
// server/client boundary in Next.js App Router). Prefers a name-like field,
// then the first non-empty text field.
function deriveTitle(item: Record<string, unknown>, itemFields: FieldDef[], i: number): string {
  const preferred = ["name", "title", "label", "value", "headline", "era", "caption"];
  for (const key of preferred) {
    const v = item[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  for (const f of itemFields) {
    if (f.type === "text") {
      const v = item[f.key];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
  }
  return `Item ${i + 1}`;
}

export function FieldLabel({ label, help }: { label: string; help?: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-navy-800">{label}</p>
      {help && <p className="mt-0.5 text-xs text-slate-500">{help}</p>}
    </div>
  );
}

export function ImageField({
  value,
  onChange,
  label,
  help,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  help?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.url) {
        onChange(json.url);
      } else {
        alert(json.error || "Upload failed");
      }
    } catch {
      alert("Upload failed — network error");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <FieldLabel label={label} help={help} />
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-navy-200 bg-navy-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-dashed border-navy-300 text-xs text-slate-400">
            none
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/… or https://…"
            className={inputCls}
            aria-label={`${label} — image path`}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-3 py-1.5 text-xs font-semibold text-cream-50 hover:bg-navy-700 disabled:opacity-60"
            >
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Upload className="h-3.5 w-3.5" aria-hidden />}
              {uploading ? "Uploading…" : "Upload"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ember-500/10 px-3 py-1.5 text-xs font-semibold text-ember-500 hover:bg-ember-500/20"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={upload} className="hidden" aria-hidden tabIndex={-1} />
    </div>
  );
}

export function ArrayEditor({
  label,
  help,
  items,
  itemFields,
  onChange,
}: {
  label: string;
  help?: string;
  items: Array<Record<string, unknown>>;
  itemFields: FieldDef[];
  onChange: (items: Array<Record<string, unknown>>) => void;
}) {
  const isStringItems = items.length > 0 && items.every((it) => typeof it === "string");
  const itemsNorm: Array<Record<string, unknown>> = isStringItems
    ? items.map((s) => ({ value: String(s) }))
    : items;

  const emit = (next: Array<Record<string, unknown>>) =>
    onChange((isStringItems ? next.map((o) => String(o.value ?? "")) : next) as typeof items);

  const update = (index: number, key: string, value: unknown) =>
    emit(itemsNorm.map((it, i) => (i === index ? { ...it, [key]: value } : it)));
  const remove = (index: number) => emit(itemsNorm.filter((_, i) => i !== index));
  const move = (index: number, dir: -1 | 1) => {
    const next = [...itemsNorm];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    emit(next);
  };
  const add = () => {
    const blank: Record<string, unknown> = {};
    for (const f of itemFields) {
      if (f.type === "toggle") blank[f.key] = false;
      else if (f.type === "array") blank[f.key] = [];
      else if (f.type === "number") blank[f.key] = 0;
      else blank[f.key] = "";
    }
    emit([...itemsNorm, blank]);
  };

  return (
    <div className="space-y-2">
      <FieldLabel label={label} help={help} />
      <div className="space-y-3">
        {itemsNorm.map((item, i) => (
          <div key={String(item.id ?? i)} className="rounded-2xl border border-navy-100 bg-cream-50/60 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-bold text-navy-800">
                <GripVertical className="h-4 w-4 text-slate-400" aria-hidden />
                {deriveTitle(item, itemFields, i)}
              </p>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${deriveTitle(item, itemFields, i)} up`} className="rounded-lg px-2 py-1 text-xs font-bold text-slate-500 hover:bg-navy-100 disabled:opacity-30">↑</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label={`Move ${deriveTitle(item, itemFields, i)} down`} className="rounded-lg px-2 py-1 text-xs font-bold text-slate-500 hover:bg-navy-100 disabled:opacity-30">↓</button>
                <button type="button" onClick={() => remove(i)} aria-label={`Remove ${deriveTitle(item, itemFields, i)}`} className="ml-1 rounded-lg bg-ember-500/10 px-2.5 py-1 text-xs font-bold text-ember-500 hover:bg-ember-500/20">
                  Remove
                </button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {itemFields
                .filter((f) => f.type !== "array")
                .map((f) => {
                  const val = item[f.key];
                  const setVal = (v: unknown) => update(i, f.key, v);
                  if (f.type === "toggle") {
                    return (
                      <label key={f.key} className="flex items-center justify-between gap-3 rounded-xl border border-navy-100 bg-white px-4 py-3">
                        <span className="text-sm font-semibold text-navy-800">{f.label}</span>
                        <input type="checkbox" checked={Boolean(val)} onChange={(e) => setVal(e.target.checked)} className="h-5 w-5 accent-gold-500" />
                      </label>
                    );
                  }
                  if (f.type === "color") {
                    return (
                      <label key={f.key} className="block">
                        <span className="text-xs font-bold uppercase tracking-wider text-navy-800">{f.label}</span>
                        <input type="color" value={String(val || "#0B2447")} onChange={(e) => setVal(e.target.value)} className="mt-1.5 h-10 w-full cursor-pointer rounded-xl border border-navy-200 bg-white" />
                      </label>
                    );
                  }
                  if (f.type === "image") {
                    return (
                      <div key={f.key} className="sm:col-span-2">
                        <ImageField label={f.label} help={f.help} value={String(val || "")} onChange={(v) => setVal(v)} />
                      </div>
                    );
                  }
                  return (
                    <label key={f.key} className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-800">{f.label}</span>
                      {f.type === "textarea" ? (
                        <textarea
                          value={String(val ?? "")}
                          onChange={(e) => setVal(e.target.value)}
                          rows={f.rows ?? 3}
                          className={cn(inputCls, "mt-1.5")}
                        />
                      ) : (
                        <input
                          type={f.type === "number" ? "number" : "text"}
                          value={String(val ?? "")}
                          onChange={(e) => setVal(f.type === "number" ? Number(e.target.value) : e.target.value)}
                          placeholder={f.placeholder}
                          className={cn(inputCls, "mt-1.5")}
                        />
                      )}
                    </label>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-xl border-2 border-dashed border-navy-300 px-4 py-2.5 text-sm font-semibold text-navy-800 hover:border-gold-500 hover:text-gold-700"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Add item
      </button>
    </div>
  );
}