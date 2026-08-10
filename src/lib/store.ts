import { neon } from "@neondatabase/serverless";
import { promises as fs } from "fs";
import path from "path";

// Storage abstraction:
// - Production: Neon Postgres (DATABASE_URL) — serverless driver over HTTP.
// - Local dev without DATABASE_URL: a JSON file under data/ (gitignored).
// The rest of the app only talks to readData()/writeData().

const DATA_FILE = path.join(process.cwd(), "data", "site_data.json");

export function usingNeon(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function dbRead(): Promise<string | null> {
  if (usingNeon()) {
    const sql = neon(process.env.DATABASE_URL!, {
      // CRITICAL (agcogbe lesson): Next.js intercepts and caches fetch() calls —
      // disable caching so every DB read hits the live database, otherwise
      // content/theme edits silently stop appearing.
      fetchOptions: { cache: "no-store" },
    });
    await sql`
      CREATE TABLE IF NOT EXISTS site_data (
        id INTEGER PRIMARY KEY DEFAULT 1,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    const rows = await sql`SELECT data::text AS data FROM site_data WHERE id = 1`;
    return rows.length ? rows[0].data : null;
  }

  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return raw;
  } catch {
    return null;
  }
}

export async function dbWrite(json: string): Promise<void> {
  if (usingNeon()) {
    const sql = neon(process.env.DATABASE_URL!, {
      fetchOptions: { cache: "no-store" },
    });
    await sql`
      CREATE TABLE IF NOT EXISTS site_data (
        id INTEGER PRIMARY KEY DEFAULT 1,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    const rows = await sql`SELECT id FROM site_data WHERE id = 1`;
    if (rows.length) {
      await sql`UPDATE site_data SET data = ${json}::jsonb, updated_at = NOW() WHERE id = 1`;
    } else {
      await sql`INSERT INTO site_data (id, data) VALUES (1, ${json}::jsonb)`;
    }
    return;
  }

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, json, "utf8");
}