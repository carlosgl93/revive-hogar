import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import asyncComponentLoader from '@/utils/loader';

const LandingPage = asyncComponentLoader(() => import('@/pages/Landing'));
const AdminRoutes = asyncComponentLoader(() => import('@/routes/AdminRoutes'));
const NotFound = asyncComponentLoader(() => import('@/pages/NotFound'));

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

const AppWithErrorHandler = withErrorHandler(App, AppErrorBoundaryFallback);
export default AppWithErrorHandler;
