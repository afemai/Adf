# Afemai Descendants Forum — Official Website

Professional marketing website + full admin CMS for the **Afemai Descendants Forum**
(incorporated trustee, CAC Reg. No. 7309739), Auchi, Edo State, Nigeria.

- 5 public pages: Home · Our History · Coconut Business · Leadership · Contact
- Interactive 3D coconut-farm scene (React Three Fiber) with a 2D fallback
- Full admin CMS: every text, image, product, LGA, event, press item, color and
  SEO field is editable from `/admin` and publishes to the live site instantly
- SEO-first: per-page metadata, sitemap, robots, JSON-LD-friendly content, OG card
- Mobile-first, no horizontal scroll, reduced-motion aware

## Stack

Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · Framer Motion ·
React Three Fiber · Neon Postgres (JSONB single-document store) ·
Vercel Blob (uploads) · bcrypt + signed-cookie admin auth

## Running locally (no database needed)

```bash
npm install
npm run dev        # http://localhost:3000
```

Without `DATABASE_URL` the site uses a local JSON file store
(`data/site_data.json`, auto-seeded on first load). With `DATABASE_URL` set
(a Neon connection string) it uses Postgres.

## Admin access

- URL: `/admin`
- First-run password: `Afemai2026!`
  (change it immediately in **Settings**, and set `ADMIN_INITIAL_PASSWORD`
  in production before first deploy so it never ships with the default)

## Environment variables

See `.env.example`:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string (production store) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (production image uploads) |
| `SESSION_SECRET` | Signs admin session cookies (long random string) |
| `ADMIN_INITIAL_PASSWORD` | Password hashed at first seed |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap/robots/OG |

## Deploy to Vercel

```bash
npm i -g vercel
vercel          # link the repo
vercel env add DATABASE_URL ...      # Neon
vercel env add BLOB_READ_WRITE_TOKEN # Vercel Blob
vercel env add SESSION_SECRET ...
vercel --prod
```

Create the Neon database (free tier, no card) at neon.tech → new project →
copy the connection string for `DATABASE_URL`. The `site_data` table is
created automatically on first request.

## Content model

Everything is one JSONB document in Postgres (`site_data` table, single row)
mirroring `src/lib/types.ts` and seeded from `src/lib/defaults.ts`. Admin
saves deep-merge with the stored document and revalidate all public pages
(ISR), so edits go live in seconds.

## QA

```bash
# after starting the dev server:
NODE_PATH="C:/Users/LENOVO/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules" node _qa.js
```

Renders all pages at 375 / 768 / 1440 px, checks horizontal overflow, console
errors, image loading, admin login, contact-form → inbox flow. Screenshots
land in `_qa/`.

## Folder guide

```
src/
  app/(site)/      public pages + public chrome (nav, footer, maintenance)
  app/admin/       login page
  app/admin/(panel)/  dashboard + all editors (auth-gated)
  app/api/         content, contact, upload, admin session/auth
  components/      layout, sections, ui, admin editors, three scene, motion
  lib/             types, defaults (seed), store (Neon/file), dataStore, auth
_qa/               QA screenshots + results
data/              local JSON store (dev only, git-ignored)
public/            logo, photos, factory video, uploads (dev)
```