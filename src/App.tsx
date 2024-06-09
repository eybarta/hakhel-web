import './App.css';
import AppRoutes from './AppRoutes';
import AppLayout from './layout/AppLayout';
import TopBar from '@components/TopBar';
import { ConfirmProvider } from '@components/context/ConfirmContext';
import { ToastProvider } from '@components/context/ToastContext';
import { DialogProvider } from '@components/context/DialogContext';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <RecoilRoot>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ToastProvider>
            <ConfirmProvider>
              <DialogProvider>
                <div className='w-full h-full'>
                  <AppLayout header={<TopBar />} footer={<div>footer</div>}>
                    <AppRoutes />
                  </AppLayout>
                </div>
              </DialogProvider>
            </ConfirmProvider>
          </ToastProvider>
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
