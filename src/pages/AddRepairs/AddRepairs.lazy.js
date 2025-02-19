import React, { lazy, Suspense } from 'react';

const LazyAddRepairs = lazy(() => import('./AddRepairs'));

const AddRepairs = props => (
  <Suspense fallback={null}>
    <LazyAddRepairs {...props} />
  </Suspense>
);

export default AddRepairs;
