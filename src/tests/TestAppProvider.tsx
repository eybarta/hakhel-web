// TestAppProvider.tsx
import React, { ReactNode, useState } from 'react';
import { ConfirmProvider } from '@components/context/ConfirmContext';
import { ToastProvider } from '@components/context/ToastContext';
import { DialogProvider } from '@components/context/DialogContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../query/queryClient';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface TestAppProviderProps {
  children: ReactNode;
}

const TestAppProvider: React.FC<TestAppProviderProps> = ({ children }) => {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ToastProvider>
            <ConfirmProvider>
              <DialogProvider>{children}</DialogProvider>
            </ConfirmProvider>
          </ToastProvider>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default TestAppProvider;
