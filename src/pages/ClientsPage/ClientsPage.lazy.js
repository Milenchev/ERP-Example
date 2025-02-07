import React, { lazy, Suspense } from 'react';

const LazyClientsPage = lazy(() => import('./ClientsPage'));

const ClientsPage = props => (
  <Suspense fallback={null}>
    <LazyClientsPage {...props} />
  </Suspense>
);

export default ClientsPage;
