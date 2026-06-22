/**
 * Shared types for the transferencias email inbound pipeline.
 */

export interface Email {
  messageId: string;        // Gmail message id (idempotency key)
  from: string;              // "Alertas Banco BICE <alertas@bice.cl>"
  subject: string;
  bodyPlain: string;
  bodyHtml?: string;
  internalDate: string;      // RFC 2822 date string
}

export interface ParseResult {
  monto: number;              // CLP, integer, > 0
  rut: string | null;         // "12.345.678-9" or null
  fecha: string | null;       // ISO date "2026-06-20" or null
  comentario: string | null;  // "Transferencia de Juan Pérez, junio" or null
  nombre: string | null;      // "Juan Pérez" or null
  source: 'bice_regex' | 'llm';
  rawExcerpt: string;         // first 500 chars of body, for debug
}

export const WHITELIST_BANCO_KEY = 'TRANSFERENCIAS_BANCO_WHITELIST';

/** Returns true if the email is from a whitelisted bank. */
export function isFromWhitelistedBank(email: Email, whitelist: string[]): boolean {
  const fromLower = email.from.toLowerCase();
  return whitelist.some((domain) => fromLower.includes(domain.toLowerCase()));
}

/** Normalize a CLP string ("$15.000" or "15000" or "15.000") to integer. */
export function normalizeMonto(raw: string): number {
  const cleaned = raw.replace(/[$.\s]/g, '').replace(/,/g, '');
  const n = parseInt(cleaned, 10);
  return isNaN(n) ? 0 : n;
}

/** Normalize a RUT string to canonical "12.345.678-9" form. Returns null if invalid. */
export function normalizeRut(raw: string): string | null {
  const match = raw.match(/(\d{1,2})\.?(\d{3})\.?(\d{3})-?([\dkK])/);
  if (!match) return null;
  const [, a, b, c, dv] = match;
  return `${a}.${b}.${c}-${dv.toUpperCase()}`;
}
