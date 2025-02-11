import React, { lazy, Suspense } from 'react';

const LazyStoreHouseParts = lazy(() => import('./StoreHouseParts'));

const StoreHouseParts = props => (
  <Suspense fallback={null}>
    <LazyStoreHouseParts {...props} />
  </Suspense>
);

export default StoreHouseParts;
