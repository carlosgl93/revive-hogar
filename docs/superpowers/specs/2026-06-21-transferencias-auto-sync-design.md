---
name: Transferencias — Auto-sync from Gmail
last_updated: 2026-06-21
status: design (approved, ready for plan)
---

# Transferencias — Auto-sync from Gmail

## Context

`clientes.tipoPago === 'Transferencia'` es 1 de los 3 tipos de pago. Hoy, cuando un cliente transfiere al banco, Rosario lo detecta manualmente y llama `markAsPaid(clientId)` (escribe `pagos[mes]='ok'`, `montoPendiente=0`, `fechaCorte++`). Esto cierra el embudo de pagos — Phase 1 #6 del remediation plan lo flagueó como ausente y la decision #2 lo dejó defer.

Hoy el código de `markAsPaid` está en `src/firebase/useUpdateClient.ts:18` y se invoca desde `ClientsTable.tsx` (botón "Marcar como pagado este mes").

**Por qué importa**: a más clientes, más reconciliación manual. La promesa de la STRATEGY.md es "el estado de pago es derivado, nunca capturado" — el path transferencia sigue siendo capturado.

**Outcome esperado**: cuando llega una transferencia al banco de Rosario, el sistema matchea al cliente y actualiza `pagos[mes]='ok'` automáticamente. Casos ambiguos caen a una inbox para revisión manual.

## Decisions (resueltas en brainstorming)

1. **Comportamiento**: auto-marcar como pagado cuando match score ≥ 95%. Score < 95% va a `transferenciasSinMatch` inbox.
2. **Email infra**: Gmail API + polling (no SMTP2GO inbound — no hay dominio custom). Cloud Scheduler triggea cada 5 min.
3. **Buzón**: el de Rosario (`cgumucio93@gmail.com` per `.env`). Gmail filter (configurado en Gmail UI, no en código) aplica label `ReviveHogar/Transferencias` a emails de bancos whitelistados.
4. **Cobertura del monto**: mezcla — 1 mes o N meses. Detectar por `monto / cliente.monto` o por comentario explícito del banco.
5. **Parser approach**: regex determinístico para BICE (banco único que usa Rosario), LLM fallback (MiniMax M3 API) para cualquier otro banco.
6. **Distribución de meses**: a los N meses más atrasados (sorted por status `pendiente > atrasado > ''`), o comentario explícito si existe.
7. **Infra setup outside repo**: 1) crear OAuth client en GCP, 2) generar refresh token, 3) Rosario configura Gmail filter (one-time). Documentado en README, no automatizado.

## Architecture

```
[Banco BICE]  ──SMTP──>  [rosario@gmail.com]
                                │
                                │ Gmail filter (manual, one-time)
                                │   from:alertas@bice.cl
                                │   → label:ReviveHogar/Transferencias
                                │   skip inbox
                                ▼
                [Cloud Scheduler: every 5 minutes]
                                │
                                ▼
        [Cloud Function: transferenciasInbound (onSchedule)]
                                │
                ┌───────────────┴───────────────┐
                │ parse                          │
                │  - from matches BICE? → regex   │
                │  - else → MiniMax M3 fallback   │
                └───────────────┬───────────────┘
                                ▼ {monto, rut, fecha, comentario}
                          [matcher]
                ┌───────────────┴───────────────┐
                │ score >= 95                   │ score < 95
                ▼                               ▼
       [applier]                      [transferenciasSinMatch]
       - write pagos[mes]='ok'         - email body + parse
       - montoPendiente=0              - candidates sugeridos
       - fechaCorte++ (N meses)        - admin UI para resolver
       - log to transferenciaLog
                │                               │
                ▼                               ▼
           (auto, no UI)             [UI: /admin/transferencias]
```

### Capas separadas (cada una testeable)

- **`parser/bice.ts`** — pure function, regex determinístico. Input: email crudo. Output: `ParseResult | null`.
- **`parser/llm.ts`** — async, llama a MiniMax M3 API con JSON mode forzado. Output: `ParseResult | null`. Null en error/timeout.
- **`matcher.ts`** — async, query Firestore para candidatos, computa score. Output: `MatchResult` con `decision: 'auto' | 'inbox'`.
- **`applier.ts`** — async, distribución de N meses + write atómico. Output: log entry.
- **`handler.ts`** — orquesta todo. Entry point del Cloud Function (onSchedule).

