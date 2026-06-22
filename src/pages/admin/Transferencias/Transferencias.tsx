import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import HistoryList from './components/HistoryList';
import PendingInbox from './components/PendingInbox';

function Transferencias() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transferencias
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Pendientes" />
        <Tab label="Historial" />
      </Tabs>
      {tab === 0 ? <PendingInbox /> : <HistoryList />}
    </Box>
  );
}

export default Transferencias;
