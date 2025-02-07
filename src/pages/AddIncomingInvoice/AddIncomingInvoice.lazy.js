import React, { lazy, Suspense } from 'react';

const LazyAddIncomingInvoice = lazy(() => import('./AddIncomingInvoice'));

const AddIncomingInvoice = props => (
  <Suspense fallback={null}>
    <LazyAddIncomingInvoice {...props} />
  </Suspense>
);

export default AddIncomingInvoice;
