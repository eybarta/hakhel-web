import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { hasToken } from './services/authService';

import Login from './pages/auth/Login';
import NotFound from './pages/NotFound';
import ManageDeceased from './pages/ManageDeceased';

const Home = React.lazy(() => import('./pages/Home'));
const isAuthenticated = hasToken();
console.log('RRRR isAuthenticated: ', isAuthenticated);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<AuthenticatedRoute isAuthenticated={isAuthenticated} />}
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route path='/deceased' element={<ManageDeceased />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
