#!/usr/bin/env bash
# Seed dummy pesaje data into the Firestore emulator
# Usage: bash scripts/seed-pesajes.sh
# Requires: curl, emulator running on localhost:8080

set -euo pipefail

PROJECT_ID="revive-hogar"
BASE_URL="http://localhost:8080/v1/projects/${PROJECT_ID}/databases/(default)/documents/pesajes"

CHOFERS=(
  '{"uid":"chofer-uid-1","nombre":"Carlos Gonzalez"}'
  '{"uid":"chofer-uid-2","nombre":"Pedro Ramirez"}'
)
RUTA_IDS=("Lunes" "Martes" "Miercoles" "Jueves" "Viernes")

# Generate a record: seed_record <fecha> <chofer_idx> <ruta_idx>
seed_record() {
  local fecha="$1"
  local chofer_idx="$2"
  local ruta_idx="$3"

  local chofer_uid
  local chofer_nombre
  local ruta_id="${RUTA_IDS[$ruta_idx]}"

  if [ "$chofer_idx" -eq 0 ]; then
    chofer_uid="chofer-uid-1"
    chofer_nombre="Carlos Gonzalez"
  else
    chofer_uid="chofer-uid-2"
    chofer_nombre="Pedro Ramirez"
  fi

  # Random-ish weights (deterministic based on date string sum)
  local v=$(( ( $(echo -n "$fecha$chofer_uid" | wc -c) * 17 + 12 ) % 80 + 20 ))
  local cp=$(( ( $(echo -n "$fecha$ruta_id" | wc -c) * 13 + 8 ) % 60 + 15 ))
  local pet=$(( ( $(echo -n "$ruta_id$chofer_uid" | wc -c) * 7 + 5 ) % 30 + 5 ))
  local latas=$(( ( $(echo -n "$fecha$chofer_nombre" | wc -c) * 11 + 3 ) % 20 + 2 ))
  # Add decimal tenths
  local v_dec="${v}.$(( v % 10 ))"
  local cp_dec="${cp}.$(( cp % 10 ))"
  local pet_dec="${pet}.$(( pet % 10 ))"
  local latas_dec="${latas}.$(( latas % 10 ))"
  local total
  total=$(echo "$v_dec + $cp_dec + $pet_dec + $latas_dec" | bc)

  local created_at="${fecha}T10:30:00.000Z"

  local payload
  payload=$(cat <<JSON
{
  "fields": {
    "fecha":        { "stringValue": "${fecha}" },
    "choferUid":    { "stringValue": "${chofer_uid}" },
    "choferNombre": { "stringValue": "${chofer_nombre}" },
    "rutaId":       { "stringValue": "${ruta_id}" },
    "vidrio":       { "doubleValue": ${v_dec} },
    "cartonPapel":  { "doubleValue": ${cp_dec} },
    "pet":          { "doubleValue": ${pet_dec} },
    "latas":        { "doubleValue": ${latas_dec} },
    "totalKg":      { "doubleValue": ${total} },
    "createdAt":    { "stringValue": "${created_at}" }
  }
}
JSON
)

  curl -s -X POST "$BASE_URL" \
    -H "Content-Type: application/json" \
    -d "$payload" > /dev/null

  echo "  ✓ ${fecha} — ${chofer_nombre} — ${ruta_id} (total: ${total} kg)"
}

echo "Seeding pesaje data into emulator..."
echo ""

# --- TODAY ---
TODAY="2026-03-29"
echo "=== Today ($TODAY) ==="
seed_record "$TODAY" 0 0   # Carlos, Lunes
seed_record "$TODAY" 1 1   # Pedro, Martes

echo ""
echo "=== This week (Mon–Fri) ==="
# Week of 2026-03-23 (Monday) to 2026-03-27 (Friday)
WEEK_DATES=("2026-03-23" "2026-03-24" "2026-03-25" "2026-03-26" "2026-03-27")
for i in "${!WEEK_DATES[@]}"; do
  seed_record "${WEEK_DATES[$i]}" 0 "$i"
  seed_record "${WEEK_DATES[$i]}" 1 "$(( (i + 1) % 5 ))"
done

echo ""
echo "=== Earlier in March (full month coverage) ==="
MARCH_DATES=("2026-03-02" "2026-03-03" "2026-03-04" "2026-03-05" "2026-03-06"
             "2026-03-09" "2026-03-10" "2026-03-11" "2026-03-12" "2026-03-13"
             "2026-03-16" "2026-03-17" "2026-03-18" "2026-03-19" "2026-03-20")
for i in "${!MARCH_DATES[@]}"; do
  seed_record "${MARCH_DATES[$i]}" "$(( i % 2 ))" "$(( i % 5 ))"
done

echo ""
echo "Done. $(( 2 + 10 + 15 )) records inserted."
