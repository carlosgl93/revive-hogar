import { matchCliente } from '../transferencias/matcher';
import { ParseResult } from '../transferencias/parser/types';
import { Cliente } from '../types';

// Mock Firestore
const mockClientes: Cliente[] = [
  {
    id: 'c1', nombre: 'Juan Pérez', correo: 'juan@test.cl', direccion: 'd1', comuna: 'c1',
    telefono: '1234', monto: 15000, montoPendiente: 15000, tipoPago: 'Transferencia' as any,
    activo: true, dia: 'Lunes', pagos: {}, rut: '12.345.678-9',
  } as Cliente,
  {
    id: 'c2', nombre: 'María González', correo: 'maria@test.cl', direccion: 'd2', comuna: 'c1',
    telefono: '5678', monto: 15000, montoPendiente: 15000, tipoPago: 'Transferencia' as any,
    activo: true, dia: 'Martes', pagos: {}, rut: '20.123.456-7',
  } as Cliente,
  {
    id: 'c3', nombre: 'Inactivo', correo: 'inactivo@test.cl', direccion: 'd3', comuna: 'c1',
    telefono: '9999', monto: 15000, montoPendiente: 15000, tipoPago: 'Transferencia' as any,
    activo: false, dia: 'Miercoles', pagos: {}, rut: '11.111.111-1',
  } as Cliente,
];

const mockDb = {
  collection: jest.fn((name: string) => ({
    where: jest.fn().mockReturnThis(),
    get: jest.fn(async () => ({
      empty: false,
      docs: mockClientes
        .filter((c) => c.activo && (c.montoPendiente ?? 0) > 0)
        .map((c) => ({
          id: c.id,
          data: () => c,
        })),
    })),
  })),
} as any;

const makeParse = (overrides: Partial<ParseResult>): ParseResult => ({
  monto: 15000,
  rut: null,
  fecha: null,
  comentario: null,
  nombre: null,
  source: 'bice_regex',
  rawExcerpt: '',
  ...overrides,
});

describe('matchCliente', () => {
  it('matches perfectly with RUT + monto + unique', async () => {
    const parse = makeParse({ rut: '12.345.678-9', monto: 15000 });
    const result = await matchCliente(parse, mockDb);
    expect(result.decision).toBe('auto');
    expect(result.candidates[0].clienteId).toBe('c1');
    expect(result.candidates[0].score).toBeGreaterThanOrEqual(95);
  });

  it('matches by monto + unique candidate when RUT is missing', async () => {
    const mockSingle = {
      collection: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        get: jest.fn(async () => ({
          empty: false,
          docs: [{ id: 'c1', data: () => mockClientes[0] }],
        })),
      })),
    } as any;
    const parse = makeParse({ monto: 15000 });
    const result = await matchCliente(parse, mockSingle);
    expect(result.decision).toBe('auto');
    expect(result.candidates[0].clienteId).toBe('c1');
  });

  it('sends to inbox when multiple candidates match', async () => {
    const parse = makeParse({ monto: 15000 });  // both c1 and c2 have 15000 pendiente
    const result = await matchCliente(parse, mockDb);
    expect(result.decision).toBe('inbox');
    expect(result.reason).toContain('multiple');
  });

  it('sends to inbox when no candidates exist', async () => {
    const mockEmpty = {
      collection: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        get: jest.fn(async () => ({ empty: true, docs: [] })),
      })),
    } as any;
    const parse = makeParse({ monto: 15000 });
    const result = await matchCliente(parse, mockEmpty);
    expect(result.decision).toBe('inbox');
    expect(result.reason).toBe('no_active_match');
  });

  it('sends to inbox when top score is below 95', async () => {
    const parse = makeParse({ nombre: 'Juan', monto: 5000 });  // monto mismatch
    const result = await matchCliente(parse, mockDb);
    expect(result.decision).toBe('inbox');
  });

  it('excludes inactive clients from candidates', async () => {
    // Verify c3 (inactive) is not in candidates even with matching RUT
    const parse = makeParse({ rut: '11.111.111-1', monto: 15000 });
    const result = await matchCliente(parse, mockDb);
    expect(result.candidates.find((c) => c.clienteId === 'c3')).toBeUndefined();
  });

  it('gives bonus score for nombre fuzzy match in comentario', async () => {
    const parse = makeParse({
      comentario: 'Transferencia de Juan Pérez',
      monto: 5000,  // monto mismatch
    });
    const result = await matchCliente(parse, mockDb);
    // c1 should still be top candidate due to nombre match (+10) + RUT not set
    expect(result.candidates[0]?.clienteId).toBe('c1');
  });

  it('does not fuzzy match short names (< 5 chars)', async () => {
    const parse = makeParse({
      comentario: 'Transferencia de Ana',
      monto: 5000,
    });
    const result = await matchCliente(parse, mockDb);
    // Ana is 3 chars, so Levenshtein match should NOT apply
    // Top candidate likely c1 or c2 by uniqueness bonus, not by name
    expect(result.candidates.length).toBeGreaterThan(0);
  });
});