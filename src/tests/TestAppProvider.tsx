// TestAppProvider.tsx
import React, { ReactNode } from 'react';
import { ConfirmProvider } from '@components/context/ConfirmContext';
import { ToastProvider } from '@components/context/ToastContext';
import { DialogProvider } from '@components/context/DialogContext';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface TestAppProviderProps {
  children: ReactNode;
}

const TestAppProvider: React.FC<TestAppProviderProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ToastProvider>
            <ConfirmProvider>
              <DialogProvider>{children}</DialogProvider>
            </ConfirmProvider>
          </ToastProvider>
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default TestAppProvider;
