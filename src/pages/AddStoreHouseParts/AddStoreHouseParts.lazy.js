import React, { lazy, Suspense } from 'react';

const LazyAddStoreHouseParts = lazy(() => import('./AddStoreHouseParts'));

const AddStoreHouseParts = props => (
  <Suspense fallback={null}>
    <LazyAddStoreHouseParts {...props} />
  </Suspense>
);

export default AddStoreHouseParts;
