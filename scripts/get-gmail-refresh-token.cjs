/**
 * One-time setup script: get a Gmail OAuth refresh token for Rosario.
 *
 * Usage:
 *   1. Create OAuth 2.0 Client ID in GCP Console (type: Web application)
 *   2. Add http://localhost:3000/oauth2callback as authorized redirect URI
 *   3. Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET env vars in your shell
 *      (or in functions/.env.revive-hogar and `set -a; source` it)
 *   4. Run: node scripts/get-gmail-refresh-token.cjs
 *   5. Browser opens; log in as Rosario; grant permissions
 *   6. Script prints GMAIL_REFRESH_TOKEN
 *   7. Add to functions/.env.revive-hogar
 */
const http = require('http');
const { google } = require('googleapis');
const url = require('url');
let open;
try {
  open = require('open');
} catch (e) {
  open = null;
}

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
];

const clientId = process.env.GMAIL_CLIENT_ID;
const clientSecret = process.env.GMAIL_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error('GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET must be set in env');
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
  if (open) {
    try {
      await open(authorizeUrl);
    } catch (err) {
      console.log('Could not open browser automatically. Open manually:', authorizeUrl);
    }
  } else {
    console.log('Install `open` (pnpm add -D open) to auto-open. Open manually:', authorizeUrl);
  }
});