## Components

### `parser/bice.ts`

```typescript
interface Email {
  from: string;       // "Alertas Banco BICE <alertas@bice.cl>"
  subject: string;
  bodyPlain: string;
  bodyHtml?: string;
  messageId: string;
  internalDate: string;
}

interface ParseResult {
  monto: number;              // CLP, integer
  rut: string | null;         // "12.345.678-9" normalized
  fecha: string | null;       // ISO date "2026-06-20"
  comentario: string | null;  // "Transferencia de Juan Pérez, junio"
  nombre: string | null;      // "Juan Pérez" (de comentario o subject)
  source: 'bice_regex' | 'llm';
  rawExcerpt: string;         // primeras 500 chars del body, para debug
}

export function parseBice(email: Email): ParseResult | null
```

**Reconocimiento del banco**: `from.toLowerCase().includes('bice.cl')`. Whitelist configurable via `TRANSFERENCIAS_BANCO_WHITELIST` env (comma-separated).

**Extracción**:
- `monto`: regex `/\$?\s*([\d.]+(?:\.\d{3})*)\s*(?:CLP|pesos)?/i` con normalización (dots removed, comma → dot for decimals)
- `rut`: regex `/\b(\d{1,2}\.?\d{3}\.?\d{3})-?([\dkK])\b/`
- `fecha`: regex de fechas comunes (`\d{1,2}\/\d{1,2}\/\d{2,4}`, `\d{1,2} de \w+ de \d{4}`), normalize a ISO
- `comentario`: línea que contiene "Transferencia" o "Abono"
- `nombre`: extraer de comentario con regex `de ([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)`

**Retorna `null`** si: no es email de banco whitelisted, no se encuentra monto válido, monto ≤ 0.

### `parser/llm.ts`

```typescript
export async function parseLlm(email: Email, apiKey: string): Promise<ParseResult | null>
```

**LLM call** (MiniMax M3 API):
- Endpoint: `https://api.minimaxi.com/v1/text/chatcompletion_v2` (o el queMiniMax exponga para structured output)
- System: `"Sos un parser de emails bancarios chilenos. Devolvé SOLO JSON válido con la forma: {monto: number, rut: string|null, fecha: string|null, comentario: string|null, nombre: string|null, esTransferencia: boolean}"`
- User: email body (prefer `bodyPlain`, fallback a `bodyHtml` strippeado)
- `response_format: { type: 'json_object' }` o equivalente del proveedor
- Timeout 10s. Model: `MiniMax-M3` o el tier más barato disponible.

**Validación post-llamada**: si `esTransferencia === false` → return null. Si campos faltan o son inválidos (monto NaN, rut no matchea regex) → return null.

**Costo estimado**: ~$0.001/email (~$0.30/mes con 1 email/día de un banco distinto a BICE).

### `matcher.ts`

```typescript
interface MatchCandidate {
  clienteId: string;
  cliente: Cliente;
  score: number;
  reason: string;
}

interface MatchResult {
  score: number;          // top candidate score
  candidates: MatchCandidate[];  // sorted by score desc
  decision: 'auto' | 'inbox';
  reason: string;
}

export async function matchCliente(
  parse: ParseResult,
  db: FirebaseFirestore.Firestore
): Promise<MatchResult>
```

**Algoritmo de score** (computado por candidato, sobre `clientes` activos con `montoPendiente > 0`):
- `+50` si `cliente.rut === parse.rut` (campo nuevo en `Cliente`)
- `+30` si `cliente.montoPendiente === parse.monto` exacto
- `+20` si es el único candidato activo con `montoPendiente > 0`
- `+10` si `cliente.nombre.toLowerCase()` está fuzzy-contained en `parse.comentario` (Levenshtein ≤ 2, solo si `cliente.nombre.length >= 5` para evitar false positives en nombres cortos)
- `-30` si hay 2+ candidatos con score > 60 (ambigüedad forzada)

**Decisión**:
- `decision: 'auto'` si `top.score >= 95` AND `top.score - second.score >= 20` (margen claro)
- `decision: 'inbox'` en cualquier otro caso

**Query optimizada**: `db.collection('clientes').where('activo', '==', true).where('montoPendiente', '>', 0).get()` + filtrar en memoria (esperamos <100 candidatos activos con pendiente).

