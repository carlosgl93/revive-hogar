import { Email, ParseResult, isFromWhitelistedBank, normalizeMonto, normalizeRut } from './types';

const SPANISH_MONTHS: Record<string, number> = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
};

/** Default whitelist if env var is unset. */
const DEFAULT_WHITELIST = ['bice.cl'];

function getWhitelist(): string[] {
  const env = process.env.TRANSFERENCIAS_BANCO_WHITELIST;
  if (!env) return DEFAULT_WHITELIST;
  return env.split(',').map((s) => s.trim()).filter(Boolean);
}

function parseFecha(fechaStr: string | null): string | null {
  if (!fechaStr) return null;
  // Try DD/MM/YYYY or DD-MM-YYYY
  const slashMatch = fechaStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (slashMatch) {
    const [, dd, mm, yyyy] = slashMatch;
    const year = yyyy.length === 2 ? `20${yyyy}` : yyyy;
    return `${year}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }
  // Try "20 de junio de 2026"
  const longMatch = fechaStr.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
  if (longMatch) {
    const [, dd, monthName, yyyy] = longMatch;
    const monthNum = SPANISH_MONTHS[monthName.toLowerCase()];
    if (monthNum) {
      return `${yyyy}-${String(monthNum).padStart(2, '0')}-${dd.padStart(2, '0')}`;
    }
  }
  return null;
}

function extractNombre(comentario: string | null, subject: string, body: string): string | null {
  // Try "de <Name> <Lastname>" in comentario
  if (comentario) {
    const m = comentario.match(/de\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+)/);
    if (m) return m[1];
    // Single name fallback: "de <Name>." at end
    const m1 = comentario.match(/de\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)\b/);
    if (m1) return m1[1];
  }
  // Try "Nombre: <Name>" in body
  const m2 = body.match(/Nombre:\s*([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)/);
  if (m2) return m2[1];
  // Try subject
  const m3 = subject.match(/([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)/);
  if (m3) return m3[1];
  return null;
}

export function parseBice(email: Email): ParseResult | null {
  const whitelist = getWhitelist();
  if (!isFromWhitelistedBank(email, whitelist)) return null;

  // Extract monto: first $XX.XXX or $XX.XXX.XXX or XX.XXX
  const montoMatch = email.bodyPlain.match(/\$\s*([\d]{1,3}(?:\.\d{3})*|\d+)/);
  if (!montoMatch) return null;
  const monto = normalizeMonto(montoMatch[1]);
  if (monto <= 0) return null;

  // Extract RUT
  const rutMatch = email.bodyPlain.match(/\b(\d{1,2}\.?\d{3}\.?\d{3})-?([\dkK])\b/);
  const rut = rutMatch ? normalizeRut(rutMatch[0]) : null;

  // Extract fecha
  const fechaStrMatch = email.bodyPlain.match(/Fecha:\s*([^\n]+)/i) || email.bodyPlain.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/);
  const fecha = parseFecha(fechaStrMatch ? fechaStrMatch[1] : null);

  // Extract comentario
  const comentarioMatch = email.bodyPlain.match(/(?:Transferencia|Abono|Comentario)[^\n]*/i);
  const comentario = comentarioMatch ? comentarioMatch[0].trim() : null;

  // Extract nombre
  const nombre = extractNombre(comentario, email.subject, email.bodyPlain);

  // rawExcerpt
  const rawExcerpt = email.bodyPlain.slice(0, 500);

  return {
    monto,
    rut,
    fecha,
    comentario,
    nombre,
    source: 'bice_regex',
    rawExcerpt,
  };
}
