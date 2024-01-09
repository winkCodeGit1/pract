/* eslint-disable react/display-name */

import { Button } from '@mui/material';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import LoadingScreen from 'components/LoadingScreen';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

export const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export const ResetQuery = (Component) => {
  console.log(Component, 'Component');
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <>
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
          >
            {Component}
            {/* <Component /> */}
          </ErrorBoundary>
        </>
      )}
    </QueryErrorResetBoundary>
  );
};
