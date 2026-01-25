import { useContext } from 'react';
import { ConfirmContext } from './confirmContext';
import type { ConfirmContextType } from './confirmContext';

export const useConfirm = (): ConfirmContextType => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};
