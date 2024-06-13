import React, { createContext, useContext, useRef, ReactNode } from 'react';
import {
  ConfirmPopup,
  ConfirmPopupProps,
  confirmPopup as primeConfirmPopup,
} from 'primereact/confirmpopup';

interface ConfirmContextType {
  confirmPopup: (options: ConfirmPopupProps) => void;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const confirm = useRef<ConfirmPopup>(null);
  const confirmPopup = (options: ConfirmPopupProps) => {
    if (confirm.current) {
      primeConfirmPopup({
        ...options,
        appendTo: document.body,
      });
    }
  };
  return (
    <ConfirmContext.Provider value={{ confirmPopup }}>
      {children}
      <ConfirmPopup ref={confirm} />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ConfirmContextType => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};
