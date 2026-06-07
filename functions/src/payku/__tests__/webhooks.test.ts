function shouldReject(
  storedKey: string | undefined,
  receivedKey: string,
): boolean {
  if (!storedKey) return false; // no stored key = subscription payment, allow through
  return storedKey !== receivedKey;
}

describe('webhook verification_key check', () => {
  it('rejects when stored key differs from received', () => {
    expect(shouldReject('abc123', 'wrongkey')).toBe(true);
  });

  it('accepts when stored key matches received', () => {
    expect(shouldReject('abc123', 'abc123')).toBe(false);
  });

  it('allows through when no stored key (subscription payment)', () => {
    expect(shouldReject(undefined, 'anykey')).toBe(false);
  });

  it('allows through when stored key is empty string (legacy)', () => {
    expect(shouldReject('', 'anykey')).toBe(false);
  });
});
