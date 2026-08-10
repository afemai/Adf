"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Save, Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrayEditor, FieldDef, ImageField, inputCls } from "./fields";

export interface SectionDef {
  title: string;
  description?: string;
  path: string; // dot-path into the SiteData object, e.g. "homepage.heroTitle"
  fields: FieldDef[];
}

function getAt(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined), obj);
}

function setAt(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split(".");
  const out: Record<string, unknown> = { ...obj };
  let cursor = out;
  for (let i = 0; i < keys.length - 1; i++) {
    const cur = cursor[keys[i]];
    cursor[keys[i]] = cur && typeof cur === "object" && !Array.isArray(cur) ? { ...(cur as Record<string, unknown>) } : {};
    cursor = cursor[keys[i]] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;
  return out;
}

/** Auto-assign numeric "order" fields inside arrays to their list index. */
function normalizeOrders(data: Record<string, unknown>, sections: SectionDef[]): Record<string, unknown> {
  let out = data;
  for (const section of sections) {
    for (const field of section.fields) {
      if (field.type === "array") {
        const arr = getAt(out, `${section.path}.${field.key}`);
        if (Array.isArray(arr)) {
          const normalized = arr.map((item, i) => {
            if (item && typeof item === "object" && "order" in item) {
              return { ...(item as Record<string, unknown>), order: i + 1 };
            }
            return item;
          });
          out = setAt(out, `${section.path}.${field.key}`, normalized);
        }
        // nested arrays are not used at this level — product arrays are flat
      }
    }
  }
  return out;
}

export default function ContentEditor({
  sections,
  initialData,
  accent = "gold",
}: {
  sections: SectionDef[];
  initialData: object;
  accent?: "gold" | "navy";
}) {
  const [data, setData] = useState<Record<string, unknown>>(() => JSON.parse(JSON.stringify(initialData)));
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const setValue = (path: string, value: unknown) => {
    setData((d) => setAt(d, path, value));
    setDirty(true);
  };

  const onSave = async () => {
    setSaving(true);
    try {
      const normalized = normalizeOrders(data, sections);
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });
      if (res.ok) {
        setData(normalized);
        setDirty(false);
        toast.success("Saved! The live site is updated.");
      } else {
        const json = await res.json().catch(() => ({}));
        toast.error(json.error || "Save failed");
      }
    } catch {
      toast.error("Save failed — network error");
    } finally {
      setSaving(false);
    }
  };

  const saveBtn = useMemo(
    () => (
      <button
        type="button"
        onClick={onSave}
        disabled={saving || !dirty}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-md transition-all active:scale-[0.98] disabled:opacity-40",
          accent === "gold" ? "bg-gold-500 text-navy-900 hover:bg-gold-400" : "bg-navy-800 text-cream-50 hover:bg-navy-700"
        )}
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
        {saving ? "Saving…" : dirty ? "Save Changes" : "Saved"}
      </button>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saving, dirty]
  );

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.title} className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 border-b border-navy-100 pb-4">
            <h2 className="font-display text-xl font-semibold text-navy-900">{section.title}</h2>
            {section.description && <p className="mt-1 text-sm text-slate-500">{section.description}</p>}
          </div>
          <div className="space-y-5">
            {section.fields.map((field) => {
              const value = getAt(data, `${section.path}.${field.key}`);
              if (field.type === "array") {
                return (
                  <ArrayEditor
                    key={field.key}
                    label={field.label}
                    help={field.help}
                    items={(value as Array<Record<string, unknown>>) ?? []}
                    itemFields={field.itemFields}
                    itemTitle={field.itemTitle}
                    onChange={(items) => setValue(`${section.path}.${field.key}`, items)}
                  />
                );
              }
              if (field.type === "image") {
                return (
                  <ImageField
                    key={field.key}
                    label={field.label}
                    help={field.help}
                    value={String(value ?? "")}
                    onChange={(v) => setValue(`${section.path}.${field.key}`, v)}
                  />
                );
              }
              if (field.type === "toggle") {
                return (
                  <label key={field.key} className="flex items-center justify-between gap-3 rounded-2xl border border-navy-100 bg-cream-50/60 px-5 py-4">
                    <span className="text-sm font-semibold text-navy-800">
                      {field.label}
                      {field.help && <span className="mt-0.5 block text-xs font-normal text-slate-500">{field.help}</span>}
                    </span>
                    <input type="checkbox" checked={Boolean(value)} onChange={(e) => setValue(`${section.path}.${field.key}`, e.target.checked)} className="h-5 w-5 accent-gold-500" />
                  </label>
                );
              }
              if (field.type === "color") {
                return (
                  <label key={field.key} className="block max-w-xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-800">{field.label}</p>
                    {field.help && <p className="mt-0.5 text-xs text-slate-500">{field.help}</p>}
                    <input type="color" value={String(value || "#0B2447")} onChange={(e) => setValue(`${section.path}.${field.key}`, e.target.value)} className="mt-2 h-11 w-full cursor-pointer rounded-xl border border-navy-200 bg-white" />
                  </label>
                );
              }
              if (field.type === "lines") {
                const lines = Array.isArray(value) ? (value as string[]).join("\n") : String(value ?? "");
                return (
                  <label key={field.key} className="block">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-800">{field.label}</p>
                    {field.help && <p className="mb-1.5 mt-0.5 text-xs text-slate-500">{field.help}</p>}
                    <textarea
                      value={lines}
                      onChange={(e) =>
                        setValue(
                          `${section.path}.${field.key}`,
                          e.target.value.split("\n").map((l) => l.trim()).filter(Boolean)
                        )
                      }
                      rows={field.rows ?? 3}
                      placeholder={field.placeholder}
                      className={cn(inputCls, "mt-1")}
                    />
                  </label>
                );
              }
              return (
                <label key={field.key} className="block">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-800">{field.label}</p>
                  {field.help && <p className="mb-1.5 mt-0.5 text-xs text-slate-500">{field.help}</p>}
                  {field.type === "textarea" ? (
                    <textarea
                      value={String(value ?? "")}
                      onChange={(e) => setValue(`${section.path}.${field.key}`, e.target.value)}
                      rows={field.rows ?? 4}
                      placeholder={field.placeholder}
                      className={cn(inputCls, "mt-1")}
                    />
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      value={String(value ?? "")}
                      onChange={(e) => setValue(`${section.path}.${field.key}`, field.type === "number" ? Number(e.target.value) : e.target.value)}
                      placeholder={field.placeholder}
                      className={cn(inputCls, "mt-1")}
                    />
                  )}
                </label>
              );
            })}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-2xl border border-navy-100 bg-white/95 p-4 shadow-xl backdrop-blur">
        <button
          type="button"
          onClick={() => {
            setData(JSON.parse(JSON.stringify(initialData)));
            setDirty(false);
            toast.info("Reverted to the last saved version.");
          }}
          disabled={!dirty}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-navy-100/60 disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Revert
        </button>
        <div className="flex items-center gap-3">
          <span className={cn("text-xs font-semibold", dirty ? "text-gold-700" : "text-slate-400")}>
            {dirty ? "Unsaved changes" : "All changes saved"}
          </span>
          {saveBtn}
        </div>
      </div>
    </div>
  );
}