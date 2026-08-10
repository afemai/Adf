import { NextRequest, NextResponse } from "next/server";
import { loadPublicData, saveData } from "@/lib/dataStore";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-session";

export const runtime = "nodejs";

// ---- GET /api/content - public sanitized JSON ----
export async function GET() {
  const data = await loadPublicData();
  return NextResponse.json(data);
}

// ---- POST /api/content - admin save (auth required) ----
export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Parameters<typeof saveData>[0];
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  await saveData(body);
  return NextResponse.json({ ok: true });
}