### `applier.ts`

```typescript
export interface ApplyResult {
  mesesAplicados: string[];   // ['marzo 2026', 'abril 2026']
  montoDistribuido: number;
  montoResidual: number;      // si monto no calza exacto con N meses
}

export async function applyTransferencia(
  clienteId: string,
  parse: ParseResult,
  emailId: string,
  db: FirebaseFirestore.Firestore
): Promise<ApplyResult>
```

**Lógica de distribución** (asume `cliente.monto > 0`):

1. Calcular ratio = `parse.monto / cliente.monto`. Si `|ratio - round(ratio)| > 0.05` (5% tolerance, ej. comisión bancaria) → throw con `reason: 'partial_amount'`, caller routea a inbox. No auto-apply.
2. `mesesCubiertos = round(ratio)`. Si `=== 0` → throw con `reason: 'partial_amount'`.
3. Si `parse.comentario` matchea patrón `mes_1[,]? mes_2[,]? ...` y la cantidad de meses matchea `mesesCubiertos` → override con esos meses en orden (parsing via `SPANISH_MONTHS` map). Si la cantidad no matchea → ignorar el override y usar paso 4.
4. Ordenar meses aplicables por prioridad: `atrasado > pendiente > '' > 'ok'`. Top N.
5. Para cada mes: `pagos[mes] = 'ok'`, `montoPendiente -= cliente.monto`.
6. `fechaCorte = addMonths(fechaCorte, mesesCubiertos)`. Si `fechaCorte` no existe, inicializar a hoy + N meses.
7. **Write en transacción atómica** (`db.runTransaction`):
   - Read cliente
   - Compute diff
   - Update `clientes/{id}` (pagos, montoPendiente, fechaCorte)
   - Write `transferenciaLog/{autoId}` con emailId + parse + score
   - Si falla cualquiera → rollback, throw
8. Return `ApplyResult` con meses aplicados y monto residual.

**Edge cases**:
- `cliente.monto === 0` o undefined → throw, caller routea a inbox con `reason: 'no_monthly_amount'`
- `mesesCubiertos === 0` (monto < cliente.monto) → throw, caller routea a inbox con `reason: 'partial_amount'`
- Transacción falla por concurrency (otro proceso modificó el cliente) → retry 1 vez, si persiste → throw

### `handler.ts`

```typescript
export const transferenciasInbound = onSchedule(
  {
    schedule: 'every 5 minutes',
    timeZone: 'America/Santiago',
    timeoutSeconds: 300,
    memory: '512MiB',
  },
  async () => {
    const db = admin.firestore();

    // 1. Load Gmail API client
    let gmail;
    try {
      gmail = await getGmailClient();
    } catch (err) {
      console.error('[transferenciasInbound] Gmail auth failed:', err);
      await logCriticalError('gmail_auth_failed', String(err));
      return; // Exit early, next run will retry
    }

    // 2. List unprocessed emails
    const emails = await listUnprocessedEmails(gmail);
    if (emails.length === 0) {
      console.log('[transferenciasInbound] No new emails');
      return;
    }
    console.log(`[transferenciasInbound] Processing ${emails.length} emails`);

    let auto = 0, inbox = 0, errors = 0;

    // 3. Process each
    for (const email of emails) {
      try {
        // Idempotency: skip if already logged
        const existing = await db.collection('transferenciaLog')
          .where('emailId', '==', email.messageId)
          .limit(1)
          .get();
        if (!existing.empty) {
          console.log(`[transferenciasInbound] Skipping already-processed email ${email.messageId}`);
          await markEmailProcessed(gmail, email.messageId);
          continue;
        }

        // 3a. Parse (BICE first, LLM fallback)
        let parse: ParseResult | null = parseBice(email);
        if (!parse) {
          parse = await parseLlm(email, process.env.MINIMAX_API_KEY!);
        }

        if (!parse) {
          await writeToInbox(db, email, { reason: 'parse_failed' });
          inbox++;
        } else {
          // 3b. Match
          const match = await matchCliente(parse, db);
          if (match.decision === 'auto' && match.candidates[0]) {
            // 3c. Apply
            await applyTransferencia(
              match.candidates[0].clienteId,
              parse,
              email.messageId,
              db
            );
            auto++;
          } else {
            await writeToInbox(db, email, {
              reason: match.reason,
              parse,
              candidates: match.candidates,
            });
            inbox++;
          }
        }

        // 3d. Mark as processed (remove label)
        await markEmailProcessed(gmail, email.messageId);
      } catch (err) {
        console.error(`[transferenciasInbound] Error processing ${email.messageId}:`, err);
        errors++;
        // Don't mark as processed — retry next run
      }
    }

    // 4. Daily summary log
    await db.collection('notificationLogs').add({
      type: 'transferencias_inbound_summary',
      date: new Date().toISOString().split('T')[0],
      processed: emails.length,
      autoApplied: auto,
      sentToInbox: inbox,
      errors,
      createdAt: admin.firestore.Timestamp.now(),
    });

    // 5. Alert if inbox backlog
    if (inbox > 5) {
      await sendAdminAlert(`${inbox} transferencias sin matchear, revisá /admin/transferencias`);
    }
  }
);
```

