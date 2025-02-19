import React, { lazy, Suspense } from 'react';

const LazyRepairs = lazy(() => import('./Repairs'));

const Repairs = props => (
  <Suspense fallback={null}>
    <LazyRepairs {...props} />
  </Suspense>
);

export default Repairs;
