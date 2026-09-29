import crypto from 'crypto';

// Stateless signed admin sessions: the cookie value is `<expiresAt>.<hmac>`.
// Only the server can mint a valid value, and it expires on its own.

export const SESSION_COOKIE = 'admin_session';
export const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecret(): string | null {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  // Fall back to a key derived from the admin password, so changing the
  // password also invalidates every existing session.
  if (process.env.ADMIN_PASSWORD) {
    return crypto
      .createHash('sha256')
      .update(`yeetaba-admin-session:${process.env.ADMIN_PASSWORD}`)
      .digest('hex');
  }
  return null;
}

function sign(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  // Hash first so both buffers have equal length for timingSafeEqual.
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const expiresAt = String(Date.now() + SESSION_DURATION * 1000);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;

  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature || !/^\d+$/.test(expiresAt)) return false;
  if (!safeEqual(signature, sign(expiresAt, secret))) return false;

  return Number(expiresAt) > Date.now();
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || typeof password !== 'string') return false;
  return safeEqual(password, adminPassword);
}
