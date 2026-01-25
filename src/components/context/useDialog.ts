import { useContext } from 'react';
import { DialogContext } from './dialogContext';
import type { DialogContextType } from './dialogContext';

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
