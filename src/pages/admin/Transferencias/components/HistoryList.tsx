import { collection, orderBy, query, limit } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { db } from '@/firebase/config';

interface LogEntry {
  id: string;
  emailId: string;
  processedAt: any;
  clienteId: string;
  clienteNombre: string;
  monto: number;
  mesesAplicados: string[];
  score: number;
  parseSource: string;
}

const columns: GridColDef<LogEntry>[] = [
  { field: 'clienteNombre', headerName: 'Cliente', flex: 1, minWidth: 150 },
  {
    field: 'monto',
    headerName: 'Monto',
    width: 120,
    valueFormatter: (value: number) => `$${value.toLocaleString('es-CL')}`,
  },
  { field: 'mesesAplicados', headerName: 'Meses', width: 200 },
  { field: 'parseSource', headerName: 'Parser', width: 100 },
  { field: 'score', headerName: 'Score', width: 80 },
  {
    field: 'processedAt',
    headerName: 'Fecha',
    width: 180,
    valueFormatter: (value: any) => value?.toDate?.()?.toLocaleString('es-CL') ?? '',
  },
];

function HistoryList() {
  const q = query(
    collection(db, 'transferenciaLog'),
    orderBy('processedAt', 'desc'),
    limit(100),
  );
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgress />;
  if (!snapshot || snapshot.empty) {
    return <Typography color="text.secondary">No hay transferencias aplicadas.</Typography>;
  }

  const rows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LogEntry));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[25, 50, 100]}
      initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
      autoHeight
      disableRowSelectionOnClick
    />
  );
}

export default HistoryList;
