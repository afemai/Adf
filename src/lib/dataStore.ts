import bcrypt from "bcryptjs";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { DEFAULT_DATA } from "./defaults";
import { dbRead, dbWrite } from "./store";
import type { SiteData } from "./types";

// NOTE: deliberately NO cross-request cache. Next.js compiles each route into
// its own server bundle, so an in-memory memo would be per-bundle and could
// serve stale data after saves (agcogbe lesson). We only use React's
// per-request cache() so every component in one request shares a single
// snapshot (layout + page + metadata = one store read), while every request
// still reads fresh — edits are visible immediately.

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || "Afemai2026!";

function deepMerge<T>(base: T, override: Partial<T> | undefined | null): T {
  if (!override) return base;
  if (Array.isArray(base) || Array.isArray(override)) return (override as T) ?? base;
  if (typeof base === "object" && base !== null && typeof override === "object" && override !== null) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(override as Record<string, unknown>)) {
      const b = (base as Record<string, unknown>)[key];
      const o = (override as Record<string, unknown>)[key];
      out[key] =
        b !== undefined && typeof b === "object" && b !== null && typeof o === "object" && o !== null && !Array.isArray(b) && !Array.isArray(o)
          ? deepMerge(b, o)
          : o !== undefined
            ? o
            : b;
    }
    return out as T;
  }
  return (override as T) ?? base;
}

async function loadRaw(): Promise<SiteData | null> {
  const raw = await dbRead();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SiteData;
  } catch {
    return null;
  }
}

async function ensureSeeded(): Promise<SiteData> {
  const existing = await loadRaw();
  // Only trust a row that actually looks like a full site document — a
  // partial/foreign row (e.g. a probe write) must not block real seeding.
  if (existing && existing.general?.orgName && existing.settings?.adminPasswordHash) {
    return existing;
  }

  const seeded: SiteData = {
    ...DEFAULT_DATA,
    settings: {
      ...DEFAULT_DATA.settings,
      adminPasswordHash: bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10),
    },
  };
  await saveRaw(seeded);
  return seeded;
}

async function saveRaw(data: SiteData): Promise<void> {
  await dbWrite(JSON.stringify({ ...data, updatedAt: new Date().toISOString() }));
}

// React's cache(): one store read per request, shared by every component
// (layout, page, metadata) — no cross-request staleness, no per-bundle traps.
const loadForRender = cache(async (): Promise<SiteData> => {
  return loadData();
});

export async function loadData(): Promise<SiteData> {
  const data = await ensureSeeded();
  // Merge with defaults so newly-added fields always have sane values.
  return deepMerge(DEFAULT_DATA, { ...data }) as SiteData;
}

/** Public-facing copy — never exposes credentials. */
export async function loadPublicData(): Promise<SiteData> {
  const data = await loadForRender();
  return {
    ...data,
    settings: {
      ...data.settings,
      adminPasswordHash: "",
    },
  };
}

export async function saveData(updated: SiteData): Promise<void> {
  // Deep-merge with the existing document so partial saves (e.g. the inbox
  // sending only contact.messages) can never wipe other sections.
  const existing = await loadData();
  const merged: SiteData = deepMerge(existing, updated) as SiteData;
  // Never let a save wipe the password hash unless it's an explicit
  // change-password call (hash is stripped from every client payload).
  const hash =
    merged.settings?.adminPasswordHash ||
    existing.settings?.adminPasswordHash ||
    bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10);
  const payload: SiteData = {
    ...merged,
    settings: { ...merged.settings, adminPasswordHash: hash },
  };
  await saveRaw(payload);
  // Refresh all public pages instantly (ISR).
  revalidatePath("/", "layout");
  revalidatePath("/about", "layout");
  revalidatePath("/coconut", "layout");
  revalidatePath("/leadership", "layout");
  revalidatePath("/contact", "layout");
}

export async function changeAdminPassword(currentPassword: string, newPassword: string): Promise<"ok" | "bad-current" | "weak"> {
  if (newPassword.length < 8) return "weak";
  const data = await loadData();
  const ok = bcrypt.compareSync(currentPassword, data.settings.adminPasswordHash);
  if (!ok) return "bad-current";
  await saveRaw({
    ...data,
    settings: { ...data.settings, adminPasswordHash: bcrypt.hashSync(newPassword, 10) },
  });
  return "ok";
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const data = await loadData();
  return bcrypt.compareSync(password, data.settings.adminPasswordHash);
}