**Por qué `onSchedule` y no `onRequest` (webhook)**: Gmail API no es push-native en este setup (sin Pub/Sub). Polling de 5 min es la integración más simple. Latencia es trivial para pagos.

**Gmail client setup** (`getGmailClient`):
- OAuth 2.0 con refresh token (Rosario)
- Scopes: `https://www.googleapis.com/auth/gmail.readonly`, `https://www.googleapis.com/auth/gmail.modify`
- Refresh token en `process.env.GMAIL_REFRESH_TOKEN`
- Client ID + secret en `process.env.GMAIL_CLIENT_ID` / `GMAIL_CLIENT_SECRET`
- `googleapis` npm package (auth via `google-auth-library`)

**Gmail API calls**:
- `listUnprocessedEmails`: `users.messages.list({ userId: 'me', q: 'label:ReviveHogar/Transferencias -label:Procesadas' })`
- `markEmailProcessed`: `users.messages.modify({ id, removeLabelIds: [labelIdTransferencias], addLabelIds: [labelIdProcesadas] })` — resolver label names → IDs via `users.labels.list()` al startup de la función y cachear en memoria (los IDs no cambian)
- Constantes: `LABEL_TRANSFERENCIAS = 'ReviveHogar/Transferencias'`, `LABEL_PROCESADAS = 'ReviveHogar/Procesadas'`

## Data model

### Cambios a `Cliente` (1 línea nueva)

```typescript
// src/types/models.ts + functions/src/types.ts
interface Cliente {
  // ... existing fields
  rut?: string;  // NEW — "12.345.678-9" o "12345678-9"
}
```

**Cómo se popula**: agregar a `sheets/transform.ts` (lee columna "RUT" si existe). Set manual desde admin UI para clientes que no vienen del sheet (futuro PR).

### Nuevas collections

```
transferenciaLog/                          # audit trail, append-only
  {autoId}/
    emailId: string                        # Gmail message id (idempotency key)
    processedAt: Timestamp
    clienteId: string
    clienteNombre: string
    parseSource: 'bice_regex' | 'llm'
    monto: number
    mesesAplicados: string[]               # ['marzo 2026', 'abril 2026']
    score: number
    rut: string | null
    fechaTransferencia: string | null
    comentario: string | null
    resultado: 'applied' | 'partial'

transferenciasSinMatch/                    # inbox, admin resuelve
  {autoId}/
    emailId: string
    receivedAt: Timestamp
    reason: 'parse_failed'
          | 'low_score'
          | 'multiple_candidates'
          | 'no_active_match'
          | 'no_monthly_amount'
          | 'partial_amount'
    parse: ParseResult | null
    candidates: Array<{
      clienteId: string,
      nombre: string,
      score: number,
      reason: string
    }>
    email: {
      from: string,
      subject: string,
      bodyPlain: string,
      bodyHtml: string | null
    }
    status: 'pending' | 'confirmed' | 'rejected' | 'expired'
    resolvedBy: string | null              # userId del admin
    resolvedAt: Timestamp | null
    resolvedAction: 'manual_apply' | 'dismiss' | null
    resolvedClienteId: string | null
```

### Firestore rules (delta)

```javascript
match /transferenciaLog/{logId} {
  allow read: if callerRole() == 'admin';
  allow write: if false;  // Solo Cloud Functions (Admin SDK bypasses rules)
}

match /transferenciasSinMatch/{inboxId} {
  allow read, write: if callerRole() == 'admin';
}
```

