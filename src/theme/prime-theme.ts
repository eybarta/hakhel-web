import { classNames } from 'primereact/utils';
import { TagProps } from 'primereact/tag';
import { ButtonProps } from 'primereact/button';

const baseTheme = {
  css: `
    :root {
      --primary-50: 236 253 245;  /* Pastel Mint */
      --primary-100: 209 250 229;
      --primary-200: 167 243 208;
      --primary-300: 110 231 183;
      --primary-400: 52 211 153;
      --primary-500: 16 185 129;  /* Main Brand Color */
      --primary-600: 5 150 105;
      --primary-700: 4 120 87;
      --primary-800: 6 95 70;
      --primary-900: 4 78 56;
      
      /* Surface colors for cards, backgrounds etc */
      --surface-0: 255 255 255;   /* White */
      --surface-50: 249 250 251;  /* Lightest Gray */
      --surface-100: 243 244 246;
      --surface-200: 229 231 235;
      --surface-300: 209 213 219;
      --surface-400: 156 163 175;
      --surface-500: 107 114 128;
      --surface-600: 75 85 99;
      --surface-700: 55 65 81;
      --surface-800: 31 41 55;
      --surface-900: 17 24 39;    /* Darkest Gray */
    }
  `
};

// Add the base theme CSS to the document
const style = document.createElement('style');
style.textContent = baseTheme.css;
document.head.appendChild(style);

export const primeTheme = {
  tag: {
    root: ({ props }: { props: TagProps }) => ({
      className: classNames(
        'inline-flex items-center justify-center',
        'px-2 py-1 text-xs font-semibold rounded-full',
        {
          'bg-blue-50 text-blue-600': props.severity === 'info',
          'bg-amber-50 text-amber-600': props.severity === 'warning',
          'bg-rose-50 text-rose-600': props.severity === 'danger',
          'bg-emerald-50 text-emerald-600': props.severity === 'success'
        }
      )
    })
  },
  card: {
    root: {
      className: 'bg-white shadow-sm rounded-lg border border-slate-200'
    },
    content: {
      className: 'p-4'
    }
  },
  button: {
    root: ({ props }: { props: ButtonProps }) => ({
      className: classNames(
        'inline-flex items-center justify-center',
        'px-4 py-2 text-sm font-medium rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'transition-colors duration-200',
        {
          'bg-emerald-50 text-emerald-600 hover:bg-emerald-100': props.severity === 'success',
          'bg-blue-50 text-blue-600 hover:bg-blue-100': props.severity === 'info',
          'bg-amber-50 text-amber-600 hover:bg-amber-100': props.severity === 'warning',
          'bg-rose-50 text-rose-600 hover:bg-rose-100': props.severity === 'danger',
          'bg-slate-50 text-slate-600 hover:bg-slate-100': !props.severity
        }
      )
    })
  },
  datatable: {
    header: {
      className: 'bg-slate-50 px-6 py-4 border-b border-slate-200'
    }
  }
} as const; 