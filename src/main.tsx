import ReactDOM from 'react-dom/client';
import App from './App';
import { PrimeReactProvider, locale, addLocale } from 'primereact/api';
import { twMerge } from 'tailwind-merge';
import { RecoilRoot } from 'recoil';

import he from './locales/prime-he.json';
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
root.render(
  <PrimeReactProvider
    value={{
      ptOptions: {
        mergeSections: true,
        mergeProps: true,
        classNameMergeFunction: twMerge,
      },
    }}
  >
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </PrimeReactProvider>
);
