import React, { lazy, Suspense } from 'react';

const LazyStoreHouse = lazy(() => import('./StoreHouse'));

const StoreHouse = props => (
  <Suspense fallback={null}>
    <LazyStoreHouse {...props} />
  </Suspense>
);

export default StoreHouse;
