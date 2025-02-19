import React, { lazy, Suspense } from 'react';

const LazyWorkRepair = lazy(() => import('./WorkRepair'));

const WorkRepair = props => (
  <Suspense fallback={null}>
    <LazyWorkRepair {...props} />
  </Suspense>
);

export default WorkRepair;
