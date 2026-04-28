import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import { verifyFirebaseToken } from '../middleware';
import { getSheetRows } from './client';
import { buildHeaderIndex, transformRow } from './transform';

const VALID_DIAS: Record<string, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miercoles',
  miércoles: 'Miercoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sabado',
  sábado: 'Sabado',
};

function normalizeDia(raw: string): string | null {
  return VALID_DIAS[raw.trim().toLowerCase()] ?? null;
}

interface ImportResult {
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
  totalSheetRows: number;
  emptyRows: number;
  rutasCreated: number;
}

export async function importFromSheets(req: Request, res: Response): Promise<void> {
  try {
    await verifyFirebaseToken(req.headers.authorization);
  } catch {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  const db = admin.firestore();
  const result: ImportResult = { created: 0, updated: 0, skipped: 0, errors: [], totalSheetRows: 0, emptyRows: 0, rutasCreated: 0 };

  try {
    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) throw new Error('SHEETS_SPREADSHEET_ID must be set');
    const sheetName = process.env.SHEETS_SHEET_NAME || 'Total consolidado';
    const rows = await getSheetRows(spreadsheetId, sheetName);

    if (rows.length < 2) {
      res.json({ ...result, errors: ['Sheet tiene menos de 2 filas (no hay datos)'] });
      return;
    }

    const [headerRow, ...dataRows] = rows;
    const headerIndex = buildHeaderIndex(headerRow);
    result.totalSheetRows = dataRows.length;

    type ParadaEntry = { id: string; nombre: string; direccion: string; comuna: string; telefono: string };
    // dia -> movil -> paradas[]
    const clientesPorDiaMovil: Record<string, Record<string, ParadaEntry[]>> = {};

    for (let i = 0; i < dataRows.length; i++) {
      const { cliente, error } = transformRow(dataRows[i], headerIndex, i + 1);

      if (error) {
        result.errors.push(error);
        continue;
      }

      if (!cliente) {
        result.skipped++;
        result.emptyRows++;
        console.log(`[import] Row ${i + 2} is empty, skipping`);
        continue;
      }

      const existingQuery = db
        .collection('clientes')
        .where('correo', '==', cliente.correo)
        .where('direccion', '==', cliente.direccion)
        .limit(1);

      const existing = await existingQuery.get();

      let clienteId: string;
      if (!existing.empty) {
        clienteId = existing.docs[0].id;
        await existing.docs[0].ref.set(cliente, { merge: true });
        result.updated++;
      } else {
        const newDoc = await db.collection('clientes').add(cliente);
        clienteId = newDoc.id;
        result.created++;
      }

      if (cliente.activo && cliente.dia) {
        const dia = normalizeDia(cliente.dia);
        const movil = (cliente.movil ?? '').trim() || 'sin-asignar';
        if (dia) {
          if (!clientesPorDiaMovil[dia]) clientesPorDiaMovil[dia] = {};
          if (!clientesPorDiaMovil[dia][movil]) clientesPorDiaMovil[dia][movil] = [];
          if (!clientesPorDiaMovil[dia][movil].some((c) => c.id === clienteId)) {
            clientesPorDiaMovil[dia][movil].push({
              id: clienteId,
              nombre: cliente.nombre,
              direccion: cliente.direccion,
              comuna: cliente.comuna,
              telefono: cliente.telefono,
            });
          }
        }
      }
    }

    for (const [dia, porMovil] of Object.entries(clientesPorDiaMovil)) {
      for (const [movil, clientes] of Object.entries(porMovil)) {
        const safeMovil = movil.replace(/[^a-zA-Z0-9\-_]/g, '_');
        const docId = `${dia}-${safeMovil}`;
        const rutaRef = db.collection('rutas').doc(docId);
        const existingRuta = await rutaRef.get();

        const paradas = clientes.map((c, idx) => ({
          clienteId: c.id,
          orden: idx + 1,
          nombre: c.nombre,
          direccion: c.direccion,
          comuna: c.comuna,
          telefono: c.telefono,
        }));

        if (existingRuta.exists) {
          await rutaRef.set({ paradas, movil }, { merge: true });
        } else {
          await rutaRef.set({ dia, movil, paradas });
        }
        result.rutasCreated++;
      }
    }

    console.log(`[import] Sheet rows: ${result.totalSheetRows}, created: ${result.created}, updated: ${result.updated}, skipped: ${result.skipped}, errors: ${result.errors.length}, empty: ${result.emptyRows}, rutas: ${result.rutasCreated}`);
    res.json(result);
  } catch (error) {
    console.error('ETL failed:', error);
    res.status(500).json({ error: 'Import failed', details: String(error) });
  }
}
