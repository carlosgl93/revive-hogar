# AGENTS.md — Revive Hogar

Guidelines for AI agents working on this codebase.

---

## Project Purpose

Admin platform for a Chilean recycling service. The core job is helping staff answer:

1. **Who has paid this month?**
2. **How much has each customer paid (historically)?**
3. **Is this customer up to date?**

Every change should be evaluated against these three questions. If a change doesn't serve one of them (or the operational plumbing that enables them), question whether it's needed.

---

## Repository Layout

```
src/
  api/              — axios wrappers for Cloud Functions
  components/       — shared UI (AuthGuard, Loading)
  config/plans.ts   — Payku plan IDs and prices (source of truth)
  firebase/         — Firestore hooks (useClients, useAuth, useUpdateClient)
  pages/admin/
    Pagos/          — main dashboard (KPIs, clients, subscriptions, Payku customers)
    HistorialPagos/ — historic payment reconciliation
    Importar/       — Google Sheets import
    Transferencias/ — admin inbox + history (/admin/transferencias)
  types/
    models.ts       — Cliente, PaymentStatus, PlanType
    payku.ts        — Payku API response types
  utils/
    kpis.ts         — dashboard metric calculations
    whatsapp.ts     — payment reminder message builder

functions/src/
  index.ts          — exports all Cloud Functions
  middleware.ts     — Firebase token verification
  payku/
    client.ts       — Payku Axios instance with HMAC-SHA256 signing
    handlers.ts     — 25 HTTP handlers (all require auth)
    webhooks.ts     — 2 public webhook handlers (no auth)
    types.ts        — Payku webhook payload types
  sheets/
    client.ts       — Google Sheets reader (service account auth)
    handlers.ts     — importFromSheets ETL handler
    transform.ts    — sheet row → Cliente transformer
  transferencias/          — email inbound for bank transfers
    parser/                — bice.ts (regex) + llm.ts (M3 fallback)
    matcher.ts             — score-based client matching
    applier.ts             — apply match to Firestore (transactional)
    gmail.ts               — Gmail API client (OAuth + label resolution)
    handler.ts             — onSchedule orchestrator
    inboxActions.ts        — admin callable to resolve inbox
    cleanup.ts             — monthly cleanup of resolved entries
```

---

## Key Data Concepts

### `pagos` map on a `Cliente`

```typescript
pagos: Record<string, "ok" | "pendiente" | "atrasado" | "">
// Keys are "mes año" in Spanish lowercase: "enero 2026", "marzo 2026"
// This is the primary way to answer "is this customer up to date?"
```

**How it gets populated:**
- Webhook `webhookPaymentCharge` → automatic (Payku subscriptions)
- `useUpdateClient().markAsPaid()` → manual (bank transfers)
- `importFromSheets` → bulk import from Google Sheets

### Payment type determines data source

| `tipoPago` | Payment source | `pagos` updated by |
|---|---|---|
| `Suscripcion` | Payku auto-billing | Webhook |
| `Transferencia` | Manual bank transfer | Admin marks paid |
| `Boton de pago` | One-time Payku link | Webhook / manual |
| `Suspendida` | Paused | N/A |

### `userHistoricPayments` vs `clientes.pagos`

- `clientes.pagos` = current month tracking, admin-facing
- `userHistoricPayments` = historical archive synced from Payku, used for reconciliation in `/admin/historial`
- These two are **not automatically reconciled** — see Known Gaps

---

## Authentication

- All frontend routes under `/admin` are protected by `AuthGuard`
- All Cloud Functions (except webhooks) require a Firebase ID token
- Token is injected automatically via `src/api/axiosInstance.ts` interceptor
- Webhooks (`/webhookSubscriptionActivation`, `/webhookPaymentCharge`) are **public** — no auth

---

## Payku API

- Base URL: `https://app.payku.cl/api`
- Auth: `Authorization: Bearer PUBLIC_TOKEN` + HMAC-SHA256 signature header
- Signature: `SHA256(requestPath + body + PRIVATE_TOKEN)`
- See `functions/src/payku/client.ts` for implementation
- See `payku/api-docs.md` for the full API reference

---

## Transferencias auto-sync

