import ReactDOM from 'react-dom/client';
import App from './App';
import { PrimeReactProvider, locale, addLocale } from 'primereact/api';
import { twMerge } from 'tailwind-merge';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { persistOptions, queryClient } from './query/queryClient';

import he from './locales/prime-he.json';
import { primeTheme } from './theme/prime-theme';
import './theme/global.css';
import './base.css';
import './index.css';
import './i18n';

// Adding the Hebrew locale data
addLocale('he', he);

// Setting the active locale to Hebrew
locale('he');

// Creating the root element
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Rendering the application within the PrimeReactProvider
const app = persistOptions ? (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={persistOptions}
  >
    <App />
  </PersistQueryClientProvider>
) : (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

root.render(
  <PrimeReactProvider
    value={{
      pt: primeTheme,
      ptOptions: {
        mergeSections: true,
        mergeProps: true,
        classNameMergeFunction: twMerge,
      },
    }}
  >
    {app}
  </PrimeReactProvider>
);
