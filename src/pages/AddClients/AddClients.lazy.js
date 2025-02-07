import React, { lazy, Suspense } from 'react';

const LazyAddClients = lazy(() => import('./AddClients'));

const AddClients = props => (
  <Suspense fallback={null}>
    <LazyAddClients {...props} />
  </Suspense>
);

export default AddClients;
