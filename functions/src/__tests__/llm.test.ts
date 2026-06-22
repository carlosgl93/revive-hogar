import { parseLlm } from '../transferencias/parser/llm';
import { Email } from '../transferencias/parser/types';

const makeEmail = (overrides: Partial<Email>): Email => ({
  messageId: 'msg-1',
  from: 'Alertas Otro Banco <alertas@otrobanco.cl>',
  subject: 'Transferencia',
  bodyPlain: 'Ha recibido una transferencia de $25.000 de Pedro Soto.\nRUT: 15.123.456-7',
  internalDate: 'Mon, 21 Jun 2026 10:00:00 -0400',
  ...overrides,
});

describe('parseLlm', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('parses a valid LLM response into ParseResult', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              esTransferencia: true,
              monto: 25000,
              rut: '15.123.456-7',
              fecha: '2026-06-20',
              comentario: 'Transferencia de Pedro Soto',
              nombre: 'Pedro Soto',
            }),
          },
        }],
      }),
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).not.toBeNull();
    expect(result?.monto).toBe(25000);
    expect(result?.rut).toBe('15.123.456-7');
    expect(result?.source).toBe('llm');
  });

  it('returns null when LLM says esTransferencia=false', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              esTransferencia: false,
              monto: null, rut: null, fecha: null, comentario: null, nombre: null,
            }),
          },
        }],
      }),
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });

  it('returns null on HTTP error', async () => {
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    global.fetch = jest.fn(async () => {
      throw new Error('Network down');
    }) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });

  it('returns null when LLM response is invalid JSON', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{ message: { content: 'not json' } }],
      }),
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });

  it('returns null when monto is missing or zero', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              esTransferencia: true,
              monto: 0,
              rut: null, fecha: null, comentario: null, nombre: null,
            }),
          },
        }],
      }),
    })) as any;

    const result = await parseLlm(makeEmail({}), 'test-api-key');
    expect(result).toBeNull();
  });
});