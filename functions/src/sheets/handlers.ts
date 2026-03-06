import cors from 'cors';
import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret, defineString } from 'firebase-functions/params';

import { verifyFirebaseToken } from '../middleware';
import { getSheetRows } from './client';
import { buildHeaderIndex, transformRow } from './transform';

const corsHandler = cors({ origin: true });

const SHEETS_SPREADSHEET_ID = defineSecret('SHEETS_SPREADSHEET_ID');
const SHEETS_SHEET_NAME = defineString('SHEETS_SHEET_NAME', { default: 'Total consolidado' });

if (!admin.apps.length) {
  admin.initializeApp();
}

interface ImportResult {
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
  totalSheetRows: number;
  emptyRows: number;
}

export const importFromSheets = onRequest(
  { secrets: [SHEETS_SPREADSHEET_ID] },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const db = admin.firestore();
      const result: ImportResult = { created: 0, updated: 0, skipped: 0, errors: [], totalSheetRows: 0, emptyRows: 0 };

      try {
        const rows = await getSheetRows(SHEETS_SPREADSHEET_ID.value(), SHEETS_SHEET_NAME.value());

        if (rows.length < 2) {
          res.json({ ...result, errors: ['Sheet tiene menos de 2 filas (no hay datos)'] });
          return;
        }

        const [headerRow, ...dataRows] = rows;
        const headerIndex = buildHeaderIndex(headerRow);
        result.totalSheetRows = dataRows.length;

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

          // Upsert by correo + direccion (allow same email with different address)
          let existingQuery = db
            .collection('clientes')
            .where('correo', '==', cliente.correo)
            .where('direccion', '==', cliente.direccion)
            .limit(1);

          let existing = await existingQuery.get();

          if (!existing.empty) {
            await existing.docs[0].ref.set(cliente, { merge: true });
            result.updated++;
          } else {
            await db.collection('clientes').add(cliente);
            result.created++;
          }
        }

        console.log(`[import] Sheet rows: ${result.totalSheetRows}, created: ${result.created}, updated: ${result.updated}, skipped: ${result.skipped}, errors: ${result.errors.length}, empty: ${result.emptyRows}`);
        res.json(result);
      } catch (error) {
        console.error('ETL failed:', error);
        res.status(500).json({ error: 'Import failed', details: String(error) });
      }
    });
  },
);
