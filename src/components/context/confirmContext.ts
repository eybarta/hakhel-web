import { createContext } from 'react';
import type { ConfirmPopupProps } from 'primereact/confirmpopup';

export interface ConfirmContextType {
  confirmPopup: (options: ConfirmPopupProps) => void;
}

export const ConfirmContext = createContext<ConfirmContextType | null>(null);
