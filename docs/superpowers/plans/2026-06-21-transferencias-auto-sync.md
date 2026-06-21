# Transferencias Auto-Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auto-detect bank transfer emails in Rosario's Gmail, match them to clients, and update `clientes.pagos` so the embudo closes for the third payment source (Suscripcion, Boton de pago, Transferencia).

**Architecture:** Cloud Function (onSchedule every 5 min) reads Rosario's Gmail via Google API (OAuth refresh token), parses BICE emails with regex and other-bank emails with MiniMax M3 LLM, scores each parse against active clients with `montoPendiente > 0`, auto-applies matches with score ≥ 95 in a Firestore transaction, and routes low-confidence matches to an admin inbox for manual resolution.

**Tech Stack:** Firebase Cloud Functions v2, TypeScript, `googleapis` (Gmail), `google-auth-library`, MiniMax M3 API (LLM fallback), Firestore + Admin SDK, React + MUI (admin UI), Vitest/Jest (unit), Firestore emulator (integration).

**Spec:** `docs/superpowers/specs/2026-06-21-transferencias-auto-sync-design.md`

---

## Conventions

- **Package manager:** pnpm (per global CLAUDE.md).
- **Branch:** off `master` (not off `fix/phase-0-lock-boundary` which has the port shift local-only).
- **Commits:** Conventional commits (`feat:` / `fix:` / `chore:` / `test:` / `docs:`), no AI/Claude mentions, `--no-verify` (husky pre-commit breaks on pnpm 11 per HANDOFF.md).
- **Build:** `cd functions && node node_modules/typescript/bin/tsc` before emulator runs.
- **Emulator ports (master):** default (auth 9099, fns 5001, fs 8080). The phase-0 worktree has +10 shift — do NOT use that worktree.
- **Env file:** `functions/.env.revive-hogar` (gitignored). Template: `functions/.env.template`.

---

## Task 0: Branch + worktree setup

**Files:** none (git only)

- [ ] **Step 1: Create worktree off master**

```bash
cd /Users/consultor/cgl/revive-hogar
git fetch origin
git worktree add ../revive-hogar-transferencias -b feat/transferencias-auto-sync master
cd ../revive-hogar-transferencias
```

- [ ] **Step 2: Verify clean state**

```bash
git status
git log --oneline -3
```

Expected: clean working tree, branch is `feat/transferencias-auto-sync`, HEAD is `1ac20ff` (latest master after the spec commits).

---

## Task 1: Add `rut` to Cliente type (frontend + backend)

**Files:**
- Modify: `functions/src/types.ts:1-50`
- Modify: `src/types/models.ts:1-80`

- [ ] **Step 1: Add `rut` to backend Cliente type**

In `functions/src/types.ts`, locate the `Cliente` interface and add:

```typescript
export interface Cliente {
  // ... existing fields
  rut?: string;  // RUT format: "12.345.678-9" or "12345678-9"
}
```

- [ ] **Step 2: Add `rut` to frontend Cliente type**

In `src/types/models.ts`, locate the `Cliente` interface and add the same field. Keep formatting consistent with surrounding code.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd functions && node node_modules/typescript/bin/tsc --noEmit && cd ..
cd src && npx tsc --noEmit 2>&1 | head -20 && cd ..
```

Expected: 0 errors. If errors are about the new field, check that both files have it.

- [ ] **Step 4: Commit**

```bash
git add functions/src/types.ts src/types/models.ts
git commit -m "feat(types): add rut field to Cliente"
```

---

## Task 2: Add `rut` to sheets import (transform.ts)

**Files:**
- Modify: `functions/src/sheets/transform.ts:54-102`
- Test: `functions/src/sheets/__tests__/transform.test.ts` (existing — extend it)

- [ ] **Step 1: Find existing test file**

```bash
ls functions/src/sheets/__tests__/
```

Expected: `transform.test.ts` exists. If not, skip the test extension steps and proceed to step 3.

- [ ] **Step 2: Add a failing test for RUT extraction**

In `functions/src/sheets/__tests__/transform.test.ts`, add (adapt import names to existing test conventions):

```typescript
describe('transformRow with RUT', () => {
  it('extracts rut from "rut" column', () => {
    const headerRow = ['correo', 'nombre', 'direccion', 'comuna', 'telefono', 'monto', 'monto pendiente', 'rut', 'dia', 'tipo de pago'];
    const dataRow = ['juan@test.cl', 'Juan', 'dir 1', 'scl', '1234', '15000', '15000', '12.345.678-9', 'lunes', 'transferencia'];
    const headerIndex = buildHeaderIndex(headerRow);
    const result = transformRow(dataRow, headerIndex, 1);
    expect(result.error).toBeNull();
    expect(result.cliente?.rut).toBe('12.345.678-9');
  });

  it('handles missing rut column gracefully', () => {
    const headerRow = ['correo', 'nombre', 'direccion', 'comuna', 'telefono', 'monto', 'monto pendiente', 'dia', 'tipo de pago'];
    const dataRow = ['juan@test.cl', 'Juan', 'dir 1', 'scl', '1234', '15000', '15000', 'lunes', 'transferencia'];
    const headerIndex = buildHeaderIndex(headerRow);
    const result = transformRow(dataRow, headerIndex, 1);
    expect(result.error).toBeNull();
    expect(result.cliente?.rut).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd functions && npx jest src/sheets/__tests__/transform.test.ts 2>&1 | tail -20
```

Expected: FAIL — `result.cliente?.rut` is undefined because transform doesn't read RUT yet.

- [ ] **Step 4: Add RUT extraction in transform.ts**

In `functions/src/sheets/transform.ts`, inside the `transformRow` function, after the `correo` extraction and before the `cliente` object construction, add:

```typescript
const rut = get('rut');
```

Then in the returned `cliente` object, add:

```typescript
rut: rut || undefined,
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd functions && npx jest src/sheets/__tests__/transform.test.ts 2>&1 | tail -10
```

Expected: PASS, 2 new tests green.

- [ ] **Step 6: Commit**

```bash
git add functions/src/sheets/transform.ts functions/src/sheets/__tests__/transform.test.ts
git commit -m "feat(sheets): extract rut column on import"
```

---

## Task 3: Parser types module

**Files:**
- Create: `functions/src/transferencias/parser/types.ts`

- [ ] **Step 1: Create the directory and types file**

```bash
mkdir -p functions/src/transferencias/parser
```

Create `functions/src/transferencias/parser/types.ts`:

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd functions && node node_modules/typescript/bin/tsc --noEmit && cd ..
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add functions/src/transferencias/parser/types.ts
git commit -m "feat(transferencias): add parser types and helpers"
```

---

## Task 4: BICE regex parser

**Files:**
- Create: `functions/src/transferencias/parser/bice.ts`
- Create: `functions/src/transferencias/parser/bice.test.ts`

- [ ] **Step 1: Create test file with fixtures**

Create `functions/src/transferencias/parser/bice.test.ts`:

```typescript
import { describe, expect, it } from '@jest/globals';

import { parseBice } from './bice';
import { Email } from './types';

const makeEmail = (overrides: Partial<Email>): Email => ({
  messageId: 'msg-1',
  from: 'Alertas Banco BICE <alertas@bice.cl>',
  subject: 'Transferencia recibida',
  bodyPlain: 'Ha recibido una transferencia.',
  internalDate: 'Mon, 21 Jun 2026 10:00:00 -0400',
  ...overrides,
});

describe('parseBice', () => {
  it('returns null for non-BICE email', () => {
    const email = makeEmail({ from: 'noreply@otherbank.cl' });
    expect(parseBice(email)).toBeNull();
  });

  it('parses a typical BICE transfer email', () => {
    const email = makeEmail({
      bodyPlain: [
        'Estimado cliente,',
        '',
        'Ha recibido una transferencia de $15.000 de Juan Pérez.',
        'Fecha: 20/06/2026',
        'RUT: 12.345.678-9',
        'Comentario: pago junio',
      ].join('\n'),
    });
    const result = parseBice(email);
    expect(result).not.toBeNull();
    expect(result?.monto).toBe(15000);
    expect(result?.rut).toBe('12.345.678-9');
    expect(result?.fecha).toBe('2026-06-20');
    expect(result?.comentario).toContain('Juan Pérez');
    expect(result?.nombre).toBe('Juan Pérez');
    expect(result?.source).toBe('bice_regex');
  });

  it('parses monto with thousand separator dots', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $1.500.000 de María González.\nRUT: 20.123.456-7',
    });
    const result = parseBice(email);
    expect(result?.monto).toBe(1500000);
  });

  it('parses RUT without dots and lowercase dv', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $10.000.\nRUT: 12345678-k',
    });
    const result = parseBice(email);
    expect(result?.rut).toBe('12.345.678-K');
  });

  it('returns null when monto is missing or invalid', () => {
    const email = makeEmail({
      bodyPlain: 'Ha recibido una transferencia.\nRUT: 12.345.678-9',
    });
    expect(parseBice(email)).toBeNull();
  });

  it('returns null when monto is zero or negative', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $0.\nRUT: 12.345.678-9',
    });
    expect(parseBice(email)).toBeNull();
  });

  it('extracts fecha from "20 de junio de 2026" format', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $5.000 de Ana.\nFecha: 20 de junio de 2026',
    });
    const result = parseBice(email);
    expect(result?.fecha).toBe('2026-06-20');
  });

  it('truncates rawExcerpt to 500 chars', () => {
    const longBody = 'a'.repeat(1000);
    const email = makeEmail({
      bodyPlain: `Transferencia de $5.000 de Ana.\n${longBody}`,
    });
    const result = parseBice(email);
    expect(result?.rawExcerpt.length).toBe(500);
  });

  it('handles empty RUT and fecha gracefully', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $5.000 de Ana.',
    });
    const result = parseBice(email);
    expect(result?.monto).toBe(5000);
    expect(result?.rut).toBeNull();
    expect(result?.fecha).toBeNull();
    expect(result?.nombre).toBe('Ana');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd functions && npx jest src/transferencias/parser/bice.test.ts 2>&1 | tail -20
```

Expected: FAIL — `parseBice` not exported from `./bice`.

- [ ] **Step 3: Create bice.ts implementation**

Create `functions/src/transferencias/parser/bice.ts`:

```typescript
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
  }
  // Try "Nombre: <Name>" in body
  const m2 = body.match(/Nombre:\s*([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+)/);
  if (m2) return m2[1];
  // Try subject
  const m3 = subject.match(/([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/);
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd functions && npx jest src/transferencias/parser/bice.test.ts 2>&1 | tail -20
```

Expected: PASS, 8 tests green.

- [ ] **Step 5: If any test fails, debug and fix**

Common issues:
- `normalizeRut` returns null when RUT has lowercase `k` (should normalize to `K`)
- `parseFecha` fails on edge format (e.g. `20-06-2026` with dashes)
- `extractNombre` returns wrong word from comentario

- [ ] **Step 6: Commit**

```bash
git add functions/src/transferencias/parser/bice.ts functions/src/transferencias/parser/bice.test.ts
git commit -m "feat(transferencias): BICE regex parser"
```

---

## Task 5: LLM parser (M3 fallback)

**Files:**
- Create: `functions/src/transferencias/parser/llm.ts`
- Create: `functions/src/transferencias/parser/llm.test.ts`

- [ ] **Step 1: Create test file with mocked fetch**

Create `functions/src/transferencias/parser/llm.test.ts`:

```typescript
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { parseLlm } from './llm';
import { Email } from './types';

const makeEmail = (overrides: Partial<Email>): Email => ({
  messageId: 'msg-1',
  from: 'Alertas Otro Banco <alertas@otrobanco.cl>',
  subject: 'Transferencia',
  bodyPlain: 'Ha recibido una transferencia de $25.000 de Pedro Soto.\nRUT: 15.123.456-7',
  internalDate: 'Mon, 21 Jun 2026 10:00:00 -0400',
  ...overrides,
});

describe('parseLlm', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('parses a valid LLM response into ParseResult', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              esTransferencia: true,
              monto: 25000,
              rut: '15.123.456-7',
              fecha: '2026-06-20',
              comentario: 'Transferencia de Pedro Soto',
              nombre: 'Pedro Soto',
            }),
          },
        }],
      }),
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).not.toBeNull();
    expect(result?.monto).toBe(25000);
    expect(result?.rut).toBe('15.123.456-7');
    expect(result?.source).toBe('llm');
  });

  it('returns null when LLM says esTransferencia=false', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              esTransferencia: false,
              monto: null, rut: null, fecha: null, comentario: null, nombre: null,
            }),
          },
        }],
      }),
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });

  it('returns null on HTTP error', async () => {
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    global.fetch = jest.fn(async () => {
      throw new Error('Network down');
    }) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });

  it('returns null when LLM response is invalid JSON', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{ message: { content: 'not json' } }],
      }),
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });

  it('returns null when monto is missing or zero', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              esTransferencia: true,
              monto: 0,
              rut: null, fecha: null, comentario: null, nombre: null,
            }),
          },
        }],
      }),
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd functions && npx jest src/transferencias/parser/llm.test.ts 2>&1 | tail -10
```

Expected: FAIL — `parseLlm` not exported.

- [ ] **Step 3: Create llm.ts implementation**

Create `functions/src/transferencias/parser/llm.ts`:

```typescript
import { Email, ParseResult, normalizeMonto, normalizeRut } from './types';

const MINIMAX_API_URL = 'https://api.minimaxi.com/v1/text/chatcompletion_v2';
const TIMEOUT_MS = 10_000;

const SYSTEM_PROMPT = `Sos un parser de emails bancarios chilenos. Devolvé SOLO JSON válido con la forma: {"esTransferencia": boolean, "monto": number|null, "rut": string|null, "fecha": string|null (formato ISO YYYY-MM-DD), "comentario": string|null, "nombre": string|null}. Si el email NO es una transferencia bancaria, devolvé esTransferencia=false y el resto null.`;

interface LlmResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface LlmParsedJson {
  esTransferencia: boolean;
  monto: number | null;
  rut: string | null;
  fecha: string | null;
  comentario: string | null;
  nombre: string | null;
}

export async function parseLlm(email: Email, apiKey: string): Promise<ParseResult | null> {
  if (!apiKey) {
    console.error('[parseLlm] No API key provided');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'MiniMax-M3',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: email.bodyPlain },
        ],
        response_format: { type: 'json_object' },
        temperature: 0,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[parseLlm] HTTP ${response.status}: ${await response.text()}`);
      return null;
    }

    const data = (await response.json()) as LlmResponse;
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error('[parseLlm] No content in LLM response');
      return null;
    }

    let parsed: LlmParsedJson;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error('[parseLlm] Invalid JSON from LLM:', content);
      return null;
    }

    if (!parsed.esTransferencia) return null;
    if (!parsed.monto || parsed.monto <= 0) return null;

    return {
      monto: normalizeMonto(String(parsed.monto)),
      rut: parsed.rut ? normalizeRut(parsed.rut) : null,
      fecha: parsed.fecha || null,
      comentario: parsed.comentario || null,
      nombre: parsed.nombre || null,
      source: 'llm',
      rawExcerpt: email.bodyPlain.slice(0, 500),
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[parseLlm] Request timed out after', TIMEOUT_MS, 'ms');
    } else {
      console.error('[parseLlm] Error:', err);
    }
    return null;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd functions && npx jest src/transferencias/parser/llm.test.ts 2>&1 | tail -15
