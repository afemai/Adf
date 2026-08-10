import { NextRequest, NextResponse } from "next/server";
import { loadData, saveData } from "@/lib/dataStore";
import { rateLimit } from "@/lib/utils";

export const runtime = "nodejs";

// Contact form: honeypot ("company" field must stay empty) + rate limit +
// append to contact.messages (capped) + persist. No external email service
// required — messages are visible in the admin dashboard.
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`contact:${ip}`, 3, 60_000)) {
    return NextResponse.json({ error: "Too many messages. Please try again shortly." }, { status: 429 });
  }

  const form = await req.formData().catch(() => null);
  const json = form
    ? null
    : await req.json().catch(() => null);

  const get = (key: string): string =>
    String(form?.get(key) ?? json?.[key] ?? "").trim();

  const honeypot = get("company");
  if (honeypot) {
    return NextResponse.json({ ok: true }); // silently drop bots
  }

  const name = get("name");
  const message = get("message");
  if (!name || !message || message.length < 5 || name.length > 120 || message.length > 4000) {
    return NextResponse.json({ error: "Please provide your name and a message." }, { status: 400 });
  }

  const data = await loadData();
  const messages = data.contact.messages ?? [];
  messages.unshift({
    id: `m${Date.now()}`,
    name,
    email: get("email"),
    phone: get("phone"),
    subject: get("subject"),
    message,
    submittedAt: new Date().toISOString(),
    isRead: false,
  });
  // Keep the array bounded.
  data.contact.messages = messages.slice(0, 500);
  await saveData(data);

  return NextResponse.json({ ok: true });
}