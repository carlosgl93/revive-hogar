jest.mock('firebase-admin', () => ({ apps: [], initializeApp: jest.fn(), firestore: jest.fn() }));
jest.mock('firebase-functions/v2/https', () => ({ onRequest: jest.fn() }));
jest.mock('cors', () => jest.fn(() => jest.fn()));

import { validateAmount } from '../handlers';

describe('validateAmount', () => {
  it('accepts positive integer', () => expect(validateAmount(5000)).toBeNull());
  it('rejects zero', () => expect(validateAmount(0)).toBeTruthy());
  it('rejects negative', () => expect(validateAmount(-100)).toBeTruthy());
  it('rejects string', () => expect(validateAmount('abc')).toBeTruthy());
  it('rejects NaN', () => expect(validateAmount(NaN)).toBeTruthy());
  it('rejects Infinity', () => expect(validateAmount(Infinity)).toBeTruthy());
});
