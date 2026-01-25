import './App.css';
import AppRoutes from './AppRoutes';
import AppLayout from './layout/AppLayout';
import TopBar from '@components/TopBar';
import { ConfirmProvider } from '@components/context/ConfirmProvider';
import { ToastProvider } from '@components/context/ToastProvider';
import { DialogProvider } from '@components/context/DialogProvider';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  // const [count, setCount] = useState(0)

  return (
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
  );
}

export default App;
