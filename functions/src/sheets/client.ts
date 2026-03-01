import { google } from 'googleapis';

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

export async function getSheetRows(spreadsheetId: string, sheetName: string): Promise<string[][]> {
  const auth = new google.auth.GoogleAuth({ scopes: [SHEETS_SCOPE] });
  const sheets = google.sheets({ version: 'v4', auth });

  // First: get spreadsheet metadata to validate the file is native Google Sheets
  // and to list available sheet names for better error messages.
  let availableSheets: string[] = [];
  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    availableSheets = (meta.data.sheets ?? []).map(
      (s) => s.properties?.title ?? '(sin nombre)',
    );
    console.log('[sheets] spreadsheet title:', meta.data.properties?.title);
    console.log('[sheets] available sheets:', availableSheets);
  } catch (metaErr: unknown) {
    const msg = metaErr instanceof Error ? metaErr.message : String(metaErr);
    // If this fails, the spreadsheet is likely an Excel file or the ID is wrong.
    throw new Error(
      `No se pudo acceder al spreadsheet (id=${spreadsheetId}). ` +
        `Verifica que el archivo sea un Google Sheet nativo (no .xlsx) y que esté compartido con el service account. ` +
        `Error original: ${msg}`,
    );
  }

  // Validate that the requested sheet exists
  const match = availableSheets.find((s) => s.toLowerCase() === sheetName.toLowerCase());
  if (!match) {
    throw new Error(
      `Sheet "${sheetName}" no encontrada. Hojas disponibles: [${availableSheets.join(', ')}]`,
    );
  }

  // Use the exact matched name to avoid case/whitespace issues
  const range = `${match}!A:Z`;
  console.log('[sheets] reading range:', range);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = (response.data.values as string[][]) ?? [];
  console.log('[sheets] rows retrieved:', rows.length);
  return rows;
}
