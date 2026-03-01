import { Fragment } from 'react';
import { Outlet } from 'react-router';

import Box from '@mui/material/Box';

import AdminHeader from '@/sections/AdminHeader';
import AdminSidebar from '@/sections/AdminSidebar';

function AdminLayout() {
  return (
    <Fragment>
      <AdminHeader />
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          height: (theme) =>
            `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + parseInt(theme.spacing(1))}px)`,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Fragment>
  );
}

export default AdminLayout;
