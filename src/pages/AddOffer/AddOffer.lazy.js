import React, { lazy, Suspense } from 'react';

const LazyAddOffer = lazy(() => import('./AddOffer'));

const AddOffer = props => (
  <Suspense fallback={null}>
    <LazyAddOffer {...props} />
  </Suspense>
);

export default AddOffer;
