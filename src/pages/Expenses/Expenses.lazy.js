import React, { lazy, Suspense } from 'react';

const LazyExpenses = lazy(() => import('./Expenses'));

const Expenses = props => (
  <Suspense fallback={null}>
    <LazyExpenses {...props} />
  </Suspense>
);

export default Expenses;
