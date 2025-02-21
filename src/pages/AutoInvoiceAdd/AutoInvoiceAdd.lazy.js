import React, { lazy, Suspense } from 'react';

const LazyAutoInvoiceAdd = lazy(() => import('./AutoInvoiceAdd'));

const AutoInvoiceAdd = props => (
  <Suspense fallback={null}>
    <LazyAutoInvoiceAdd {...props} />
  </Suspense>
);

export default AutoInvoiceAdd;
