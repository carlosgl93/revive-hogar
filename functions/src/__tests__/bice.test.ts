import { parseBice } from '../transferencias/parser/bice';
import { Email } from '../transferencias/parser/types';

const makeEmail = (overrides: Partial<Email>): Email => ({
  messageId: 'msg-1',
  from: 'Alertas Banco BICE <alertas@bice.cl>',
  subject: 'Transferencia recibida',
  bodyPlain: 'Ha recibido una transferencia.',
  internalDate: 'Mon, 21 Jun 2026 10:00:00 -0400',
  ...overrides,
});

describe('parseBice', () => {
  it('returns null for non-BICE email', () => {
    const email = makeEmail({ from: 'noreply@otherbank.cl' });
    expect(parseBice(email)).toBeNull();
  });

  it('parses a typical BICE transfer email', () => {
    const email = makeEmail({
      bodyPlain: [
        'Estimado cliente,',
        '',
        'Ha recibido una transferencia de $15.000 de Juan Pérez.',
        'Fecha: 20/06/2026',
        'RUT: 12.345.678-9',
        'Comentario: pago junio',
      ].join('\n'),
    });
    const result = parseBice(email);
    expect(result).not.toBeNull();
    expect(result?.monto).toBe(15000);
    expect(result?.rut).toBe('12.345.678-9');
    expect(result?.fecha).toBe('2026-06-20');
    expect(result?.comentario).toContain('Juan Pérez');
    expect(result?.nombre).toBe('Juan Pérez');
    expect(result?.source).toBe('bice_regex');
  });

  it('parses monto with thousand separator dots', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $1.500.000 de María González.\nRUT: 20.123.456-7',
    });
    const result = parseBice(email);
    expect(result?.monto).toBe(1500000);
  });

  it('parses RUT without dots and lowercase dv', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $10.000.\nRUT: 12345678-k',
    });
    const result = parseBice(email);
    expect(result?.rut).toBe('12.345.678-K');
  });

  it('returns null when monto is missing or invalid', () => {
    const email = makeEmail({
      bodyPlain: 'Ha recibido una transferencia.\nRUT: 12.345.678-9',
    });
    expect(parseBice(email)).toBeNull();
  });

  it('returns null when monto is zero or negative', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $0.\nRUT: 12.345.678-9',
    });
    expect(parseBice(email)).toBeNull();
  });

  it('extracts fecha from "20 de junio de 2026" format', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $5.000 de Ana.\nFecha: 20 de junio de 2026',
    });
    const result = parseBice(email);
    expect(result?.fecha).toBe('2026-06-20');
  });

  it('truncates rawExcerpt to 500 chars', () => {
    const longBody = 'a'.repeat(1000);
    const email = makeEmail({
      bodyPlain: `Transferencia de $5.000 de Ana.\n${longBody}`,
    });
    const result = parseBice(email);
    expect(result?.rawExcerpt.length).toBe(500);
  });

  it('handles empty RUT and fecha gracefully', () => {
    const email = makeEmail({
      bodyPlain: 'Transferencia de $5.000 de Ana.',
    });
    const result = parseBice(email);
    expect(result?.monto).toBe(5000);
    expect(result?.rut).toBeNull();
    expect(result?.fecha).toBeNull();
    expect(result?.nombre).toBe('Ana');
  });
});
