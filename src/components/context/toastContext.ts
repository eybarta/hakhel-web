import { createContext } from 'react';

export interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail?: string;
  life?: number;
}

export interface ToastContextType {
  showToast: (message: ToastMessage) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
