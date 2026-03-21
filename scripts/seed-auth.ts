#!/usr/bin/env tsx
/**
 * Seed the Firebase Auth emulator with a default admin user.
 * Requires the Auth emulator to be running on port 9099.
 * Run: pnpm run seed:auth
 */

const AUTH_EMULATOR_URL = 'http://localhost:9099';
const FAKE_API_KEY = 'fake-api-key';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123456';

async function seedAdminUser() {
  const url = `${AUTH_EMULATOR_URL}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FAKE_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    if (error?.error?.message === 'EMAIL_EXISTS') {
      console.log(`User ${ADMIN_EMAIL} already exists — skipping.`);
      return;
    }
    throw new Error(`Failed to create user: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  console.log(`Created admin user: ${data.email} (uid: ${data.localId})`);
}

seedAdminUser().catch((err) => {
  console.error('Seed failed:', err.message);
  console.error('Make sure the Firebase Auth emulator is running on port 9099.');
  process.exit(1);
});