### Cleanup (cron mensual)

`transferenciasSinMatch` con `status IN ('confirmed', 'rejected', 'expired')` y `resolvedAt < now - 90d` → delete. Cloud Function scheduled, no Admin UI.

`transferenciaLog` no se borra (audit trail indefinido).

## Error handling

| Falla | Behavior | Recoverable |
|---|---|---|
| Gmail API 401 (token revoked) | Log error crítico, no marca emails, exit early | Sí — Rosario regenera refresh token |
| Gmail API 429 (rate limit) | Backoff exponencial 3 retries, luego exit early | Sí — next run |
| `parseBice` returns null (no es BICE) | Try `parseLlm` | n/a |
| `parseLlm` timeout (>10s) | Catch → inbox `parse_failed` con body raw | Sí — admin marca si era real |
| LLM M3 API down | Catch → inbox `parse_failed` | Sí — admin resuelve |
| 0 candidatos en match | inbox `no_active_match` | Sí — admin crea cliente o desactiva |
| Top score = 70, second = 68 | inbox `multiple_candidates`, ambos en candidates[] | Sí — admin elige |
| `applyTransferencia` falla (DB error) | Email NO marcada procesada | Sí — next run retry |
| `cliente.monto === 0` | inbox `no_monthly_amount` | Sí — admin corrige sheet |
| Monto cubre 1.3 meses | inbox `partial_amount` | Sí — admin ajusta manual |
| Email re-procesada (label reaplica) | Check `transferenciaLog.emailId` → skip | n/a (idempotente) |

**Filosofía**: el email NUNCA se pierde. Cualquier falla → inbox con `reason` específico. Rosario puede revisar y resolver.

### Alerting

- `transferenciasSinMatch` con `status === 'pending'` count > 5 en un día → email a Rosario con link a `/admin/transferencias`.
- Gmail 401 → `notificationLogs` entry con `severity: 'critical'`.

## Setup (fuera del repo, documentado en README)

### 1. OAuth client + refresh token

```bash
# GCP Console → APIs & Services → Credentials → Create OAuth 2.0 Client ID
# Type: Web application
# Authorized redirect URIs: http://localhost:3000/oauth2callback
```

```bash
# Generar refresh token (one-time, loguearse como Rosario)
node scripts/get-gmail-refresh-token.js
# Output: GMAIL_REFRESH_TOKEN=1//0g...
```

Agregar a `functions/.env.revive-hogar` (NO committed, ya está en `.gitignore`):
```
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REFRESH_TOKEN=...
MINIMAX_API_KEY=...
TRANSFERENCIAS_BANCO_WHITELIST=bice.cl
```

### 2. Gmail filter (Rosario, 1 minuto)

Gmail UI → Settings → Filters → Create new filter:
- From: `alertas@bice.cl` (o el remitente real — Rosario confirma)
- Action: Apply label `ReviveHogar/Transferencias`, Skip Inbox, Never mark as important

### 3. MinMax M3 API key

Sign up at MiniMax, generar API key con tier "MiniMax M3" o el más barato disponible. Guardar en env.

## UI (Pagos surface)

### Nueva tab en `/admin/pagos` o página nueva `/admin/transferencias`

**Decisión abierta en plan**: tab dentro de Pagos (más cohesión) vs página nueva (más espacio, scope claro). Spec default: **nueva página `/admin/transferencias`** con 2 vistas:

1. **Pendientes** (default) — lista de `transferenciasSinMatch` con `status: 'pending'`. Por cada una:
   - Email preview (from, subject, body colapsable)
   - Parse result (monto, fecha, RUT)
   - Candidates (top 3) con "Aplicar" / "Dismiss" actions
   - Si "Aplicar" → abre dialog con confirmación de meses a aplicar, mismo flujo que `applyTransferencia` con override manual

2. **Historial** — `transferenciaLog` paginated, con búsqueda por cliente.

**Out of scope del UI** (este PR):
- Bulk actions
- Editar parse manualmente antes de aplicar (puede ser follow-up si Rosario lo pide)
- Resolver `transferenciasSinMatch` antiguos (>30 días pending) sin acción — auto-expire

## Testing

### Unit tests (`functions/src/__tests__/`)

