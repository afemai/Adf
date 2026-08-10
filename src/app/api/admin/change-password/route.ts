import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-session";
import { changeAdminPassword } from "@/lib/dataStore";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { currentPassword, newPassword } = (await req.json().catch(() => ({}))) as {
    currentPassword?: string;
    newPassword?: string;
  };
  const result = await changeAdminPassword(currentPassword || "", newPassword || "");
  if (result === "bad-current") return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
  if (result === "weak") return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  return NextResponse.json({ ok: true });
}