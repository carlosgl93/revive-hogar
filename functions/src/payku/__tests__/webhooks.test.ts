jest.mock('firebase-admin', () => ({
  apps: [],
  initializeApp: jest.fn(),
  firestore: jest.fn(),
}));
jest.mock('firebase-functions/v2/https', () => ({
  onRequest: jest.fn(),
}));

import { shouldRejectWebhook } from '../webhooks';

describe('webhook verification_key check', () => {
  it('rejects when stored key differs from received', () => {
    expect(shouldRejectWebhook('abc123', 'wrongkey')).toBe(true);
  });

  it('accepts when stored key matches received', () => {
    expect(shouldRejectWebhook('abc123', 'abc123')).toBe(false);
  });

  it('allows through when no stored key (subscription payment)', () => {
    expect(shouldRejectWebhook(undefined, 'anykey')).toBe(false);
  });

  it('allows through when stored key is empty string (legacy)', () => {
    expect(shouldRejectWebhook('', 'anykey')).toBe(false);
  });
});
