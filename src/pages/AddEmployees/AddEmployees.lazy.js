import React, { lazy, Suspense } from 'react';

const LazyAddEmployees = lazy(() => import('./AddEmployees'));

const AddEmployees = props => (
  <Suspense fallback={null}>
    <LazyAddEmployees {...props} />
  </Suspense>
);

export default AddEmployees;