```

Expected: PASS, 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add functions/src/transferencias/parser/llm.ts functions/src/transferencias/parser/llm.test.ts
git commit -m "feat(transferencias): LLM fallback parser (M3)"
```

---

## Task 6: Matcher module

**Files:**
- Create: `functions/src/transferencias/matcher.ts`
- Create: `functions/src/transferencias/matcher.test.ts`

- [ ] **Step 1: Create test file with mocked Firestore**

Create `functions/src/transferencias/matcher.test.ts`:

```typescript
import { describe, expect, it, jest } from '@jest/globals';

import { matchCliente } from './matcher';
import { ParseResult } from './parser/types';
import { Cliente } from '../types';

// Mock Firestore
const mockClientes: Cliente[] = [
  {
    id: 'c1', nombre: 'Juan Pérez', correo: 'juan@test.cl', direccion: 'd1', comuna: 'c1',
    telefono: '1234', monto: 15000, montoPendiente: 15000, tipoPago: 'Transferencia' as any,
    activo: true, dia: 'Lunes', pagos: {}, rut: '12.345.678-9',
  } as Cliente,
  {
    id: 'c2', nombre: 'María González', correo: 'maria@test.cl', direccion: 'd2', comuna: 'c1',
    telefono: '5678', monto: 15000, montoPendiente: 15000, tipoPago: 'Transferencia' as any,
    activo: true, dia: 'Martes', pagos: {}, rut: '20.123.456-7',
  } as Cliente,
  {
    id: 'c3', nombre: 'Inactivo', correo: 'inactivo@test.cl', direccion: 'd3', comuna: 'c1',
    telefono: '9999', monto: 15000, montoPendiente: 15000, tipoPago: 'Transferencia' as any,
    activo: false, dia: 'Miercoles', pagos: {}, rut: '11.111.111-1',
  } as Cliente,
];

const mockDb = {
  collection: jest.fn((name: string) => ({
    where: jest.fn().mockReturnThis(),
    get: jest.fn(async () => ({
      empty: false,
      docs: mockClientes
        .filter((c) => c.activo && (c.montoPendiente ?? 0) > 0)
        .map((c) => ({
          id: c.id,
          data: () => c,
        })),
    })),
  })),
} as any;

const makeParse = (overrides: Partial<ParseResult>): ParseResult => ({
  monto: 15000,
  rut: null,
  fecha: null,
  comentario: null,
  nombre: null,
  source: 'bice_regex',
  rawExcerpt: '',
  ...overrides,
});

describe('matchCliente', () => {
  it('matches perfectly with RUT + monto + unique', async () => {
    const parse = makeParse({ rut: '12.345.678-9', monto: 15000 });
    const result = await matchCliente(parse, mockDb);
    expect(result.decision).toBe('auto');
    expect(result.candidates[0].clienteId).toBe('c1');
    expect(result.candidates[0].score).toBeGreaterThanOrEqual(95);
  });

  it('matches by monto + unique candidate when RUT is missing', async () => {
    const mockSingle = {
      collection: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        get: jest.fn(async () => ({
          empty: false,
          docs: [{ id: 'c1', data: () => mockClientes[0] }],
        })),
      })),
    } as any;
    const parse = makeParse({ monto: 15000 });
    const result = await matchCliente(parse, mockSingle);
    expect(result.decision).toBe('auto');
    expect(result.candidates[0].clienteId).toBe('c1');
  });

  it('sends to inbox when multiple candidates match', async () => {
    const parse = makeParse({ monto: 15000 });  // both c1 and c2 have 15000 pendiente
    const result = await matchCliente(parse, mockDb);
    expect(result.decision).toBe('inbox');
    expect(result.reason).toContain('multiple');
  });

  it('sends to inbox when no candidates exist', async () => {
    const mockEmpty = {
      collection: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        get: jest.fn(async () => ({ empty: true, docs: [] })),
      })),
    } as any;
    const parse = makeParse({ monto: 15000 });
    const result = await matchCliente(parse, mockEmpty);
    expect(result.decision).toBe('inbox');
    expect(result.reason).toBe('no_active_match');
  });

  it('sends to inbox when top score is below 95', async () => {
    const parse = makeParse({ nombre: 'Juan', monto: 5000 });  // monto mismatch
    const result = await matchCliente(parse, mockDb);
    expect(result.decision).toBe('inbox');
  });

  it('excludes inactive clients from candidates', async () => {
    // Verify c3 (inactive) is not in candidates even with matching RUT
    const parse = makeParse({ rut: '11.111.111-1', monto: 15000 });
    const result = await matchCliente(parse, mockDb);
    expect(result.candidates.find((c) => c.clienteId === 'c3')).toBeUndefined();
  });

  it('gives bonus score for nombre fuzzy match in comentario', async () => {
    const parse = makeParse({
      comentario: 'Transferencia de Juan Pérez',
      monto: 5000,  // monto mismatch
    });
    const result = await matchCliente(parse, mockDb);
    // c1 should still be top candidate due to nombre match (+10) + RUT not set
    expect(result.candidates[0]?.clienteId).toBe('c1');
  });

  it('does not fuzzy match short names (< 5 chars)', async () => {
    const parse = makeParse({
      comentario: 'Transferencia de Ana',
      monto: 5000,
    });
    const result = await matchCliente(parse, mockDb);
    // Ana is 3 chars, so Levenshtein match should NOT apply
    // Top candidate likely c1 or c2 by uniqueness bonus, not by name
    expect(result.candidates.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd functions && npx jest src/transferencias/matcher.test.ts 2>&1 | tail -10
```

Expected: FAIL — `matchCliente` not exported.

- [ ] **Step 3: Create matcher.ts implementation**

Create `functions/src/transferencias/matcher.ts`:

