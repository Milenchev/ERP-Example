import React, { lazy, Suspense } from 'react';

const LazyAutoInvoices = lazy(() => import('./AutoInvoices'));

const AutoInvoices = props => (
  <Suspense fallback={null}>
    <LazyAutoInvoices {...props} />
  </Suspense>
);

export default AutoInvoices;
