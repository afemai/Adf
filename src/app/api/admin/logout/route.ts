import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie() } });
}