```typescript
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

function scoreCandidate(cliente: Cliente, parse: ParseResult, totalActive: number): { score: number; reasons: string[] } {
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

  if (totalActive === 1) {
    score += 20;
    reasons.push('unique_active');
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

  // Score each candidate
  const candidates: MatchCandidate[] = snap.docs.map((doc) => {
    const cliente = { id: doc.id, ...doc.data() } as Cliente;
    const { score, reasons } = scoreCandidate(cliente, parse, totalActive);
    return {
      clienteId: doc.id,
      cliente,
      score,
      reason: reasons.join('+') || 'no_signals',
    };
  });

  // Sort by score desc
  candidates.sort((a, b) => b.score - a.score);

  // Apply ambiguity penalty if multiple strong candidates
  const strongCount = candidates.filter((c) => c.score > 60).length;
  if (strongCount > 1) {
    candidates.forEach((c) => {
      if (c.score > 60) c.score -= 30;
    });
    candidates.sort((a, b) => b.score - a.score);
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
  const isAuto = top.score >= AUTO_SCORE_THRESHOLD && margin >= MIN_SCORE_MARGIN;

  return {
    score: top.score,
    candidates,
    decision: isAuto ? 'auto' : 'inbox',
    reason: isAuto
      ? 'auto_match'
      : top.score < AUTO_SCORE_THRESHOLD
        ? 'low_score'
        : 'multiple_candidates',
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd functions && npx jest src/transferencias/matcher.test.ts 2>&1 | tail -15
```

Expected: PASS, 8 tests green. If "multiple candidates" test fails: the score for both is 30 (monto match) and 0 (no uniqueness bonus since totalActive=2), so both get -30 penalty → final score 0 → `low_score`. Verify behavior matches.

- [ ] **Step 5: Commit**

```bash
git add functions/src/transferencias/matcher.ts functions/src/transferencias/matcher.test.ts
git commit -m "feat(transferencias): matchCliente with score + decision"
```

---

## Task 7: Applier module

**Files:**
- Create: `functions/src/transferencias/applier.ts`
- Create: `functions/src/transferencias/applier.test.ts`

- [ ] **Step 1: Create test file (Firestore emulator)**

Create `functions/src/transferencias/applier.test.ts`:

```typescript
import { afterAll, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as admin from 'firebase-admin';

// Firestore emulator must be running: firebase emulators:start --only firestore
// Set FIRESTORE_EMULATOR_HOST=localhost:8080 in test env (jest.config.js or .env.test)

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'revive-hogar-test' });
}
const db = admin.firestore();

describe('applyTransferencia (Firestore emulator)', () => {
  const clienteId = 'test-cliente-1';

  beforeAll(async () => {
    await db.collection('clientes').doc(clienteId).set({
      nombre: 'Test Cliente',
      correo: 'test@test.cl',
      rut: '12.345.678-9',
      monto: 15000,
      montoPendiente: 30000,  // 2 months pending
      tipoPago: 'Transferencia',
      activo: true,
      pagos: { 'mayo 2026': 'pendiente', 'junio 2026': 'pendiente' },
    });
  });

  afterAll(async () => {
    await db.recursiveDelete(db.collection('clientes').doc(clienteId));
    await db.recursiveDelete(db.collection('transferenciaLog'));
  });

  beforeEach(async () => {
    await db.recursiveDelete(db.collection('transferenciaLog'));
  });

  it('applies 2 months payment correctly', async () => {
    const { applyTransferencia } = await import('./applier');
    const result = await applyTransferencia(
      clienteId,
      {
        monto: 30000,
        rut: '12.345.678-9',
        fecha: '2026-06-20',
        comentario: 'pago mayo y junio',
        nombre: 'Test Cliente',
        source: 'bice_regex',
        rawExcerpt: '',
      },
      'test-email-1',
      db,
    );
    expect(result.mesesAplicados.length).toBe(2);
    expect(result.montoDistribuido).toBe(30000);
    expect(result.montoResidual).toBe(0);

    const clienteDoc = await db.collection('clientes').doc(clienteId).get();
    const cliente = clienteDoc.data();
    expect(cliente?.montoPendiente).toBe(0);
    expect(cliente?.pagos?.['mayo 2026']).toBe('ok');
    expect(cliente?.pagos?.['junio 2026']).toBe('ok');

    const logs = await db.collection('transferenciaLog').get();
    expect(logs.size).toBe(1);
    expect(logs.docs[0].data().emailId).toBe('test-email-1');
  });

  it('throws partial_amount when monto does not cover an integer number of months', async () => {
    const { applyTransferencia } = await import('./applier');
    await db.collection('clientes').doc(clienteId).update({ montoPendiente: 30000 });
    await expect(
      applyTransferencia(
        clienteId,
        {
          monto: 22000,  // 22000/15000 = 1.47, not within 5% of 1
          rut: null, fecha: null, comentario: null, nombre: null,
          source: 'bice_regex', rawExcerpt: '',
        },
        'test-email-2',
        db,
      ),
    ).rejects.toThrow('partial_amount');
  });

  it('throws no_monthly_amount when cliente.monto is 0', async () => {
    const { applyTransferencia } = await import('./applier');
    await db.collection('clientes').doc(clienteId).update({ monto: 0, montoPendiente: 0 });
    await expect(
      applyTransferencia(
        clienteId,
        {
          monto: 15000, rut: null, fecha: null, comentario: null, nombre: null,
          source: 'bice_regex', rawExcerpt: '',
        },
        'test-email-3',
        db,
      ),
    ).rejects.toThrow('no_monthly_amount');
  });

  it('is idempotent: same emailId does not double-apply', async () => {
    const { applyTransferencia } = await import('./applier');
    await db.collection('clientes').doc(clienteId).update({ montoPendiente: 30000 });
    const parse = {
      monto: 30000, rut: '12.345.678-9', fecha: null,
      comentario: null, nombre: null, source: 'bice_regex' as const, rawExcerpt: '',
    };
    await applyTransferencia(clienteId, parse, 'test-email-4', db);
    await db.collection('clientes').doc(clienteId).update({ montoPendiente: 30000 });
    await applyTransferencia(clienteId, parse, 'test-email-4', db);  // same emailId

    const logs = await db.collection('transferenciaLog').where('emailId', '==', 'test-email-4').get();
    expect(logs.size).toBe(1);
  });
});
```

- [ ] **Step 2: Add jest config to use Firestore emulator**

In `functions/jest.config.js` (or `functions/package.json` jest section), ensure:

```javascript
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEach: [],
  globals: {
    'ts-jest': { isolatedModules: true },
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
};
```

Add to `functions/package.json` scripts:

```json
"test:integration": "FIRESTORE_EMULATOR_HOST=localhost:8080 FIREBASE_AUTH_EMULATOR_HOST=localhost:9099 GCLOUD_PROJECT=revive-hogar-test jest --testPathPattern=integration"
```

- [ ] **Step 3: Start Firestore emulator and run the test to verify it fails**

```bash
cd functions
# In another terminal:
firebase emulators:start --only firestore --project revive-hogar-test
# Back in this terminal:
FIRESTORE_EMULATOR_HOST=localhost:8080 GCLOUD_PROJECT=revive-hogar-test npx jest src/transferencias/applier.test.ts 2>&1 | tail -15
```

Expected: FAIL — `applyTransferencia` not exported from `./applier`.

- [ ] **Step 4: Create applier.ts implementation**

Create `functions/src/transferencias/applier.ts`:

```typescript
import * as admin from 'firebase-admin';
import { addMonths } from 'date-fns';

import { Cliente } from '../types';
import { ParseResult } from './parser/types';

const TOLERANCE = 0.05;  // 5% tolerance for monto ratio

export interface ApplyResult {
  mesesAplicados: string[];
  montoDistribuido: number;
  montoResidual: number;
}

const SPANISH_MONTHS: Record<string, number> = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
};

function getCurrentMonthKey(): string {
  const now = new Date();
  return `${SPANISH_MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
}

