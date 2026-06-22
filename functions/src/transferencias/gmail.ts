import { google } from 'googleapis';

export interface GmailConfig {
  email: string;
  refreshToken: string;
  /** Optional: override OAuth client config (for tests). */
  clientId?: string;
  clientSecret?: string;
  /** Optional: custom HTTP adapter (gaxios adapter). For tests to bypass dynamic imports. */
  adapter?: <T = any>(opts: unknown, defaultAdapter: (opts: unknown) => Promise<T>) => Promise<T>;
}

export interface GmailMessage {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  bodyText: string;
  bodyHtml?: string;
}

export interface ListMessagesResult {
  messages: Array<{ id: string; threadId: string }>;
  nextPageToken?: string;
}

export interface GmailClient {
  listMessagesByLabel(labelId: string, maxResults?: number, pageToken?: string): Promise<ListMessagesResult>;
  getMessage(id: string): Promise<GmailMessage>;
  findLabelByName(name: string): Promise<string | null>;
}

function decodeBase64Url(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const remainder = padded.length % 4;
  const full = remainder === 0 ? padded : padded + '='.repeat(4 - remainder);
  return Buffer.from(full, 'base64').toString('utf8');
}

function parseRawEmail(raw: string): { subject: string; from: string; to: string; date: string; bodyText: string; bodyHtml?: string } {
  // Split headers from body at first blank line
  const sep = raw.indexOf('\r\n\r\n') >= 0 ? '\r\n\r\n' : '\n\n';
  const splitIdx = raw.indexOf(sep);
  const headerPart = splitIdx >= 0 ? raw.slice(0, splitIdx) : raw;
  const bodyPart = splitIdx >= 0 ? raw.slice(splitIdx + sep.length) : '';

  const headers: Record<string, string> = {};
  for (const line of headerPart.split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx < 0) continue;
    const key = line.slice(0, colonIdx).trim().toLowerCase();
    const value = line.slice(colonIdx + 1).trim();
    headers[key] = value;
  }

  const isHtml = (headers['content-type'] || '').toLowerCase().includes('text/html');
  return {
    subject: headers['subject'] || '',
    from: headers['from'] || '',
    to: headers['to'] || '',
    date: headers['date'] || '',
    bodyText: isHtml ? '' : bodyPart,
    bodyHtml: isHtml ? bodyPart : undefined,
  };
}

export function createGmailClient(config: GmailConfig): GmailClient {
  const clientId = config.clientId || process.env.GMAIL_CLIENT_ID || '';
  const clientSecret = config.clientSecret || process.env.GMAIL_CLIENT_SECRET || '';

  if (!clientId || !clientSecret) {
    throw new Error('gmail_oauth_config_missing');
  }

  const oauth2Client = new google.auth.OAuth2({
    clientId,
    clientSecret,
    ...(config.adapter
      ? { transporterOptions: { adapter: config.adapter as unknown as never } }
      : {}),
  });
  oauth2Client.setCredentials({ refresh_token: config.refreshToken });

  const gmailOptions: { version: string; auth: typeof oauth2Client; adapter?: unknown } = {
    version: 'v1',
    auth: oauth2Client,
  };
  if (config.adapter) gmailOptions.adapter = config.adapter;
  const gmail = google.gmail(gmailOptions as Parameters<typeof google.gmail>[0]);

  return {
    async listMessagesByLabel(labelId: string, maxResults = 50, pageToken?: string) {
      const res = await gmail.users.messages.list({
        userId: 'me',
        labelIds: [labelId],
        maxResults,
        pageToken,
      });
      const messages = (res.data.messages || []).map((m) => ({
        id: m.id!,
        threadId: m.threadId!,
      }));
      return {
        messages,
        nextPageToken: res.data.nextPageToken ?? undefined,
      };
    },

    async getMessage(id: string): Promise<GmailMessage> {
      const res = await gmail.users.messages.get({
        userId: 'me',
        id,
        format: 'raw',
      });
      const raw = res.data.raw;
      if (!raw) throw new Error('gmail_no_raw_payload');
      const decoded = decodeBase64Url(raw);
      const parsed = parseRawEmail(decoded);
      return {
        id,
        threadId: res.data.threadId || '',
        ...parsed,
      };
    },

    async findLabelByName(name: string): Promise<string | null> {
      const res = await gmail.users.labels.list({ userId: 'me' });
      const labels = res.data.labels || [];
      const match = labels.find((l) => l.name === name);
      return match?.id || null;
    },
  };
}
