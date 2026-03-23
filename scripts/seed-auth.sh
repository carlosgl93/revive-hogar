#!/bin/sh
# Seed the Firebase Auth emulator with default admin and chofer users.
# Also creates corresponding Firestore documents in the 'usuarios' collection.
# Requires emulators to be running (Auth on 9099, Firestore on 8080).

AUTH_EMULATOR_URL="http://localhost:9099"
FIRESTORE_EMULATOR_URL="http://localhost:8080"
FAKE_API_KEY="fake-api-key"
PROJECT_ID="revive-hogar"

create_user() {
  EMAIL="$1"
  PASSWORD="$2"
  NOMBRE="$3"
  ROLE="$4"

  URL="${AUTH_EMULATOR_URL}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FAKE_API_KEY}"

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASSWORD}\",\"returnSecureToken\":true}")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  if [ "$HTTP_CODE" != "200" ]; then
    MESSAGE=$(echo "$BODY" | grep -o '"message": *"[^"]*"' | head -1 | sed 's/"message": *"//;s/"//')
    if [ "$MESSAGE" = "EMAIL_EXISTS" ]; then
      echo "User ${EMAIL} already exists — signing in to get UID..."
      SIGN_IN_URL="${AUTH_EMULATOR_URL}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FAKE_API_KEY}"
      SI_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$SIGN_IN_URL" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASSWORD}\",\"returnSecureToken\":true}")
      SI_CODE=$(echo "$SI_RESPONSE" | tail -n1)
      SI_BODY=$(echo "$SI_RESPONSE" | sed '$d')
      if [ "$SI_CODE" != "200" ]; then
        echo "Failed to sign in as ${EMAIL}: $SI_BODY"
        return 1
      fi
      USER_UID=$(echo "$SI_BODY" | grep -o '"localId": *"[^"]*"' | sed 's/"localId": *"//;s/"//')
      ID_TOKEN=$(echo "$SI_BODY" | grep -o '"idToken": *"[^"]*"' | sed 's/"idToken": *"//;s/"//')
      echo "  Signed in as ${EMAIL} (uid: ${USER_UID})"
    else
      echo "Failed to create user ${EMAIL}: $BODY"
      return 1
    fi
  else
    USER_UID=$(echo "$BODY" | grep -o '"localId": *"[^"]*"' | sed 's/"localId": *"//;s/"//')
    ID_TOKEN=$(echo "$BODY" | grep -o '"idToken": *"[^"]*"' | sed 's/"idToken": *"//;s/"//')
    echo "Created ${ROLE} user: ${EMAIL} (uid: ${USER_UID})"
  fi

  # Create/update Firestore document in 'usuarios' collection (PATCH = upsert)
  FIRESTORE_URL="${FIRESTORE_EMULATOR_URL}/v1/projects/${PROJECT_ID}/databases/(default)/documents/usuarios/${USER_UID}"

  FS_RESPONSE=$(curl -s -w "\n%{http_code}" -X PATCH "$FIRESTORE_URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${ID_TOKEN}" \
    -d "{
      \"fields\": {
        \"uid\": {\"stringValue\": \"${USER_UID}\"},
        \"email\": {\"stringValue\": \"${EMAIL}\"},
        \"nombre\": {\"stringValue\": \"${NOMBRE}\"},
        \"role\": {\"stringValue\": \"${ROLE}\"},
        \"activo\": {\"booleanValue\": true},
        \"createdAt\": {\"stringValue\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}
      }
    }")

  FS_CODE=$(echo "$FS_RESPONSE" | tail -n1)
  if [ "$FS_CODE" = "200" ]; then
    echo "  -> Firestore 'usuarios/${USER_UID}' document created/updated"
  else
    echo "  -> FAILED to write Firestore doc (HTTP ${FS_CODE}):"
    echo "$FS_RESPONSE" | sed '$d'
  fi
}

echo "Seeding users..."
echo ""

create_user "admin@gmail.com" "123456" "Admin" "admin"
echo ""
create_user "chofer@gmail.com" "123456" "Chofer Demo" "chofer"
echo ""

echo "Done. Users seeded."
echo "  Admin:  admin@gmail.com / 123456"
echo "  Chofer: chofer@gmail.com / 123456"