- `parser/bice.test.ts` — 10+ fixtures de emails BICE reales (Rosario aporta 3-5, el resto sintéticos cubriendo edge cases). Asserts: monto normalizado, RUT, fecha ISO, comentario, nombre.
- `parser/llm.test.ts` — 5+ fixtures. Mock de `minimax` API. Verifica: JSON mode invocado, ParseResult shape, null en error/timeout.
- `matcher.test.ts` — 8+ escenarios. Mock de Firestore. Cubre: RUT exacto, monto exacto, ambiguo, 0 candidatos, cliente inactivo.
- `applier.test.ts` — 5+ escenarios. Mock de Firestore. Cubre: 1 mes, 3 meses, comentario con meses, monto parcial, transacción falla.

### Integration test (Firestore emulator)

- `handler.integration.test.ts` — seed 3 clientes (1 matchea perfecto, 1 ambiguo, 0 no matchea), mock Gmail API con 2 emails. Asserts: 1 entry `transferenciaLog`, 1 entry `transferenciasSinMatch`, 1 update a `clientes.pagos`.

### E2E manual (documentado en PR description, no automatizado)

1. Setup Gmail filter (Rosario).
2. Disparar trigger manualmente (`gcloud scheduler jobs run transferenciasInbound`).
3. Mandar email de prueba con formato BICE al buzón.
4. Verificar Firestore: `clientes.pagos` actualizado, `transferenciaLog` entry, `transferenciasSinMatch` vacío.
5. Mandar email ambiguo (sin RUT, monto incorrecto) → verificar `transferenciasSinMatch` populated.

### Coverage target

80%+ en `parser/`, `matcher.ts`, `applier.ts`. `handler.ts` cubierto por integration test.

## What is NOT in scope

- Multi-bank regex parsers (BICE only, LLM fallback para el resto)
- UI de edit-parse-manual antes de aplicar
- Bulk actions en la inbox
- Reversión de transferencias aplicadas (manual vía `markAsPaid` ya existe)
- Notificaciones a clientes (Rosario) cuando entra una transferencia
- Integración con banco directo (Open Finance)
- Webhook público para integración con otros sistemas
- Multi-tenant

## Open questions (to resolve in plan/implementation)

1. **UI placement**: tab en Pagos o página `/admin/transferencias`? Default del spec: página nueva. Confirmar con Rosario.
2. **Cron cleanup frecuencia**: mensual es suficiente? O semanal? (depende de volumen de inbox)
3. **`rut` migration**: clientes existentes no tienen el campo. ¿Backfill desde sheet? O solo clientes nuevos + Rosario completa manual para los que se transfieren?
4. **Levenshtein threshold**: `≤ 2` para nombre fuzzy. ¿OK? O más estricto (≤ 1) para evitar false positives?
5. **Gmail quota**: 1B calls/day. Con polling 5 min = 288 calls/day. Sin problema. Pero documentar en README.
6. **¿Notificación al cliente "recibimos tu pago"?**: hoy no existe. Out of scope, pero anotado como follow-up potencial.

## Dependencies

- `googleapis` npm package (Gmail API client)
- `google-auth-library` (ya instalado en `functions/package.json` si no, agregar)
- MiniMax M3 API access (cuenta de Carlos, tier MiniMax-M3)
- `date-fns` (ya instalado, usado para `addMonths`)
- `firebase-admin` (ya instalado)

## Migration / rollout

1. Merge a master.
2. Setup OAuth client + refresh token (Carlos, ~30 min).
3. Rosario configura Gmail filter (~1 min).
4. Deploy Cloud Function: `firebase deploy --only functions:transferenciasInbound`.
5. Verify con email de prueba manual.
6. Watch inbox por 1 semana, ajustar thresholds si necesario.
7. Anunciar a Rosario: "ahora las transferencias BICE se auto-actualizan, si ves algo en `/admin/transferencias` es porque necesita tu input".

## Success criteria

- [ ] 95%+ de transferencias BICE matcheadas automáticamente (medido post-rollout, 30 días)
- [ ] 0 falsos positivos (cliente marcado como pagado sin haber pagado) — medido via auditoría Rosario
- [ ] Inbox de `transferenciasSinMatch` < 5 entries/semana en estado steady-state
- [ ] Latencia end-to-end (email llega → pago actualizado) < 10 min
- [ ] UI `/admin/transferencias` carga < 2s con 100 inbox entries
