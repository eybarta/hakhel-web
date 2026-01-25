import { createContext } from 'react';
import type { ReactElement } from 'react';

export interface DialogContextType {
  showDialog: (content: ReactElement) => void;
  hideDialog: () => void;
}

export interface DialogConfig {
  visible: boolean;
  blockScroll: boolean;
  content: ReactElement | null;
}

export const DialogContext = createContext<DialogContextType | null>(null);
