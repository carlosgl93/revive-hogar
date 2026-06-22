import { Cliente } from '../types';
import { ParseResult } from './parser/types';

export interface MatchCandidate {
  clienteId: string;
  cliente: Cliente;
  score: number;
  reason: string;
}

export interface MatchResult {
  score: number;
  candidates: MatchCandidate[];
  decision: 'auto' | 'inbox';
  reason: string;
}

const AUTO_SCORE_THRESHOLD = 95;
const MIN_SCORE_MARGIN = 20;
const FUZZY_MIN_NAME_LENGTH = 5;

/** Levenshtein distance, returns edit distance. */
function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function scoreCandidate(cliente: Cliente, parse: ParseResult, totalActive: number, signalCounts: { rut: number; monto: number }): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (parse.rut && cliente.rut && cliente.rut === parse.rut) {
    score += 50;
    reasons.push('rut_match');
  }

  if (cliente.montoPendiente !== undefined && cliente.montoPendiente === parse.monto) {
    score += 30;
    reasons.push('monto_match');
  }

  // Uniqueness: either only candidate exists, or this is the sole candidate matching a key signal
  const isOnlyRutMatch = signalCounts.rut > 0 && signalCounts.rut === 1 && reasons.includes('rut_match');
  const isOnlyMontoMatch = signalCounts.monto > 0 && signalCounts.monto === 1 && reasons.includes('monto_match');
  if (totalActive === 1 || isOnlyRutMatch || isOnlyMontoMatch) {
    score += 20;
    reasons.push('unique_signal');
  }

  if (
    cliente.nombre &&
    cliente.nombre.length >= FUZZY_MIN_NAME_LENGTH &&
    parse.comentario
  ) {
    const comentarioLower = parse.comentario.toLowerCase();
    const nombreLower = cliente.nombre.toLowerCase();
    if (comentarioLower.includes(nombreLower)) {
      score += 10;
      reasons.push('nombre_match');
    } else {
      // Try fuzzy: each part of the nombre
      const parts = nombreLower.split(/\s+/);
      for (const part of parts) {
        if (part.length >= FUZZY_MIN_NAME_LENGTH && comentarioLower.includes(part)) {
          score += 10;
          reasons.push('nombre_partial_match');
          break;
        }
      }
    }
  }

  return { score, reasons };
}

export async function matchCliente(
  parse: ParseResult,
  db: FirebaseFirestore.Firestore,
): Promise<MatchResult> {
  // Query active clients with pendiente
  const snap = await db
    .collection('clientes')
    .where('activo', '==', true)
    .where('montoPendiente', '>', 0)
    .get();

  if (snap.empty) {
    return {
      score: 0,
      candidates: [],
      decision: 'inbox',
      reason: 'no_active_match',
    };
  }

  const totalActive = snap.docs.length;

  // First pass: count how many candidates match each signal
  let rutMatchCount = 0;
  let montoMatchCount = 0;
  const docClientes = snap.docs.map((doc) => {
    const cliente = { id: doc.id, ...doc.data() } as Cliente;
    if (parse.rut && cliente.rut && cliente.rut === parse.rut) rutMatchCount++;
    if (cliente.montoPendiente !== undefined && cliente.montoPendiente === parse.monto) montoMatchCount++;
    return { doc, cliente };
  });
  const signalCounts = { rut: rutMatchCount, monto: montoMatchCount };

  // Score each candidate
  const candidates: MatchCandidate[] = docClientes.map(({ doc, cliente }) => {
    const { score, reasons } = scoreCandidate(cliente, parse, totalActive, signalCounts);
    return {
      clienteId: doc.id,
      cliente,
      score,
      reason: reasons.join('+') || 'no_signals',
    };
  });

  // Sort by score desc
  candidates.sort((a, b) => b.score - a.score);

  // Detect ambiguity: multiple candidates with strong signals OR multiple candidates sharing the same key signal
  const strongCount = candidates.filter((c) => c.score > 60).length;
  const sharedSignal = (parse.rut && rutMatchCount > 1) || (parse.monto != null && montoMatchCount > 1);
  let ambiguityApplied = false;
  if (strongCount > 1) {
    ambiguityApplied = true;
    candidates.forEach((c) => {
      if (c.score > 60) c.score -= 30;
    });
    candidates.sort((a, b) => b.score - a.score);
  } else if (sharedSignal) {
    ambiguityApplied = true;
  }

  const top = candidates[0];
  const second = candidates[1];

  if (!top) {
    return {
      score: 0,
      candidates: [],
      decision: 'inbox',
      reason: 'no_active_match',
    };
  }

  const margin = top.score - (second?.score ?? 0);
  // Uniqueness is decisive when exactly one candidate exists in the result set
  const isUniqueCandidate = totalActive === 1;
  const isAuto = (top.score >= AUTO_SCORE_THRESHOLD && margin >= MIN_SCORE_MARGIN)
    || (isUniqueCandidate && top.score > 0);

  let reason: string;
  if (isAuto) {
    reason = 'auto_match';
  } else if (ambiguityApplied && !isUniqueCandidate) {
    reason = 'multiple_candidates';
  } else if (top.score < AUTO_SCORE_THRESHOLD) {
    reason = 'low_score';
  } else {
    reason = 'multiple_candidates';
  }

  return {
    score: top.score,
    candidates,
    decision: isAuto ? 'auto' : 'inbox',
    reason,
  };
}

// Re-export for completeness
export { levenshtein };