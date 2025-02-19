import React, { lazy, Suspense } from 'react';

const LazyOrders = lazy(() => import('./Orders'));

const Orders = props => (
  <Suspense fallback={null}>
    <LazyOrders {...props} />
  </Suspense>
);

export default Orders;
