import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, sessionCookie } from "@/lib/admin-session";
import { verifyAdminPassword } from "@/lib/dataStore";
import { rateLimit } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`login:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!password || !(await verifyAdminPassword(password))) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  const token = await createSessionToken();
  return NextResponse.json({ ok: true }, { headers: { "Set-Cookie": sessionCookie(token) } });
}