import React, { lazy, Suspense } from 'react';

const LazyPrintOffer = lazy(() => import('./PrintOffer'));

const PrintOffer = props => (
  <Suspense fallback={null}>
    <LazyPrintOffer {...props} />
  </Suspense>
);

export default PrintOffer;
