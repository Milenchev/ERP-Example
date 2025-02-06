import React, { lazy, Suspense } from 'react';

const LazyAddOutputInvoice = lazy(() => import('./AddOutputInvoice'));

const AddOutputInvoice = props => (
  <Suspense fallback={null}>
    <LazyAddOutputInvoice {...props} />
  </Suspense>
);

export default AddOutputInvoice;
