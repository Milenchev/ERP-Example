import React, { lazy, Suspense } from 'react';

const LazyViewInvoice = lazy(() => import('./ViewInvoice'));

const ViewInvoice = props => (
  <Suspense fallback={null}>
    <LazyViewInvoice {...props} />
  </Suspense>
);

export default ViewInvoice;
