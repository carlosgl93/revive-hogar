import nock from 'nock';
import http from 'node:http';
import https from 'node:https';

import { createGmailClient } from '../transferencias/gmail';

// Custom HTTP adapter that uses node:http/https so nock can intercept.
// Bypasses gaxios's dynamic import of undici which fails under jest's VM.
function nodeHttpAdapter<T = unknown>(
  opts: any,
  _defaultAdapter: (opts: any) => Promise<T>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const u = new URL(opts.url);
    const lib = u.protocol === 'https:' ? https : http;
    const body =
      opts.body == null
        ? undefined
        : typeof opts.body === 'string'
          ? opts.body
          : opts.body instanceof URLSearchParams
            ? opts.body.toString()
            : Buffer.isBuffer(opts.body) || opts.body instanceof Uint8Array
              ? Buffer.from(opts.body).toString('utf8')
              : typeof opts.body === 'object'
                ? JSON.stringify(opts.body)
                : String(opts.body);

    const headers: Record<string, string> = { ...(opts.headers || {}) };
    if (body && !headers['content-length'] && !headers['Content-Length']) {
      headers['Content-Length'] = Buffer.byteLength(body).toString();
    }

    const req = lib.request(
      {
        method: opts.method || 'GET',
        hostname: u.hostname,
        port: u.port || (u.protocol === 'https:' ? 443 : 80),
        path: u.pathname + u.search,
        headers,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString('utf8');
          const ct = String(res.headers['content-type'] || '').toLowerCase();
          const data: any = ct.includes('application/json') ? JSON.parse(raw) : raw;
          const response: any = {
            status: res.statusCode,
            statusText: res.statusMessage || '',
            headers: res.headers,
            data,
            config: opts,
            request: { responseURL: opts.url },
          };
          resolve(response as T);
        });
      },
    );
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

describe('GmailClient', () => {
  const email = 'rosario@gmail.com';
  const refreshToken = 'fake-refresh-token';
  const clientId = 'test-client-id';
  const clientSecret = 'test-client-secret';

  beforeEach(() => {
    nock.cleanAll();
  });

  it('listMessages returns ids + threadIds when labelId is provided', async () => {
    nock('https://oauth2.googleapis.com')
      .post('/token')
      .reply(200, { access_token: 'fake-access-token', expires_in: 3600 });

    nock('https://gmail.googleapis.com')
      .get('/gmail/v1/users/me/messages')
      .query((q: any) => q.labelIds === 'Label_1' && q.maxResults === '50')
      .reply(200, {
        messages: [
          { id: 'msg-1', threadId: 't-1' },
          { id: 'msg-2', threadId: 't-2' },
        ],
        nextPageToken: undefined,
      });

    const client = createGmailClient({ email, refreshToken, clientId, clientSecret, adapter: nodeHttpAdapter });
    const result = await client.listMessagesByLabel('Label_1', 50);

    expect(result.messages).toHaveLength(2);
    expect(result.messages[0].id).toBe('msg-1');
    expect(result.messages[1].id).toBe('msg-2');
    expect(result.nextPageToken).toBeUndefined();
  });

  it('listMessages paginates via pageToken', async () => {
    nock('https://oauth2.googleapis.com')
      .post('/token')
      .reply(200, { access_token: 'fake-access-token', expires_in: 3600 });

    nock('https://gmail.googleapis.com')
      .get('/gmail/v1/users/me/messages')
      .query((q: any) => q.pageToken === 'page-2')
      .reply(200, {
        messages: [{ id: 'msg-3', threadId: 't-3' }],
      });

    const client = createGmailClient({ email, refreshToken, clientId, clientSecret, adapter: nodeHttpAdapter });
    const result = await client.listMessagesByLabel('Label_1', 50, 'page-2');

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0].id).toBe('msg-3');
  });

  it('getMessage returns parsed message with text/plain body', async () => {
    nock('https://oauth2.googleapis.com')
      .post('/token')
      .reply(200, { access_token: 'fake-access-token', expires_in: 3600 });

    const rawEmail = [
      'From: BICE <notificaciones@bice.cl>',
      'To: rosario@gmail.com',
      'Subject: Transferencia recibida',
      'Date: Mon, 20 Jun 2026 10:00:00 -0300',
      'Content-Type: text/plain; charset=utf-8',
      '',
      'Ha recibido una transferencia de $15.000 de Juan Pérez',
    ].join('\r\n');

    const base64 = Buffer.from(rawEmail).toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    nock('https://gmail.googleapis.com')
      .get('/gmail/v1/users/me/messages/msg-1')
      .query((q: any) => q.format === 'raw')
      .reply(200, { raw: base64 });

    const client = createGmailClient({ email, refreshToken, clientId, clientSecret, adapter: nodeHttpAdapter });
    const msg = await client.getMessage('msg-1');

    expect(msg.id).toBe('msg-1');
    expect(msg.subject).toBe('Transferencia recibida');
    expect(msg.from).toContain('notificaciones@bice.cl');
    expect(msg.bodyText).toContain('transferencia de $15.000');
  });

  it('listLabels finds label by name and returns its id', async () => {
    nock('https://oauth2.googleapis.com')
      .post('/token')
      .reply(200, { access_token: 'fake-access-token', expires_in: 3600 });

    nock('https://gmail.googleapis.com')
      .get('/gmail/v1/users/me/labels')
      .reply(200, {
        labels: [
          { id: 'Label_1', name: 'INBOX' },
          { id: 'Label_42', name: 'ReviveHogar/Transferencias' },
          { id: 'Label_99', name: 'Sent' },
        ],
      });

    const client = createGmailClient({ email, refreshToken, clientId, clientSecret, adapter: nodeHttpAdapter });
    const id = await client.findLabelByName('ReviveHogar/Transferencias');

    expect(id).toBe('Label_42');
  });

  it('findLabelByName returns null when not found', async () => {
    nock('https://oauth2.googleapis.com')
      .post('/token')
      .reply(200, { access_token: 'fake-access-token', expires_in: 3600 });

    nock('https://gmail.googleapis.com')
      .get('/gmail/v1/users/me/labels')
      .reply(200, {
        labels: [{ id: 'Label_1', name: 'INBOX' }],
      });

    const client = createGmailClient({ email, refreshToken, clientId, clientSecret, adapter: nodeHttpAdapter });
    const id = await client.findLabelByName('NonExistent');

    expect(id).toBeNull();
  });
});
