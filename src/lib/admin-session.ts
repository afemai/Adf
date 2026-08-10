import { SignJWT, jwtVerify } from "jose";

// Admin session: signed httpOnly cookie token (HS256, 7-day expiry).
// SESSION_SECRET should be set in production; a dev fallback keeps local
// development friction-free.

const SECRET =
  process.env.SESSION_SECRET || "adf-local-dev-secret-please-set-in-prod";

const encoder = new TextEncoder();
const key = encoder.encode(SECRET);

const COOKIE_NAME = "adf_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function sessionCookie(token: string): string {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;