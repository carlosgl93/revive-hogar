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
```

Secrets (via Firebase Secrets Manager):
- `PAYKU_PUBLIC_TOKEN`
- `PAYKU_PRIVATE_TOKEN`
- `SHEETS_SPREADSHEET_ID`

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
