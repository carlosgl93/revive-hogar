import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import asyncComponentLoader from '@/utils/loader';

const LandingPage = asyncComponentLoader(() => import('@/pages/Landing'));
const LoginPage = asyncComponentLoader(() => import('@/pages/admin/Login'));
const AdminRoutes = asyncComponentLoader(() => import('@/routes/AdminRoutes'));
const ChoferRoutes = asyncComponentLoader(() => import('@/routes/ChoferRoutes'));
const NotFound = asyncComponentLoader(() => import('@/pages/NotFound'));

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/chofer/*" element={<ChoferRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

const AppWithErrorHandler = withErrorHandler(App, AppErrorBoundaryFallback);
export default AppWithErrorHandler;
