#!/bin/sh
# Seed the Firebase Auth emulator with a default admin user.
# Requires the Auth emulator to be running on port 9099.

AUTH_EMULATOR_URL="http://localhost:9099"
FAKE_API_KEY="fake-api-key"
ADMIN_EMAIL="admin@gmail.com"
ADMIN_PASSWORD="123456"

URL="${AUTH_EMULATOR_URL}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FAKE_API_KEY}"

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${ADMIN_EMAIL}\",\"password\":\"${ADMIN_PASSWORD}\",\"returnSecureToken\":true}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" != "200" ]; then
  MESSAGE=$(echo "$BODY" | grep -o '"message":"[^"]*"' | head -1 | sed 's/"message":"//;s/"//')
  if [ "$MESSAGE" = "EMAIL_EXISTS" ]; then
    echo "User ${ADMIN_EMAIL} already exists — skipping."
    exit 0
  fi
  echo "Failed to create user: $BODY"
  echo "Make sure the Firebase Auth emulator is running on port 9099."
  exit 1
fi

EMAIL=$(echo "$BODY" | grep -o '"email":"[^"]*"' | sed 's/"email":"//;s/"//')
UID=$(echo "$BODY" | grep -o '"localId":"[^"]*"' | sed 's/"localId":"//;s/"//')
echo "Created admin user: ${EMAIL} (uid: ${UID})"
