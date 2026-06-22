import * as admin from 'firebase-admin';

// Firestore emulator must be running: firebase emulators:start --only firestore
// Set FIRESTORE_EMULATOR_HOST=localhost:8080 in test env

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'revive-hogar-test' });
}
const db = admin.firestore();

describe('applyTransferencia (Firestore emulator)', () => {
  const clienteId = 'test-cliente-1';

  beforeAll(async () => {
    await db.collection('clientes').doc(clienteId).set({
      nombre: 'Test Cliente',
      correo: 'test@test.cl',
      rut: '12.345.678-9',
      monto: 15000,
      montoPendiente: 30000,  // 2 months pending
      tipoPago: 'Transferencia',
      activo: true,
      pagos: { 'mayo 2026': 'pendiente', 'junio 2026': 'pendiente' },
    });
  });

  afterAll(async () => {
    await db.recursiveDelete(db.collection('clientes').doc(clienteId));
    await db.recursiveDelete(db.collection('transferenciaLog'));
  });

  beforeEach(async () => {
    await db.recursiveDelete(db.collection('transferenciaLog'));
    // Reset cliente state — prior tests may have mutated monto/montoPendiente
    await db.collection('clientes').doc(clienteId).set({
      nombre: 'Test Cliente',
      correo: 'test@test.cl',
      rut: '12.345.678-9',
      monto: 15000,
      montoPendiente: 30000,
      tipoPago: 'Transferencia',
      activo: true,
      pagos: { 'mayo 2026': 'pendiente', 'junio 2026': 'pendiente' },
    });
  });

  it('applies 2 months payment correctly', async () => {
    const { applyTransferencia } = await import('../transferencias/applier');
    const result = await applyTransferencia(
      clienteId,
      {
        monto: 30000,
        rut: '12.345.678-9',
        fecha: '2026-06-20',
        comentario: 'pago mayo y junio',
        nombre: 'Test Cliente',
        source: 'bice_regex',
        rawExcerpt: '',
      },
      'test-email-1',
      db,
    );
    expect(result.mesesAplicados.length).toBe(2);
    expect(result.montoDistribuido).toBe(30000);
    expect(result.montoResidual).toBe(0);

    const clienteDoc = await db.collection('clientes').doc(clienteId).get();
    const cliente = clienteDoc.data();
    expect(cliente?.montoPendiente).toBe(0);
    expect(cliente?.pagos?.['mayo 2026']).toBe('ok');
    expect(cliente?.pagos?.['junio 2026']).toBe('ok');

    const logs = await db.collection('transferenciaLog').get();
    expect(logs.size).toBe(1);
    expect(logs.docs[0].data().emailId).toBe('test-email-1');
  });

  it('throws partial_amount when monto does not cover an integer number of months', async () => {
    const { applyTransferencia } = await import('../transferencias/applier');
    await db.collection('clientes').doc(clienteId).update({ montoPendiente: 30000 });
    await expect(
      applyTransferencia(
        clienteId,
        {
          monto: 22000,  // 22000/15000 = 1.47, not within 5% of 1
          rut: null, fecha: null, comentario: null, nombre: null,
          source: 'bice_regex', rawExcerpt: '',
        },
        'test-email-2',
        db,
      ),
    ).rejects.toThrow('partial_amount');
  });

  it('throws no_monthly_amount when cliente.monto is 0', async () => {
    const { applyTransferencia } = await import('../transferencias/applier');
    await db.collection('clientes').doc(clienteId).update({ monto: 0, montoPendiente: 0 });
    await expect(
      applyTransferencia(
        clienteId,
        {
          monto: 15000, rut: null, fecha: null, comentario: null, nombre: null,
          source: 'bice_regex', rawExcerpt: '',
        },
        'test-email-3',
        db,
      ),
    ).rejects.toThrow('no_monthly_amount');
  });

  it('is idempotent: same emailId does not double-apply', async () => {
    const { applyTransferencia } = await import('../transferencias/applier');
    await db.collection('clientes').doc(clienteId).update({ montoPendiente: 30000 });
    const parse = {
      monto: 30000, rut: '12.345.678-9', fecha: null,
      comentario: null, nombre: null, source: 'bice_regex' as const, rawExcerpt: '',
    };
    await applyTransferencia(clienteId, parse, 'test-email-4', db);
    await db.collection('clientes').doc(clienteId).update({ montoPendiente: 30000 });
    await applyTransferencia(clienteId, parse, 'test-email-4', db);  // same emailId

    const logs = await db.collection('transferenciaLog').where('emailId', '==', 'test-email-4').get();
    expect(logs.size).toBe(1);
  });
});