`clientes.tipoPago === 'Transferencia'` is auto-detected from bank notification emails. See `docs/superpowers/specs/2026-06-21-transferencias-auto-sync-design.md` for the full design.

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
1. Create OAuth 2.0 client in GCP Console, run `node scripts/get-gmail-refresh-token.cjs`
2. Add 3 env vars to `functions/.env.revive-hogar`: `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `MINIMAX_API_KEY`
3. Rosario creates Gmail filter for `ReviveHogar/Transferencias` label
4. Rosario configures bank notifications to forward to her Gmail

**Out of scope (deferred):**
- Multi-bank regex parsers (BICE only)
- SMTP2GO inbound (rejected — no custom domain)
- Notification to client "received your payment"
- Direct bank API integration
- Gmail label mutation (T19 follow-up — currently processed emails stay in Transferencias label; idempotency check prevents double-apply)

---

## Making Changes

### Adding a new KPI to the dashboard

1. Calculate in `src/utils/kpis.ts`
2. Add to the `DashboardKPIs` type in `src/types/models.ts` if new
3. Render in `src/pages/admin/Pagos/Dashboard.tsx`

### Adding a new Cloud Function

1. Write handler in `functions/src/payku/handlers.ts` or a new file
2. Export from `functions/src/index.ts`
3. Add axios wrapper in `src/api/`
4. All handlers must call `verifyFirebaseToken` (import from `../middleware`)

### Modifying the Firestore data model

- `Cliente` type is defined in both `src/types/models.ts` (frontend) and `functions/src/types.ts` (backend) — keep them in sync
- `importFromSheets` in `functions/src/sheets/transform.ts` is the canonical shape; update it when fields change

### Modifying subscription plans

- Plan IDs are in `src/config/plans.ts` — these are Payku-side IDs, do not change without coordinating with Payku
- Plan prices are also used for KPI income calculations

---

## Known Gaps (priority order)

### 1. No automatic month-status reconciliation
**Problem:** When a Payku payment webhook fires, it updates `pagos` on the matching client found by `paykuSubscriptionId`. But if the subscription ID isn't linked (e.g., manually created clients), the webhook silently does nothing.

**Impact:** Clients with subscriptions can appear as `pendiente` even though Payku charged them.

**Fix needed:** After webhook fires, if no client found by `paykuSubscriptionId`, try matching by `correo` from the Payku customer record.

### 2. Firestore security rules are wide open (partially addressed for transferencias)
**Current:** Any authenticated user can read/write most collections.

**Partially fixed:** `transferenciaLog` (admin-read-only) and `transferenciasSinMatch` (admin-only) now use `callerRole() == 'admin'` from `firestore.rules`. Other collections (`clientes`, `userHistoricPayments`, etc.) still allow any authenticated user.

**Needed:** Lock `clientes` and `userHistoricPayments` to admin role. Webhooks write via Admin SDK (bypasses rules) so that's fine.

### 3. Historic sync is manual and year-by-year
**Problem:** Admin must click "Sync" for each year individually. New payments in the current year aren't reflected until manually synced.

**Fix needed:** Scheduled Cloud Function (e.g., daily cron) to sync the current year's transactions.

### 4. No link between `userHistoricPayments` and `clientes`
**Problem:** Historic payment view and client list are disconnected. You can't easily see a client's full payment history from the Clientes tab.

**Fix needed:** Add a "Ver historial" action on each client row that queries `userHistoricPayments` by email.

### 5. Webhook idempotency
**Problem:** If Payku retries a webhook, `pagos` gets overwritten (which is fine), but `webhookLogs` gets duplicate entries. No deduplication by `transaction_id`.

**Fix needed:** Check `webhookLogs` for existing `transactionId` before writing.

### 6. Missing Firestore indexes
**Problem:** Complex queries (filter by `tipoPago` + `activo` + `plan`) may hit Firestore index limits.

**Fix needed:** Add composite indexes to `firestore.indexes.json` for common filter combinations used in the Clientes tab.

---

## Do Not

- Do not change Payku plan IDs without confirming the plan exists in the Payku dashboard
- Do not deploy functions without running `npm run build` in `functions/` first
- Do not add new fields to `Cliente` without updating both `src/types/models.ts` and `functions/src/types.ts`
- Do not make webhooks require auth — Payku cannot send a Firebase token
- Do not use `firebase deploy` directly in development — use `pnpm run emulators` locally
