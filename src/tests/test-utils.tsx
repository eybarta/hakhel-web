// test-utils.tsx
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import TestAppProvider from './TestAppProvider'; // Import your custom provider component

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: TestAppProvider, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
