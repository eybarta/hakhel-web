import './App.css';
import AppRoutes from './AppRoutes';
import AppLayout from './layout/AppLayout';
import TopBar from './components/TopBar';
import { ToastProvider } from './components/context/ToastContext';
import { DialogProvider } from './components/context/DialogContext';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <ToastProvider>
      <DialogProvider>
        <div className='w-full h-full'>
          {/* Possible global layout or providers */}

          <AppLayout header={<TopBar />} footer={<div>footer</div>}>
            <AppRoutes />
          </AppLayout>
        </div>
      </DialogProvider>
    </ToastProvider>
  );
}

export default App;
