import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProtectedRoute } from './app/ProtectedRoute';
import ContainerLayout from './app/layout/container-layout';
import { Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from './app/hooks/useAuth';

const HomePage = React.lazy(() => import('./app/pages/home-page/HomePage'));
const Share = React.lazy(() => import('./app/pages/share-page/Share'));

function App(): JSX.Element {
  const queryClient = new QueryClient();
  let navigate = useNavigate();
  const { logout } = useAuth();
  const logOut = () => {
    logout();
    localStorage.clear();
    navigate(`/`);
    window.location.reload();
  };

  React.useEffect(() => {
    if (localStorage.user !== 'null') {
      const expirationTime = (JSON.parse(localStorage.user).exp + 86400) * 100;
      if (Date.now() >= expirationTime) {
        logOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <ContainerLayout>
              <React.Suspense fallback={<h1>Loading ...</h1>}>
                <Outlet />
              </React.Suspense>
            </ContainerLayout>
          }
        >
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <ContainerLayout>
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Outlet />
                </React.Suspense>
              </ContainerLayout>
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<Share />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
