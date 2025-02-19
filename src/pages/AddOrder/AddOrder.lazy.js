import React, { lazy, Suspense } from 'react';

const LazyAddOrder = lazy(() => import('./AddOrder'));

const AddOrder = props => (
  <Suspense fallback={null}>
    <LazyAddOrder {...props} />
  </Suspense>
);

export default AddOrder;
