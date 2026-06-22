import * as admin from 'firebase-admin';

// Firestore emulator must be running on FIRESTORE_EMULATOR_HOST=localhost:8080

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'revive-hogar-test' });
}
const db = admin.firestore();

const mockGmail = {
  findLabelByName: jest.fn(),
  listMessagesByLabel: jest.fn(),
  getMessage: jest.fn(),
};

const sampleCliente = {
  nombre: 'Juan Pérez',
  correo: 'juan@test.cl',
  rut: '12.345.678-9',
  monto: 15000,
  montoPendiente: 15000,
  tipoPago: 'Transferencia',
  activo: true,
  pagos: {},
};

const biceEmailText = `Banco BICE - Notificación de Transferencia
Estimado cliente,

Ha recibido una transferencia de $15.000.
RUT: 12.345.678-9
De: Juan Pérez
Fecha: 20-06-2026

Saludos,
BICE`;

const ambiguousEmailText = `Hola, te transfiero $5.000.
Gracias`;

describe('transferenciasInbound (integration)', () => {
  const clienteId = 'integration-cliente-1';

  beforeAll(async () => {
    await db.collection('clientes').doc(clienteId).set(sampleCliente);
  });

  afterAll(async () => {
    await db.recursiveDelete(db.collection('clientes'));
    await db.recursiveDelete(db.collection('transferenciaLog'));
    await db.recursiveDelete(db.collection('transferenciasSinMatch'));
    await db.recursiveDelete(db.collection('notificationLogs'));
  });

  beforeEach(async () => {
    await db.recursiveDelete(db.collection('transferenciaLog'));
    await db.recursiveDelete(db.collection('transferenciasSinMatch'));
    await db.recursiveDelete(db.collection('notificationLogs'));
    await db.collection('clientes').doc(clienteId).update({
      montoPendiente: 15000,
      pagos: {},
    });
    mockGmail.findLabelByName.mockReset();
    mockGmail.listMessagesByLabel.mockReset();
    mockGmail.getMessage.mockReset();
    mockGmail.findLabelByName.mockImplementation(async (name: string) => {
      if (name === 'ReviveHogar/Transferencias') return 'Label_T';
      if (name === 'ReviveHogar/Procesadas') return 'Label_P';
      return null;
    });
  });

  it('auto-applies a perfect BICE match', async () => {
    mockGmail.listMessagesByLabel.mockResolvedValueOnce({
      messages: [{ id: 'msg-1', threadId: 't-1' }],
      nextPageToken: undefined,
    });
    mockGmail.getMessage.mockResolvedValueOnce({
      id: 'msg-1',
      threadId: 't-1',
      from: 'Alertas Banco BICE <alertas@bice.cl>',
      subject: 'Transferencia recibida',
      bodyText: biceEmailText,
      bodyHtml: undefined,
      date: 'Mon, 20 Jun 2026 10:00:00 -0300',
    });

    const { _testable } = await import('./handler');
    const result = await _testable.processEmails(mockGmail as any, db, '');

    expect(result.auto).toBe(1);
    expect(result.inbox).toBe(0);
    expect(result.errors).toBe(0);

    const cliente = (await db.collection('clientes').doc(clienteId).get()).data();
    expect(cliente?.montoPendiente).toBe(0);

    const logs = await db.collection('transferenciaLog').get();
    expect(logs.size).toBe(1);
  });

  it('routes ambiguous match to inbox', async () => {
    mockGmail.listMessagesByLabel.mockResolvedValueOnce({
      messages: [{ id: 'msg-2', threadId: 't-2' }],
      nextPageToken: undefined,
    });
    mockGmail.getMessage.mockResolvedValueOnce({
      id: 'msg-2',
      threadId: 't-2',
      from: 'Alertas Banco BICE <alertas@bice.cl>',
      subject: 'Transferencia',
      bodyText: ambiguousEmailText,
      bodyHtml: undefined,
      date: 'Mon, 21 Jun 2026 10:00:00 -0300',
    });

    const { _testable } = await import('./handler');
    const result = await _testable.processEmails(mockGmail as any, db, '');

    expect(result.auto).toBe(0);
    expect(result.inbox).toBeGreaterThanOrEqual(1);

    const inbox = await db.collection('transferenciasSinMatch').get();
    expect(inbox.size).toBeGreaterThanOrEqual(1);

    const cliente = (await db.collection('clientes').doc(clienteId).get()).data();
    expect(cliente?.montoPendiente).toBe(15000); // unchanged
  });
});