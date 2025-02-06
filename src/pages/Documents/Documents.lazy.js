import React, { lazy, Suspense } from 'react';

const LazyDocuments = lazy(() => import('./Documents'));

const Documents = props => (
  <Suspense fallback={null}>
    <LazyDocuments {...props} />
  </Suspense>
);

export default Documents;