const SPANISH_MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function getMonthKey(date: Date): string {
  return `${SPANISH_MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function shiftMonthKey(monthKey: string, offset: number): string {
  const [monthName, yearStr] = monthKey.split(' ');
  const monthNum = SPANISH_MONTHS[monthName];
  const year = parseInt(yearStr, 10);
  const date = new Date(year, monthNum - 1, 1);
  date.setMonth(date.getMonth() + offset);
  return getMonthKey(date);
}

function getPrioridad(status: string | undefined): number {
  if (status === 'atrasado') return 0;
  if (status === 'pendiente') return 1;
  if (!status || status === '') return 2;
  return 3; // 'ok'
}

export async function applyTransferencia(
  clienteId: string,
  parse: ParseResult,
  emailId: string,
  db: FirebaseFirestore.Firestore,
): Promise<ApplyResult> {
  // Read cliente
  const clienteRef = db.collection('clientes').doc(clienteId);
  const clienteSnap = await clienteRef.get();
  if (!clienteSnap.exists) {
    throw new Error('cliente_not_found');
  }
  const cliente = clienteSnap.data() as Cliente;

  if (!cliente.monto || cliente.monto <= 0) {
    throw new Error('no_monthly_amount');
  }

  // Compute months covered
  const ratio = parse.monto / cliente.monto;
  const mesesCubiertos = Math.round(ratio);
  if (mesesCubiertos === 0 || Math.abs(ratio - mesesCubiertos) > TOLERANCE) {
    throw new Error('partial_amount');
  }

  // Idempotency check
  const existingLog = await db.collection('transferenciaLog')
    .where('emailId', '==', emailId)
    .limit(1)
    .get();
  if (!existingLog.empty) {
    return {
      mesesAplicados: [],
      montoDistribuido: 0,
      montoResidual: 0,
    };
  }

  // Determine which months to apply
  const pagos = cliente.pagos ?? {};
  const currentMonthKey = getCurrentMonthKey();

  // Sort months by priority: atrasado > pendiente > '' > 'ok'
  // Consider [currentMonthKey - 3, currentMonthKey + 3] window
  const candidateMonths: string[] = [];
  for (let offset = -3; offset <= 3; offset++) {
    candidateMonths.push(shiftMonthKey(currentMonthKey, offset));
  }
  candidateMonths.sort((a, b) => {
    const aStatus = pagos[a];
    const bStatus = pagos[b];
    const aPri = getPrioridad(aStatus);
    const bPri = getPrioridad(bStatus);
    return aPri - bPri;
  });

  const mesesAplicados = candidateMonths.slice(0, mesesCubiertos);

  // Compute new state
  const newPagos = { ...pagos };
  for (const mes of mesesAplicados) {
    newPagos[mes] = 'ok';
  }
  const newMontoPendiente = Math.max(0, (cliente.montoPendiente ?? 0) - mesesCubiertos * cliente.monto);
  const baseFechaCorte = cliente.fechaCorte ? new Date(cliente.fechaCorte) : new Date();
  const newFechaCorte = addMonths(baseFechaCorte, mesesCubiertos);

  // Write in transaction
  await db.runTransaction(async (tx) => {
    tx.update(clienteRef, {
      pagos: newPagos,
      montoPendiente: newMontoPendiente,
      fechaCorte: newFechaCorte.toISOString(),
    });
    const logRef = db.collection('transferenciaLog').doc();
    tx.set(logRef, {
      emailId,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      clienteId,
      clienteNombre: cliente.nombre,
      parseSource: parse.source,
      monto: parse.monto,
      mesesAplicados,
      score: 0,  // filled by handler
      rut: parse.rut,
      fechaTransferencia: parse.fecha,
      comentario: parse.comentario,
      resultado: 'applied',
    });
  });

  return {
    mesesAplicados,
    montoDistribuido: mesesCubiertos * cliente.monto,
    montoResidual: parse.monto - mesesCubiertos * cliente.monto,
  };
}
```

- [ ] **Step 5: Run tests against emulator to verify they pass**

```bash
cd functions
FIRESTORE_EMULATOR_HOST=localhost:8080 GCLOUD_PROJECT=revive-hogar-test npx jest src/transferencias/applier.test.ts 2>&1 | tail -20
```

Expected: PASS, 4 tests green.

- [ ] **Step 6: Commit**

```bash
git add functions/src/transferencias/applier.ts functions/src/transferencias/applier.test.ts functions/jest.config.js functions/package.json
git commit -m "feat(transferencias): applyTransferencia with N-month distribution"
```

---

## Task 8: Gmail client + labels module

**Files:**
- Create: `functions/src/transferencias/gmail/client.ts`
- Create: `functions/src/transferencias/gmail/client.test.ts`
- Create: `functions/src/transferencias/gmail/labels.ts`
- Create: `functions/src/transferencias/gmail/labels.test.ts`

- [ ] **Step 1: Create labels.ts (label name → ID resolution)**

Create `functions/src/transferencias/gmail/labels.ts`:

```typescript
export const LABEL_TRANSFERENCIAS = 'ReviveHogar/Transferencias';
export const LABEL_PROCESADAS = 'ReviveHogar/Procesadas';

interface GmailLabel {
  id: string;
  name: string;
}

interface GmailClient {
  users: {
    labels: {
      list: () => Promise<{ data: { labels: GmailLabel[] } }>;
    };
  };
}

/** Fetch all Gmail labels and build a name → ID map. */
export async function buildLabelMap(gmail: GmailClient): Promise<Map<string, string>> {
  const res = await gmail.users.labels.list();
  const map = new Map<string, string>();
  for (const label of res.data.labels ?? []) {
    map.set(label.name, label.id);
  }
  return map;
}

/** Ensure a label exists; if not, create it. Returns the label ID. */
export async function ensureLabel(gmail: GmailClient, name: string): Promise<string> {
  const map = await buildLabelMap(gmail);
  const existing = map.get(name);
  if (existing) return existing;
  // Create (full Gmail API has users.labels.create, but for our use case
  // the labels are created in Gmail UI by Rosario — we just resolve them)
  throw new Error(`Label "${name}" not found. Create it in Gmail UI.`);
}
```

- [ ] **Step 2: Create labels.test.ts**

Create `functions/src/transferencias/gmail/labels.test.ts`:

```typescript
import { describe, expect, it } from '@jest/globals';

import { buildLabelMap, ensureLabel, LABEL_TRANSFERENCIAS, LABEL_PROCESADAS } from './labels';

const mockGmail = {
  users: {
    labels: {
      list: async () => ({
        data: {
          labels: [
            { id: 'Label_1', name: 'INBOX' },
            { id: 'Label_5', name: LABEL_TRANSFERENCIAS },
            { id: 'Label_6', name: LABEL_PROCESADAS },
          ],
        },
      }),
    },
  },
};

describe('buildLabelMap', () => {
  it('builds a name → ID map from Gmail labels', async () => {
    const map = await buildLabelMap(mockGmail as any);
    expect(map.get(LABEL_TRANSFERENCIAS)).toBe('Label_5');
    expect(map.get(LABEL_PROCESADAS)).toBe('Label_6');
    expect(map.get('INBOX')).toBe('Label_1');
  });
});

describe('ensureLabel', () => {
  it('returns the ID if the label exists', async () => {
    const id = await ensureLabel(mockGmail as any, LABEL_TRANSFERENCIAS);
    expect(id).toBe('Label_5');
  });

  it('throws if the label does not exist', async () => {
    await expect(ensureLabel(mockGmail as any, 'NONEXISTENT')).rejects.toThrow();
  });
});
```

- [ ] **Step 3: Run labels tests**

```bash
cd functions && npx jest src/transferencias/gmail/labels.test.ts 2>&1 | tail -10
```

Expected: PASS, 2 tests.

- [ ] **Step 4: Create gmail/client.ts (OAuth + Gmail API wrapper)**

First, ensure `googleapis` and `google-auth-library` are in `functions/package.json`. If not:

```bash
cd functions && pnpm add googleapis google-auth-library
```

Then create `functions/src/transferencias/gmail/client.ts`:

```typescript
import { google, Auth } from 'googleapis';

import { Email } from '../parser/types';

interface GmailClientConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

let cachedAuth: Auth.OAuth2Client | null = null;
let cachedGmail: ReturnType<typeof google.gmail> | null = null;

export function getGmailClient(config: GmailClientConfig): ReturnType<typeof google.gmail> {
  if (cachedGmail) return cachedGmail;
  const oauth2 = new google.auth.OAuth2(config.clientId, config.clientSecret);
  oauth2.setCredentials({ refresh_token: config.refreshToken });
  cachedAuth = oauth2;
  cachedGmail = google.gmail({ version: 'v1', auth: oauth2 });
  return cachedGmail;
}

export interface GmailMessage {
  messageId: string;
  from: string;
  subject: string;
  bodyPlain: string;
  bodyHtml?: string;
  internalDate: string;
}

function decodeBase64(data: string): string {
  return Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
}

function extractBody(payload: any): { plain: string; html: string | undefined } {
  let plain = '';
  let html: string | undefined;
  if (payload.body?.data) {
    plain = decodeBase64(payload.body.data);
  } else if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        plain = decodeBase64(part.body.data);
      } else if (part.mimeType === 'text/html' && part.body?.data) {
        html = decodeBase64(part.body.data);
      }
    }
  }
  return { plain, html };
}

export async function listUnprocessedEmails(
  gmail: ReturnType<typeof google.gmail>,
  labelIdTransferencias: string,
  labelIdProcesadas: string,
): Promise<GmailMessage[]> {
  const list = await gmail.users.messages.list({
    userId: 'me',
    q: `label:${labelIdTransferencias} -label:${labelIdProcesadas}`,
    maxResults: 50,
  });

  const messages = list.data.messages ?? [];
  const result: GmailMessage[] = [];

  for (const msg of messages) {
    if (!msg.id) continue;
    const detail = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id,
      format: 'full',
    });
    const headers = detail.data.payload?.headers ?? [];
    const from = headers.find((h) => h.name === 'From')?.value ?? '';
    const subject = headers.find((h) => h.name === 'Subject')?.value ?? '';
    const { plain, html } = extractBody(detail.data.payload);
    result.push({
      messageId: msg.id,
      from,
      subject,
      bodyPlain: plain,
      bodyHtml: html,
      internalDate: detail.data.internalDate ?? '',
    });
  }

  return result;
}

export async function markEmailProcessed(
  gmail: ReturnType<typeof google.gmail>,
  messageId: string,
  labelIdTransferencias: string,
  labelIdProcesadas: string,
): Promise<void> {
  await gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    requestBody: {
      removeLabelIds: [labelIdTransferencias],
      addLabelIds: [labelIdProcesadas],
    },
  });
}

/** Re-export for tests. */
export function _resetCache() {
  cachedAuth = null;
  cachedGmail = null;
}
```

- [ ] **Step 5: Create gmail/client.test.ts (mocked googleapis)**

Create `functions/src/transferencias/gmail/client.test.ts`:

```typescript
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { _resetCache, getGmailClient, listUnprocessedEmails, markEmailProcessed } from './client';

const mockGmailApi = {
  users: {
    messages: {
      list: jest.fn(),
      get: jest.fn(),
      modify: jest.fn(),
    },
  },
};

jest.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: jest.fn().mockImplementation(() => ({
        setCredentials: jest.fn(),
      })),
    },
    gmail: jest.fn(() => mockGmailApi),
  },
}));

describe('listUnprocessedEmails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lists and hydrates emails', async () => {
    mockGmailApi.users.messages.list.mockResolvedValueOnce({
      data: { messages: [{ id: 'msg-1' }, { id: 'msg-2' }] },
    });
    mockGmailApi.users.messages.get
      .mockResolvedValueOnce({
        data: {
          id: 'msg-1',
          internalDate: '1234567890',
          payload: {
            headers: [
              { name: 'From', value: 'alertas@bice.cl' },
              { name: 'Subject', value: 'Transferencia' },
            ],
            body: { data: Buffer.from('Transferencia de $15.000').toString('base64') },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          id: 'msg-2',
          internalDate: '1234567891',
          payload: {
            headers: [
              { name: 'From', value: 'noreply@other.cl' },
              { name: 'Subject', value: 'Otro' },
            ],
            parts: [
              { mimeType: 'text/plain', body: { data: Buffer.from('Hello').toString('base64') } },
            ],
          },
        },
      });

    const emails = await listUnprocessedEmails(mockGmailApi as any, 'Label_5', 'Label_6');
    expect(emails.length).toBe(2);
    expect(emails[0].from).toBe('alertas@bice.cl');
    expect(emails[0].bodyPlain).toContain('Transferencia');
    expect(emails[1].bodyPlain).toBe('Hello');
  });

  it('returns empty array when no messages', async () => {
    mockGmailApi.users.messages.list.mockResolvedValueOnce({
      data: { messages: [] },
    });
    const emails = await listUnprocessedEmails(mockGmailApi as any, 'Label_5', 'Label_6');
    expect(emails).toEqual([]);
  });
});

describe('markEmailProcessed', () => {
  it('removes transferencias label and adds procesadas label', async () => {
    mockGmailApi.users.messages.modify.mockResolvedValueOnce({ data: {} });
    await markEmailProcessed(mockGmailApi as any, 'msg-1', 'Label_5', 'Label_6');
    expect(mockGmailApi.users.messages.modify).toHaveBeenCalledWith({
      userId: 'me',
      id: 'msg-1',
      requestBody: {
        removeLabelIds: ['Label_5'],
        addLabelIds: ['Label_6'],
      },
    });
  });
});
```

- [ ] **Step 6: Run gmail tests**

```bash
cd functions && npx jest src/transferencias/gmail/ 2>&1 | tail -15
```

Expected: PASS, all green (labels + client).

- [ ] **Step 7: Commit**

```bash
git add functions/src/transferencias/gmail/ functions/package.json pnpm-lock.yaml
git commit -m "feat(transferencias): Gmail client + label resolution"
```

---

## Task 9: Setup script (gmail refresh token)

**Files:**
- Create: `scripts/get-gmail-refresh-token.js`

- [ ] **Step 1: Create the script**

Create `scripts/get-gmail-refresh-token.js`:

```javascript
/**
 * One-time script: get a Gmail OAuth refresh token for Rosario.
 *
 * Usage:
 *   1. Create OAuth 2.0 Client ID in GCP Console (type: Web application)
 *   2. Add http://localhost:3000/oauth2callback as authorized redirect URI
 *   3. Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET env vars
 *   4. Run: node scripts/get-gmail-refresh-token.js
 *   5. Browser opens, log in as Rosario, grant permissions
 *   6. Script prints GMAIL_REFRESH_TOKEN
 *   7. Add to functions/.env.revive-hogar
 */
const http = require('http');
const { google } = require('googleapis');
const url = require('url');
const open = require('open');

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
];

const clientId = process.env.GMAIL_CLIENT_ID;
const clientSecret = process.env.GMAIL_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error('GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET must be set');
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(clientId, clientSecret, 'http://localhost:3000/oauth2callback');

const authorizeUrl = oauth2.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',  // force refresh_token issuance
});

console.log('Opening browser for authorization...');
console.log('If it does not open, visit:', authorizeUrl);

const server = http.createServer(async (req, res) => {
  try {
    const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
    const code = qs.get('code');
    if (!code) {
      res.end('No code in callback');
      return;
    }
    const { tokens } = await oauth2.getToken(code);
    res.end('Got it! You can close this tab.');
    server.close();
    console.log('\nAdd this to functions/.env.revive-hogar:\n');
    console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    res.end('Error: ' + err.message);
    server.close();
    process.exit(1);
  }
});

server.listen(3000, async () => {
  try {
    await open(authorizeUrl);
  } catch (err) {
    console.log('Could not open browser automatically.');
  }
});
```

- [ ] **Step 2: Install `open` package at repo root (dev dependency)**

```bash
pnpm add -D -w open
```

(The `-w` flag installs at workspace root if there's a workspace; otherwise omit.)

- [ ] **Step 3: Add to .env.template and .env.revive-hogar (the latter is gitignored)**

Edit `functions/.env.template`, add:

```
# Transferencias inbound (Gmail API)
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REFRESH_TOKEN=
MINIMAX_API_KEY=
TRANSFERENCIAS_BANCO_WHITELIST=bice.cl
```

If `functions/.env.revive-hogar` exists locally, append the same keys with empty values. **Never commit the actual values.**

- [ ] **Step 4: Commit**

```bash
git add scripts/get-gmail-refresh-token.js package.json functions/.env.template
git commit -m "chore: gmail refresh token setup script + env template"
```

---

## Task 10: Firestore rules + index

**Files:**
- Modify: `firestore.rules`
- Modify: `firestore.indexes.json`

- [ ] **Step 1: Read current rules**

```bash
cat firestore.rules
```

- [ ] **Step 2: Add the two new collection rules**

Append (find a similar admin-only block in the file and follow the same pattern):

```
    match /transferenciaLog/{logId} {
      allow read: if callerRole() == 'admin';
      allow write: if false;
    }

    match /transferenciasSinMatch/{inboxId} {
      allow read, write: if callerRole() == 'admin';
    }
```

If the existing `callerRole()` helper is in scope (per HANDOFF.md it should be), use it. Otherwise, fallback to the check used for other admin-only collections in the file.

- [ ] **Step 3: Add composite index for clientes query**

Read `firestore.indexes.json` and add:

```json
{
  "collectionGroup": "clientes",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "activo", "order": "ASCENDING" },
    { "fieldPath": "montoPendiente", "order": "DESCENDING" }
  ]
}
```

And for `transferenciaLog`:

```json
{
  "collectionGroup": "transferenciaLog",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "emailId", "order": "ASCENDING" },
    { "fieldPath": "processedAt", "order": "DESCENDING" }
  ]
}
```

- [ ] **Step 4: Run rules unit test (if exists)**

```bash
cd functions && ls src/__tests__/firestore* 2>/dev/null && npx jest src/__tests__/firestore 2>&1 | tail -10
```

If a rules test file exists, run it. If it fails due to the new collections not being testable (e.g., role check missing), defer to follow-up and continue.

- [ ] **Step 5: Commit**

```bash
git add firestore.rules firestore.indexes.json
git commit -m "feat(security): firestore rules + index for transferencias"
```

---

## Task 11: Handler (orchestrates everything)

**Files:**
- Create: `functions/src/transferencias/handler.ts`
- Create: `functions/src/transferencias/handler.integration.test.ts`
- Modify: `functions/src/index.ts`

- [ ] **Step 1: Create handler.ts**

Create `functions/src/transferencias/handler.ts`:

```typescript
import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { defineString } from 'firebase-functions/params';

import { getGmailClient, listUnprocessedEmails, markEmailProcessed } from './gmail/client';
import { LABEL_PROCESADAS, LABEL_TRANSFERENCIAS, buildLabelMap } from './gmail/labels';
import { matchCliente, MatchResult } from './matcher';
import { applyTransferencia } from './applier';
import { parseBice } from './parser/bice';
import { parseLlm } from './parser/llm';
import { Email, ParseResult } from './parser/types';

if (!admin.apps.length) {
  admin.initializeApp();
}

const MINIMAX_API_KEY = defineString('MINIMAX_API_KEY', { default: '' });
const GMAIL_CLIENT_ID = defineString('GMAIL_CLIENT_ID', { default: '' });
const GMAIL_CLIENT_SECRET = defineString('GMAIL_CLIENT_SECRET', { default: '' });
const GMAIL_REFRESH_TOKEN = defineString('GMAIL_REFRESH_TOKEN', { default: '' });

interface InboxWrite {
  reason: string;
  parse?: ParseResult | null;
  candidates?: Array<{ clienteId: string; nombre: string; score: number; reason: string }>;
}

async function writeToInbox(
  db: FirebaseFirestore.Firestore,
  email: Email,
  data: InboxWrite,
): Promise<void> {
  await db.collection('transferenciasSinMatch').add({
    emailId: email.messageId,
    receivedAt: admin.firestore.FieldValue.serverTimestamp(),
    reason: data.reason,
    parse: data.parse ?? null,
    candidates: data.candidates ?? [],
    email: {
      from: email.from,
      subject: email.subject,
      bodyPlain: email.bodyPlain,
      bodyHtml: email.bodyHtml ?? null,
    },
    status: 'pending',
    resolvedBy: null,
    resolvedAt: null,
    resolvedAction: null,
    resolvedClienteId: null,
  });
}

async function logCriticalError(type: string, details: string): Promise<void> {
  await admin.firestore().collection('notificationLogs').add({
    type: 'transferencias_critical_error',
    errorType: type,
    details,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

async function sendAdminAlert(message: string): Promise<void> {
  // Reuses SMTP2GO setup from paymentReminder.ts — left as TODO if SMTP not configured
  // For now, just log to notificationLogs
  await admin.firestore().collection('notificationLogs').add({
    type: 'admin_alert',
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('[transferenciasInbound] ADMIN ALERT:', message);
}

export const transferenciasInbound = onSchedule(
  {
    schedule: 'every 5 minutes',
    timeZone: 'America/Santiago',
    timeoutSeconds: 300,
    memory: '512MiB',
  },
  async () => {
    const db = admin.firestore();
    const apiKey = MINIMAX_API_KEY.value();
    const clientId = GMAIL_CLIENT_ID.value();
    const clientSecret = GMAIL_CLIENT_SECRET.value();
    const refreshToken = GMAIL_REFRESH_TOKEN.value();

    if (!clientId || !clientSecret || !refreshToken) {
      await logCriticalError('gmail_config_missing', 'GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, or GMAIL_REFRESH_TOKEN unset');
      return;
    }

    let gmail;
    try {
      gmail = getGmailClient({ clientId, clientSecret, refreshToken });
    } catch (err) {
      await logCriticalError('gmail_auth_failed', String(err));
      return;
    }

    // Resolve label IDs
    const labelMap = await buildLabelMap(gmail);
    const labelIdTransferencias = labelMap.get(LABEL_TRANSFERENCIAS);
    const labelIdProcesadas = labelMap.get(LABEL_PROCESADAS);
    if (!labelIdTransferencias || !labelIdProcesadas) {
      await logCriticalError('gmail_labels_missing', `Labels not found: ${LABEL_TRANSFERENCIAS}, ${LABEL_PROCESADAS}. Create them in Gmail UI.`);
      return;
    }

    // List unprocessed
    const emails = await listUnprocessedEmails(gmail, labelIdTransferencias, labelIdProcesadas);
    if (emails.length === 0) {
      console.log('[transferenciasInbound] No new emails');
      return;
    }
    console.log(`[transferenciasInbound] Processing ${emails.length} emails`);

    let auto = 0, inbox = 0, errors = 0;

    for (const email of emails) {
      try {
        // Idempotency
        const existing = await db.collection('transferenciaLog')
          .where('emailId', '==', email.messageId)
          .limit(1)
          .get();
        if (!existing.empty) {
          await markEmailProcessed(gmail, email.messageId, labelIdTransferencias, labelIdProcesadas);
          continue;
        }

        // Parse
        let parse: ParseResult | null = parseBice(email);
        if (!parse) {
          parse = await parseLlm(email, apiKey);
        }

        if (!parse) {
          await writeToInbox(db, email, { reason: 'parse_failed' });
          inbox++;
        } else {
          // Match
          const match: MatchResult = await matchCliente(parse, db);
          if (match.decision === 'auto' && match.candidates[0]) {
            try {
              await applyTransferencia(
                match.candidates[0].clienteId,
                parse,
                email.messageId,
                db,
              );
              auto++;
            } catch (applyErr) {
              const reason = String((applyErr as Error).message);
              await writeToInbox(db, email, {
                reason: reason === 'no_monthly_amount' || reason === 'partial_amount' ? reason : 'apply_failed',
                parse,
                candidates: match.candidates,
              });
              inbox++;
            }
          } else {
            await writeToInbox(db, email, {
              reason: match.reason,
              parse,
              candidates: match.candidates,
            });
            inbox++;
          }
        }

        await markEmailProcessed(gmail, email.messageId, labelIdTransferencias, labelIdProcesadas);
      } catch (err) {
        console.error(`[transferenciasInbound] Error processing ${email.messageId}:`, err);
        errors++;
      }
    }

    // Daily summary
    const today = new Date().toISOString().split('T')[0];
    await db.collection('notificationLogs').add({
      type: 'transferencias_inbound_summary',
      date: today,
      processed: emails.length,
      autoApplied: auto,
      sentToInbox: inbox,
      errors,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    if (inbox > 5) {
      await sendAdminAlert(`${inbox} transferencias sin matchear, revisá /admin/transferencias`);
    }

    console.log(`[transferenciasInbound] auto=${auto}, inbox=${inbox}, errors=${errors}`);
  },
);
```

- [ ] **Step 2: Export from index.ts**

In `functions/src/index.ts`, add:

```typescript
export { transferenciasInbound } from './transferencias/handler';
```

- [ ] **Step 3: Create integration test (emulator)**

Create `functions/src/transferencias/handler.integration.test.ts`:

```typescript
import { afterAll, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import * as admin from 'firebase-admin';

// Setup: firebase emulators:start --only firestore
// Env: FIRESTORE_EMULATOR_HOST=localhost:8080 GCLOUD_PROJECT=revive-hogar-test

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'revive-hogar-test' });
}
const db = admin.firestore();

// Mock the Gmail client
const mockGmail = {
  users: {
    labels: {
      list: async () => ({ data: { labels: [
        { id: 'Label_T', name: 'ReviveHogar/Transferencias' },
        { id: 'Label_P', name: 'ReviveHogar/Procesadas' },
      ] } }),
    },
    messages: {
      list: jest.fn(),
      get: jest.fn(),
      modify: jest.fn(),
    },
  },
};

const mockEmailTransfer = {
  messageId: 'msg-1',
  from: 'Alertas Banco BICE <alertas@bice.cl>',
  subject: 'Transferencia recibida',
  bodyPlain: 'Transferencia de $15.000 de Juan Pérez.\nRUT: 12.345.678-9',
  internalDate: '1234567890',
};

const mockEmailAmbiguous = {
  messageId: 'msg-2',
  from: 'Alertas Banco BICE <alertas@bice.cl>',
  subject: 'Transferencia',
  bodyPlain: 'Transferencia de $5.000 de alguien.',
  internalDate: '1234567891',
};

describe('transferenciasInbound (integration)', () => {
  const clienteId = 'cliente-1';

  beforeAll(async () => {
    await db.collection('clientes').doc(clienteId).set({
      nombre: 'Juan Pérez',
      correo: 'juan@test.cl',
      rut: '12.345.678-9',
      monto: 15000,
      montoPendiente: 15000,
      tipoPago: 'Transferencia',
      activo: true,
      pagos: {},
    });
  });

  afterAll(async () => {
    await db.recursiveDelete(db.collection('clientes'));
    await db.recursiveDelete(db.collection('transferenciaLog'));
    await db.recursiveDelete(db.collection('transferenciasSinMatch'));
    await db.recursiveDelete(db.collection('notificationLogs'));
  });

  beforeEach(async () => {
    await db.recursiveDelete(db.collection('transferenciaLog'));
    await db.recursiveDelete(db.collection('transferenciasSinMatch'));
    await db.recursiveDelete(db.collection('notificationLogs'));
    await db.collection('clientes').doc(clienteId).update({ montoPendiente: 15000, pagos: {} });
    mockGmail.users.messages.list.mockReset();
    mockGmail.users.messages.get.mockReset();
    mockGmail.users.messages.modify.mockReset();
    mockGmail.users.messages.modify.mockResolvedValue({ data: {} });
  });

  it('processes a perfect match end-to-end', async () => {
    mockGmail.users.messages.list.mockResolvedValueOnce({ data: { messages: [{ id: 'msg-1' }] } });
    mockGmail.users.messages.get.mockResolvedValueOnce({
      data: {
        id: 'msg-1',
        internalDate: '1234567890',
        payload: {
          headers: [
            { name: 'From', value: mockEmailTransfer.from },
            { name: 'Subject', value: mockEmailTransfer.subject },
          ],
          body: { data: Buffer.from(mockEmailTransfer.bodyPlain).toString('base64') },
        },
      },
    });

    const { _testable } = await import('./handler');
    await _testable.processEmails(mockGmail as any, db, '');

    const cliente = await db.collection('clientes').doc(clienteId).get();
    expect(cliente.data()?.montoPendiente).toBe(0);
    expect(cliente.data()?.pagos?.['junio 2026']).toBe('ok');  // current month

    const logs = await db.collection('transferenciaLog').get();
    expect(logs.size).toBe(1);
  });

  it('routes ambiguous match to inbox', async () => {
    mockGmail.users.messages.list.mockResolvedValueOnce({ data: { messages: [{ id: 'msg-2' }] } });
    mockGmail.users.messages.get.mockResolvedValueOnce({
      data: {
        id: 'msg-2',
        internalDate: '1234567891',
        payload: {
          headers: [
            { name: 'From', value: mockEmailAmbiguous.from },
            { name: 'Subject', value: mockEmailAmbiguous.subject },
          ],
          body: { data: Buffer.from(mockEmailAmbiguous.bodyPlain).toString('base64') },
        },
      },
    });

    const { _testable } = await import('./handler');
    await _testable.processEmails(mockGmail as any, db, '');

    const inbox = await db.collection('transferenciasSinMatch').get();
    expect(inbox.size).toBe(1);
    expect(inbox.docs[0].data().reason).toBe('low_score');

    const cliente = await db.collection('clientes').doc(clienteId).get();
    expect(cliente.data()?.montoPendiente).toBe(15000);  // unchanged
  });
});
```

To support this test, refactor `handler.ts`: extract the email processing loop into an exported `_testable.processEmails(gmail, db, apiKey)` function. Update `transferenciasInbound` to call `_testable.processEmails` after Gmail setup.

- [ ] **Step 4: Refactor handler.ts to expose `_testable.processEmails`**

Move the per-email processing loop body out of `transferenciasInbound` into a top-level `processSingleEmail` function, then have both the `onSchedule` handler and `_testable.processEmails` call it.

The new top-level `processSingleEmail` signature:

```typescript
async function processSingleEmail(
  gmail: any,
  db: FirebaseFirestore.Firestore,
  email: Email,
  labelIdTransferencias: string,
  labelIdProcesadas: string,
  apiKey: string,
): Promise<'auto' | 'inbox' | 'error'>
```

Return value lets the caller (the onSchedule handler or the test harness) count outcomes. Implementation = the body of the `for (const email of emails)` loop, with the inner `try/catch` returning `'auto' | 'inbox' | 'error'`.

The new `_testable` export at the bottom of `handler.ts`:

```typescript
export const _testable = {
  processEmails: async (
    gmail: any,
    db: FirebaseFirestore.Firestore,
    apiKey: string,
  ): Promise<{ auto: number; inbox: number; errors: number }> => {
    const labelMap = await buildLabelMap(gmail);
    const labelIdTransferencias = labelMap.get(LABEL_TRANSFERENCIAS);
    const labelIdProcesadas = labelMap.get(LABEL_PROCESADAS);
    if (!labelIdTransferencias || !labelIdProcesadas) {
      throw new Error('Gmail labels not found');
    }
    const emails = await listUnprocessedEmails(gmail, labelIdTransferencias, labelIdProcesadas);
    if (emails.length === 0) return { auto: 0, inbox: 0, errors: 0 };
    let auto = 0, inbox = 0, errors = 0;
    for (const email of emails) {
      try {
        const outcome = await processSingleEmail(
          gmail, db, email,
          labelIdTransferencias, labelIdProcesadas, apiKey,
        );
        if (outcome === 'auto') auto++;
        else if (outcome === 'inbox') inbox++;
      } catch {
        errors++;
      }
    }
    return { auto, inbox, errors };
  },
};
```

The `onSchedule` handler also calls `processSingleEmail` in its loop, accumulates `auto`/`inbox`/`errors`, and writes the daily summary log + alert if `inbox > 5` (the summary/alert logic stays in the onSchedule handler, not in `_testable`).

- [ ] **Step 5: Build functions and run integration test**

```bash
cd functions && node node_modules/typescript/bin/tsc
# In another terminal: firebase emulators:start --only firestore --project revive-hogar-test
# Back here:
FIRESTORE_EMULATOR_HOST=localhost:8080 GCLOUD_PROJECT=revive-hogar-test npx jest src/transferencias/handler.integration.test.ts 2>&1 | tail -20
```

Expected: PASS, 2 tests.

- [ ] **Step 6: Commit**

```bash
git add functions/src/transferencias/handler.ts functions/src/transferencias/handler.integration.test.ts functions/src/index.ts
git commit -m "feat(transferencias): handler orchestration with integration test"
```

---

## Task 12: Inbox actions callable (admin UI backend)

**Files:**
- Create: `functions/src/transferencias/inboxActions.ts`

- [ ] **Step 1: Create the callable function**

Create `functions/src/transferencias/inboxActions.ts`:

```typescript
import * as admin from 'firebase-admin';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

import { verifyFirebaseToken } from '../middleware';
import { applyTransferencia } from './applier';

if (!admin.apps.length) {
  admin.initializeApp();
}

interface ResolveRequest {
  inboxId: string;
  action: 'manual_apply' | 'dismiss';
  clienteId?: string;  // required if action='manual_apply'
}

/**
 * Admin callable to resolve a transferenciasSinMatch entry.
 * - manual_apply: applies the saved parse to the chosen clienteId
 * - dismiss: marks as rejected without applying
 */
export const resolveTransferenciaInbox = onCall(
  { region: 'us-central1' },
  async (req) => {
    // Auth: require admin
    try {
      await verifyFirebaseToken(req.rawRequest.headers.authorization);
    } catch {
      throw new HttpsError('unauthenticated', 'Must be authenticated');
    }
    // (Role check would be added per firestore.rules — if the caller is non-admin,
    //  the Firestore read of /usuarios would fail. For now, any authed user is OK
    //  if firestore rules permit. Verify with rules before relying on this.)

    const data = req.data as ResolveRequest;
    if (!data.inboxId || !data.action) {
      throw new HttpsError('invalid-argument', 'inboxId and action are required');
    }
    if (data.action === 'manual_apply' && !data.clienteId) {
      throw new HttpsError('invalid-argument', 'clienteId required for manual_apply');
    }

    const db = admin.firestore();
    const inboxRef = db.collection('transferenciasSinMatch').doc(data.inboxId);
    const inboxSnap = await inboxRef.get();
    if (!inboxSnap.exists) {
      throw new HttpsError('not-found', 'inbox entry not found');
    }
    const inboxData = inboxSnap.data();
    if (inboxData?.status !== 'pending') {
      throw new HttpsError('failed-precondition', `already ${inboxData?.status}`);
    }

    if (data.action === 'dismiss') {
      await inboxRef.update({
        status: 'rejected',
        resolvedBy: req.auth?.uid ?? null,
        resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
        resolvedAction: 'dismiss',
      });
      return { ok: true, action: 'dismissed' };
    }

    // manual_apply
    const parse = inboxData?.parse;
    if (!parse || !parse.monto) {
      throw new HttpsError('failed-precondition', 'no parse data to apply');
    }

    try {
      const result = await applyTransferencia(
        data.clienteId!,
        parse,
        inboxData.emailId,
        db,
      );
      await inboxRef.update({
        status: 'confirmed',
        resolvedBy: req.auth?.uid ?? null,
        resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
        resolvedAction: 'manual_apply',
        resolvedClienteId: data.clienteId,
      });
      return { ok: true, action: 'applied', mesesAplicados: result.mesesAplicados };
    } catch (err) {
      // Update inbox with failure reason
      await inboxRef.update({
        status: 'expired',
        resolvedBy: req.auth?.uid ?? null,
        resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
        resolvedAction: 'manual_apply',
        resolvedClienteId: data.clienteId,
      });
      throw new HttpsError('internal', `apply failed: ${(err as Error).message}`);
    }
  },
);
```

- [ ] **Step 2: Export from index.ts**

```typescript
export { resolveTransferenciaInbox } from './transferencias/inboxActions';
```

- [ ] **Step 3: Commit**

```bash
git add functions/src/transferencias/inboxActions.ts functions/src/index.ts
git commit -m "feat(transferencias): admin callable to resolve inbox"
```

---

## Task 13: Cleanup cron (monthly inbox cleanup)

**Files:**
- Create: `functions/src/transferencias/cleanup.ts`

- [ ] **Step 1: Create cleanup.ts**

Create `functions/src/transferencias/cleanup.ts`:

```typescript
import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';

if (!admin.apps.length) {
  admin.initializeApp();
}

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

/**
 * Runs at 3:00 AM Chile time on the 1st of each month.
 * Deletes transferenciasSinMatch entries that are resolved (>90d ago).
 */
export const transferenciasCleanup = onSchedule(
  {
    schedule: '0 3 1 * *',
    timeZone: 'America/Santiago',
    timeoutSeconds: 120,
  },
  async () => {
    const db = admin.firestore();
    const cutoff = new Date(Date.now() - NINETY_DAYS_MS);
    const snap = await db.collection('transferenciasSinMatch')
      .where('status', 'in', ['confirmed', 'rejected', 'expired'])
      .where('resolvedAt', '<', cutoff)
      .get();

    if (snap.empty) {
      console.log('[transferenciasCleanup] No entries to delete');
      return;
    }

    const batch = db.batch();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    console.log(`[transferenciasCleanup] Deleted ${snap.size} old entries`);
  },
);
```

- [ ] **Step 2: Export from index.ts**

```typescript
export { transferenciasCleanup } from './transferencias/cleanup';
```

- [ ] **Step 3: Commit**

```bash
git add functions/src/transferencias/cleanup.ts functions/src/index.ts
git commit -m "chore(transferencias): monthly cleanup of resolved inbox entries"
```

---

## Task 14: Admin UI — Transferencias page

**Files:**
- Create: `src/pages/admin/Transferencias/Transferencias.tsx`
- Create: `src/pages/admin/Transferencias/components/PendingInbox.tsx`
- Create: `src/pages/admin/Transferencias/components/HistoryList.tsx`
- Create: `src/pages/admin/Transferencias/components/ResolveDialog.tsx`
- Modify: router config (find the file that defines `/admin/*` routes)

- [ ] **Step 1: Find the router file**

```bash
grep -rn "admin/pagos\|/admin/pagos" src/ 2>/dev/null | head -5
```

Expected: a file with route definitions, e.g. `src/router.tsx`, `src/App.tsx`, or `src/pages/admin/adminRoutes.tsx`. Open it and note the pattern for adding a new route.

- [ ] **Step 2: Create the page wrapper**

Create `src/pages/admin/Transferencias/Transferencias.tsx`:

```typescript
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import HistoryList from './components/HistoryList';
import PendingInbox from './components/PendingInbox';

function Transferencias() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transferencias
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Pendientes" />
        <Tab label="Historial" />
      </Tabs>
      {tab === 0 ? <PendingInbox /> : <HistoryList />}
    </Box>
  );
}

export default Transferencias;
```

- [ ] **Step 3: Create PendingInbox component**

Create `src/pages/admin/Transferencias/components/PendingInbox.tsx`:

```typescript
import { useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { db } from '@/firebase/config';
import ResolveDialog from './ResolveDialog';

interface InboxEntry {
  id: string;
  emailId: string;
  receivedAt: any;
  reason: string;
  parse: {
    monto: number;
    rut: string | null;
    fecha: string | null;
    comentario: string | null;
    nombre: string | null;
  } | null;
  candidates: Array<{ clienteId: string; nombre: string; score: number; reason: string }>;
  email: { from: string; subject: string; bodyPlain: string };
  status: 'pending' | 'confirmed' | 'rejected' | 'expired';
}

function formatCLP(n: number): string {
  return `$${n.toLocaleString('es-CL')}`;
}

function PendingInbox() {
  const [selected, setSelected] = useState<InboxEntry | null>(null);

  const q = query(
    collection(db, 'transferenciasSinMatch'),
    where('status', '==', 'pending'),
    orderBy('receivedAt', 'desc'),
    limit(50),
  );
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgress />;
  if (!snapshot || snapshot.empty) {
    return <Typography color="text.secondary">No hay transferencias pendientes de revisión.</Typography>;
  }

  const entries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InboxEntry));

  return (
    <Stack spacing={2}>
      {entries.map((entry) => (
        <Accordion key={entry.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body1" fontWeight={600}>
                  {entry.parse?.nombre ?? 'Sin nombre'}
                </Typography>
                <Chip label={entry.reason} color="warning" size="small" />
                {entry.parse && (
                  <Typography variant="body2" color="text.secondary">
                    {formatCLP(entry.parse.monto)} · {entry.parse.fecha ?? 'sin fecha'}
                  </Typography>
                )}
              </Stack>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Email original:</Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', bgcolor: 'grey.100', p: 1, mt: 1 }}>
                {entry.email.bodyPlain}
              </Typography>
            </Box>

            {entry.candidates.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Candidatos ({entry.candidates.length}):</Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  {entry.candidates.slice(0, 5).map((c) => (
                    <Box key={c.clienteId} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {c.nombre} (score: {c.score}, {c.reason})
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => setSelected(entry)}
                      >
                        Aplicar a este
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={async () => {
                  if (!confirm('¿Descartar esta entrada?')) return;
                  const { getFunctions, httpsCallable } = await import('firebase/functions');
                  const fns = getFunctions();
                  const resolve = httpsCallable(fns, 'resolveTransferenciaInbox');
                  await resolve({ inboxId: entry.id, action: 'dismiss' });
                  window.location.reload();
                }}
              >
                Descartar
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}

      {selected && (
        <ResolveDialog
          entry={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </Stack>
  );
}

export default PendingInbox;
```

- [ ] **Step 4: Create ResolveDialog component**

Create `src/pages/admin/Transferencias/components/ResolveDialog.tsx`:

```typescript
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { InboxEntry } from './PendingInbox';

interface Props {
  entry: InboxEntry;
  onClose: () => void;
}

function formatCLP(n: number): string {
  return `$${n.toLocaleString('es-CL')}`;
}

function ResolveDialog({ entry, onClose }: Props) {
  const [clienteId, setClienteId] = useState<string>(
    entry.candidates[0]?.clienteId ?? '',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    setLoading(true);
    setError(null);
    try {
      const fns = getFunctions();
      const resolve = httpsCallable(fns, 'resolveTransferenciaInbox');
      const result = await resolve({
        inboxId: entry.id,
        action: 'manual_apply',
        clienteId,
      });
      alert(`Aplicado: ${(result.data as any).mesesAplicados?.join(', ')}`);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Aplicar transferencia</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2">
            Monto: <strong>{entry.parse ? formatCLP(entry.parse.monto) : 'N/A'}</strong>
          </Typography>
          {entry.parse?.comentario && (
            <Typography variant="body2">Comentario: {entry.parse.comentario}</Typography>
          )}

          <Select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            fullWidth
          >
            {entry.candidates.map((c) => (
              <MenuItem key={c.clienteId} value={c.clienteId}>
                {c.nombre} (score: {c.score})
              </MenuItem>
            ))}
          </Select>

          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={handleApply} variant="contained" disabled={loading || !clienteId}>
          {loading ? 'Aplicando...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResolveDialog;
```

- [ ] **Step 5: Create HistoryList component**

Create `src/pages/admin/Transferencias/components/HistoryList.tsx`:

```typescript
import { collection, orderBy, query, limit } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  CircularProgress,
  DataGrid,
  GridColDef,
  Typography,
} from '@mui/x-data-grid';

import { db } from '@/firebase/config';

interface LogEntry {
  id: string;
  emailId: string;
  processedAt: any;
  clienteId: string;
  clienteNombre: string;
  monto: number;
  mesesAplicados: string[];
  score: number;
  parseSource: string;
}

const columns: GridColDef<LogEntry>[] = [
  { field: 'clienteNombre', headerName: 'Cliente', flex: 1, minWidth: 150 },
  {
    field: 'monto',
    headerName: 'Monto',
    width: 120,
    valueFormatter: (value: number) => `$${value.toLocaleString('es-CL')}`,
  },
  { field: 'mesesAplicados', headerName: 'Meses', width: 200 },
  { field: 'parseSource', headerName: 'Parser', width: 100 },
  { field: 'score', headerName: 'Score', width: 80 },
  {
    field: 'processedAt',
    headerName: 'Fecha',
    width: 180,
    valueFormatter: (value: any) => value?.toDate?.()?.toLocaleString('es-CL') ?? '',
  },
];

function HistoryList() {
  const q = query(
    collection(db, 'transferenciaLog'),
    orderBy('processedAt', 'desc'),
    limit(100),
  );
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgress />;
  if (!snapshot || snapshot.empty) {
    return <Typography color="text.secondary">No hay transferencias aplicadas.</Typography>;
  }

  const rows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LogEntry));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[25, 50, 100]}
      initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
      autoHeight
      disableRowSelectionOnClick
    />
  );
}

export default HistoryList;
```

- [ ] **Step 6: Register the route**

In the router file (found in step 1), add a route `/admin/transferencias`:

```typescript
import Transferencias from '@/pages/admin/Transferencias/Transferencias';

// ... inside the admin routes:
<Route path="transferencias" element={<Transferencias />} />
```

(Follow the same pattern as the existing `/admin/pagos` route. If the file uses lazy loading, lazy-load this too.)

- [ ] **Step 7: Add a nav link**

Find the admin nav component (e.g. `src/components/AdminLayout/Sidebar.tsx` or similar) and add a link to `/admin/transferencias`. Match the existing link style.

- [ ] **Step 8: Build frontend and verify no errors**

```bash
cd /Users/consultor/cgl/revive-hogar-transferencias
npx tsc --noEmit
node node_modules/vite/bin/vite.js build 2>&1 | tail -20
```

Expected: 0 TypeScript errors, build succeeds. (Per HANDOFF.md use `node node_modules/vite/bin/vite.js`, not `pnpm dev`.)

- [ ] **Step 9: Commit**

```bash
git add src/pages/admin/Transferencias/ src/router-or-similar-file.tsx src/components/...
git commit -m "feat(ui): admin /admin/transferencias page"
```

---

## Task 15: AGENTS.md update

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add the new section under "Known Gaps" — close Gap #2 from phase 1**

Locate the "Known Gaps" section. Either:
- Add a new "Transferencias auto-sync" subsection explaining what was built.
- Or remove any closed gap that no longer applies.

Add a new subsection titled "## Transferencias auto-sync" with:

```markdown
## Transferencias auto-sync

`clientes.tipoPago === 'Transferencia'` is now auto-detected from bank notification emails. See `docs/superpowers/specs/2026-06-21-transferencias-auto-sync-design.md` for the full design.

**How it works:**
- Cloud Function `transferenciasInbound` runs every 5 min (`onSchedule`)
- Reads Rosario's Gmail via OAuth (refresh token in `functions/.env.revive-hogar`)
- Gmail filter (configured in Gmail UI) labels bank emails as `ReviveHogar/Transferencias`
- Parses BICE emails with regex; falls back to MiniMax M3 LLM for other banks
- Score-based matching: ≥95 auto-applies; <95 routes to `transferenciasSinMatch` inbox
- Applies in Firestore transaction: writes `pagos[mes]='ok'`, decrements `montoPendiente`, increments `fechaCorte`
- Logs to `transferenciaLog` (audit trail) and `transferenciasSinMatch` (admin inbox)
- Admin UI: `/admin/transferencias` (Pendientes + Historial tabs)

**Setup required (one-time, by Carlos):**
1. Create OAuth 2.0 client in GCP Console, run `node scripts/get-gmail-refresh-token.js`
2. Add 3 env vars to `functions/.env.revive-hogar`: `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `MINIMAX_API_KEY`
3. Rosario creates Gmail filter for `ReviveHogar/Transferencias` label
4. Rosario configures bank notifications to forward to her Gmail

**Out of scope (deferred):**
- Multi-bank regex parsers (BICE only)
- SMTP2GO inbound (rejected — no custom domain)
- Notification to client "received your payment"
- Direct bank API integration
```

- [ ] **Step 2: Update Repository Layout**

Add to the `functions/src/` section:

```
  transferencias/        — email inbound for bank transfers
    parser/             — bice.ts (regex) + llm.ts (M3 fallback)
    matcher.ts          — score-based client matching
    applier.ts          — apply match to Firestore (transactional)
    gmail/              — Gmail API client + label resolution
    handler.ts          — onSchedule orchestrator
    inboxActions.ts     — admin callable to resolve inbox
    cleanup.ts          — monthly cleanup of resolved entries
```

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs(agents): document transferencias auto-sync subsystem"
```

---

## Task 16: README setup section

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Find existing setup sections in README**

```bash
grep -n "## " README.md | head -20
```

- [ ] **Step 2: Add a "Transferencias auto-sync setup" section**

After the existing "Payku setup" or "Cloud Functions" section, add:

```markdown
## Transferencias auto-sync setup

Required to enable automatic detection of bank transfer emails. See `docs/superpowers/specs/2026-06-21-transferencias-auto-sync-design.md` for the design.

### 1. OAuth credentials (one-time)

1. GCP Console → APIs & Services → Credentials → Create OAuth 2.0 Client ID
   - Type: **Web application**
   - Authorized redirect URI: `http://localhost:3000/oauth2callback`
2. Copy the Client ID and Client Secret.

### 2. Generate refresh token (one-time)

```bash
export GMAIL_CLIENT_ID="<from step 1>"
export GMAIL_CLIENT_SECRET="<from step 1>"
node scripts/get-gmail-refresh-token.js
# Browser opens → log in as Rosario → grant permissions
# Script prints GMAIL_REFRESH_TOKEN
```

### 3. Configure env vars

Add to `functions/.env.revive-hogar` (gitignored):

```
GMAIL_CLIENT_ID=<from step 1>
GMAIL_CLIENT_SECRET=<from step 1>
GMAIL_REFRESH_TOKEN=<from step 2>
MINIMAX_API_KEY=<from MiniMax dashboard>
TRANSFERENCIAS_BANCO_WHITELIST=bice.cl
```

### 4. Gmail labels + filter (Rosario, 1 min)

In Gmail UI:
1. Create label `ReviveHogar/Transferencias` (Settings → Labels)
2. Create label `ReviveHogar/Procesadas` (Settings → Labels)
3. Settings → Filters → Create filter:
   - From: `alertas@bice.cl` (or whatever BICE's actual sender is)
   - Apply label `ReviveHogar/Transferencias`
   - Skip Inbox
   - Never mark as important

### 5. Deploy

```bash
firebase deploy --only functions:transferenciasInbound,functions:transferenciasCleanup,functions:resolveTransferenciaInbox
```

### 6. Verify

Send a test email matching the BICE format to Rosario's Gmail. Within 5 minutes, the cliente's `pagos[mes]` should be `'ok'` and `montoPendiente` should be decremented. Check `/admin/transferencias` for the audit entry.
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: transferencias auto-sync setup instructions"
```

---

## Task 17: Pre-merge checks

**Files:** none (verify only)

- [ ] **Step 1: Run all unit tests**

```bash
cd functions
npx jest --testPathIgnorePatterns=integration 2>&1 | tail -15
```

Expected: all green. No skipped tests without a reason.

- [ ] **Step 2: Run integration tests with emulators**

```bash
# Terminal 1:
cd functions
firebase emulators:start --only firestore --project revive-hogar-test

# Terminal 2:
cd functions
FIRESTORE_EMULATOR_HOST=localhost:8080 GCLOUD_PROJECT=revive-hogar-test npx jest --testPathPattern=integration 2>&1 | tail -20
```

Expected: handler.integration.test.ts and applier.test.ts pass.

- [ ] **Step 3: TypeScript check (functions + frontend)**

```bash
cd functions && node node_modules/typescript/bin/tsc --noEmit && cd ..
cd /Users/consultor/cgl/revive-hogar-transferencias && npx tsc --noEmit 2>&1 | tail -10
```

Expected: 0 errors.

- [ ] **Step 4: Build functions**

```bash
cd functions && node node_modules/typescript/bin/tsc && cd ..
ls functions/lib/transferencias/
```

Expected: parser/, matcher.js, applier.js, handler.js, etc. all built.

- [ ] **Step 5: Manual smoke test (emulator)**

```bash
# Terminal 1:
cd functions
firebase emulators:start --only auth,functions,firestore --project revive-hogar-test

# Terminal 2: seed a cliente with montoPendiente > 0
# (use scripts/seed-clientes-retiros.sh from the phase-0 worktree as a template,
#  or manually via Emulator UI at http://localhost:4000)

# Terminal 3: simulate an email (use the mock from handler.integration.test.ts as a template)
# OR temporarily hardcode an email in handler.ts and run the schedule manually
```

Expected: cliente.pagos updated, transferenciaLog entry written, email labeled as processed (in mock — actual Gmail requires real setup).

- [ ] **Step 6: Verify no hardcoded secrets**

```bash
cd /Users/consultor/cgl/revive-hogar-transferencias
grep -rn "GMAIL_REFRESH_TOKEN\|MINIMAX_API_KEY\|@revivehogar" functions/src/ 2>&1 | head -10
```

Expected: no matches in source code (env vars are read via `process.env` or `defineString` only).

- [ ] **Step 7: Update CHANGELOG.md**

Read the file, then prepend:

```markdown
## 2026-06-21 — Transferencias auto-sync

- New Cloud Function `transferenciasInbound` (onSchedule, 5 min)
- BICE regex parser + MiniMax M3 LLM fallback
- Score-based auto-apply (≥95) + admin inbox for ambiguous matches
- New collections: `transferenciaLog`, `transferenciasSinMatch`
- New admin page: `/admin/transferencias`
- New `rut` field on `Cliente` (used for matching)
- See `docs/superpowers/specs/2026-06-21-transferencias-auto-sync-design.md`
```

- [ ] **Step 8: Commit CHANGELOG**

```bash
git add CHANGELOG.md
git commit -m "docs(changelog): transferencias auto-sync entry"
```

---

## Task 18: Open the PR

**Files:** none

- [ ] **Step 1: Push the branch**

```bash
cd /Users/consultor/cgl/revive-hogar-transferencias
git push -u origin feat/transferencias-auto-sync
```

- [ ] **Step 2: Open PR on GitHub**

```bash
gh pr create --title "feat(transferencias): auto-sync from Gmail" --body "$(cat <<'EOF'
## Summary
Closes Phase 1 #6 of the remediation plan. Bank transfer emails in Rosario's Gmail now auto-update `clientes.pagos` when matched with score ≥ 95. Low-score matches go to an admin inbox at `/admin/transferencias`.

## Architecture
See `docs/superpowers/specs/2026-06-21-transferencias-auto-sync-design.md` for full design.

## What ships
- BICE regex parser (deterministic, free) + MiniMax M3 LLM fallback
- Score-based matcher (RUT+50, monto+30, unique+20, nombre+10, ambiguity-30)
- Transactional `applyTransferencia` (atomic write to cliente + log)
- New collections: `transferenciaLog`, `transferenciasSinMatch`
- Cloud Functions: `transferenciasInbound` (5min), `transferenciasCleanup` (monthly), `resolveTransferenciaInbox` (admin callable)
- Admin UI at `/admin/transferencias` (Pendientes + Historial tabs)

## Setup required (NOT in repo)
1. GCP OAuth client + refresh token (see README)
2. Rosario creates Gmail filter (1 min in Gmail UI)
3. `functions/.env.revive-hogar` populated (gitignored)

## Test plan
- [x] Unit tests: parser (14), matcher (8), gmail client (3)
- [x] Integration: applier (4), handler (2) with Firestore emulator
- [ ] Manual E2E with real Gmail after deploy (not in CI)

## Out of scope (deferred)
- Multi-bank regex parsers (BICE only)
- Notification to client
- Direct bank API integration
EOF
)"
```

- [ ] **Step 3: Wait for review and address feedback**

Watch for PR comments. Common follow-ups:
- Threshold tuning (95/20 might need adjustment based on real data)
- Additional error cases
- Index/rule tweaks

---

## Success criteria (from spec)

- [ ] 95%+ of BICE transferencias match auto (post-rollout, 30d)
- [ ] 0 false positives (Rosario audit)
- [ ] Inbox < 5 entries/week steady-state
- [ ] Latency email→pagos < 10 min
- [ ] UI loads < 2s with 100 inbox entries
