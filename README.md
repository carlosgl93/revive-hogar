# Revive Hogar — Admin Platform

Management platform for a Chilean residential waste recycling and composting service. Handles customer subscriptions, payment tracking, route management, and reconciliation between local records and the Payku payment gateway.

---

## What This Does

Admins can answer three core questions about any customer:

- **Who has paid?** — Dashboard shows clients `al día` vs `deudor` per month
- **How much have they paid?** — Historic payment view aggregates all transactions by customer
- **Are they up to date?** — Each client has a `pagos` map keyed by month (`"marzo 2026": "ok" | "pendiente" | "atrasado"`)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite + MUI + Jotai |
| Backend | Firebase Cloud Functions (Node 20) |
| Database | Firestore |
| Auth | Firebase Authentication |
| Payments | Payku (Chilean gateway) |
| Data Import | Google Sheets API |
| Hosting | Firebase Hosting |

---

## Admin Routes

| Route | Purpose |
|---|---|
| `/admin/login` | Email/password login |
| `/admin/pagos` | Main dashboard: KPIs, clients, subscriptions, Payku customers |
| `/admin/historial` | Historic payment reconciliation |
| `/admin/importar` | One-click Google Sheets import |

---

## Data Model

### `clientes` (Firestore)

Core customer database. Source of truth for local payment tracking.

```
nombre, correo, telefono, movil, direccion, comuna, dia
monto             — monthly billing amount (CLP)
tipoPago          — Suscripcion | Transferencia | Boton de pago | Suspendida | NA | Recuperar
activo            — boolean
plan              — basico | pro-s | pro-l | organico-s | organico-l | curico
paykuSubscriptionId  — link to external Payku subscription
fechaCorte        — next billing date
pagos: {
  "enero 2026": "ok" | "pendiente" | "atrasado" | ""
  "febrero 2026": ...
}
```

### `userHistoricPayments` (Firestore)

Synced from Payku. Keyed by SHA256 hash of normalized address.

```
email, fullName, phone, direccion
totalPayments, lastPaymentDate, syncedYears[]
payments: {
  [orderId]: { amount, createdAt, type, subscriptionId, depositDate }
}
manuallySettled, settledAt, settledBy
```

### `webhookLogs` (Firestore)

Audit trail for incoming Payku webhook events.

---

## Subscription Plans

| Plan | ID | Price |
|---|---|---|
| Básico | `pl416c17c4ba001aeca188` | $12,000/mo |
| Pro S | `pl7c9a9495620a5d6d6491` | $21,000/mo |
| Pro L | `pl32ce962c8dfb5dd62b00` | $25,000/mo |
| Orgánico S | `pl31af7be2ee28fdbb7790` | $15,000/mo |
| Orgánico L | `plea1ba75a0910bccfff97` | $20,000/mo |
| Curicó | `pl16131e9f0254cca9c6da` | $12,000/mo |

---

## Payment Flow

```
New customer
  → Admin creates Payku client + subscription
  → Payku returns card registration URL
  → Customer registers card
  → Payku fires webhookSubscriptionActivation → cliente.activo = true
  → Each month: Payku fires webhookPaymentCharge → pagos["mes año"] = "ok" | "atrasado"

Manual transfer customers
  → Admin marks month as paid manually in Clientes tab
  → pagos["mes año"] = "ok"

Historic sync
  → Admin clicks "Sync" in Historial tab for a given year
  → Cloud Function fetches all transactions from Payku for that year
  → Stored in userHistoricPayments collection
```

---

## Cloud Functions

All functions require Firebase ID token (except webhooks).

| Function | Method | Description |
|---|---|---|
| `listPaykuSubscriptionsV3` | GET | Filtered list (date, status, pagination) |
| `createPaykuSubscription` | POST | Link client to plan |
| `deletePaykuSubscription` | DELETE | Cancel subscription |
| `affiliatePaykuCard` | POST | Register new card for renewal |
| `listPaykuClients` | GET | Paginated Payku customer list |
| `getPaykuClient` | GET | Search by email or ID |
| `syncHistoricPayments` | POST | Sync a year's transactions from Payku |
| `importFromSheets` | POST | ETL: Google Sheets → Firestore |
| `webhookSubscriptionActivation` | POST | Public — Payku callback |
| `webhookPaymentCharge` | POST | Public — Payku callback |

---

## Environment Variables

### Frontend (`.env`)

```env
VITE_ENV=dev
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_FIREBASE_FUNCTIONS_URL=http://127.0.0.1:5001/revive-hogar/us-central1
```

### Cloud Functions (`functions/.env`)

```env
SHEETS_SHEET_NAME=Total consolidado

# Transferencias auto-sync (Gmail API)
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REFRESH_TOKEN=

# MiniMax M3 (LLM fallback for non-BICE banks)
MINIMAX_API_KEY=

TRANSFERENCIAS_BANCO_WHITELIST=bice.cl
```

Secrets (via Firebase Secrets Manager):
- `PAYKU_PUBLIC_TOKEN`
- `PAYKU_PRIVATE_TOKEN`
- `SHEETS_SPREADSHEET_ID`

---

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
node scripts/get-gmail-refresh-token.cjs
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
   - From: `alertas@bice.cl` (or BICE's actual sender)
   - Apply label `ReviveHogar/Transferencias`
   - Skip Inbox
   - Never mark as important

### 5. Deploy

```bash
firebase deploy --only functions:transferenciasInbound,functions:transferenciasCleanup,functions:resolveTransferenciaInbox
```

### 6. Verify

Send a test email matching the BICE format to Rosario's Gmail. Within 5 minutes, the cliente's `pagos[mes]` should be `'ok'` and `montoPendiente` decremented. Check `/admin/transferencias` for the audit entry.

**Known limitation:** Processed emails stay in the `ReviveHogar/Transferencias` label instead of moving to `ReviveHogar/Procesadas` (GmailClient label mutation deferred to T19). Idempotency check on `transferenciaLog` prevents double-application.

---

## Local Development

```bash
# Install dependencies
pnpm install
cd functions && npm install && cd ..

# Start emulators (with saved data)
pnpm run emulators

# Start frontend dev server
pnpm run dev

# Fresh emulators (no data)
pnpm run emulators:fresh
```

---

## Deploy

```bash
# Full deploy (hosting + functions + rules)
node scripts/deploy.js

# Functions only
cd functions && npm run deploy
```

The deploy script swaps `VITE_ENV=production` and the production functions URL, builds, deploys, then restores the dev `.env`.

---

## Google Sheets Import Format

The sheet must have a header row with these columns (case-insensitive):

```
nombre | correo | telefono | movil | direccion | comuna | dia | monto | tipo de pago | enero 2025 | febrero 2025 | ...
```

Month columns are auto-detected by regex. Cell values map to:
- `ok` / any amount > 0 → `"ok"`
- `atrasado` → `"atrasado"`
- `pendiente` → `"pendiente"`
- empty → `""`

Upsert key: `(correo + direccion)` combination.
