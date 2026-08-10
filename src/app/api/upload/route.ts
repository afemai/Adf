import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-session";

export const runtime = "nodejs";

// Admin media upload. Production (BLOB_READ_WRITE_TOKEN set) → Vercel Blob;
// local dev → public/uploads/ (gitignored).
export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > 15 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 15MB)" }, { status: 400 });
  }

  // Vercel Blob path (production)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const ext = path.extname(file.name) || ".bin";
      const blob = await put(`adf/${Date.now()}${ext}`, file, { access: "public" });
      return NextResponse.json({ ok: true, url: blob.url });
    } catch (err) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  }

  // Local dev path
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, safeName), bytes);
  return NextResponse.json({ ok: true, url: `/uploads/${safeName}` });
}