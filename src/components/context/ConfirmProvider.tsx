import React, { ReactNode, useRef } from 'react';
import {
  ConfirmPopup,
  confirmPopup as primeConfirmPopup,
} from 'primereact/confirmpopup';
import { ConfirmContext, type ConfirmContextType } from './confirmContext';
import type { ConfirmPopupProps } from 'primereact/confirmpopup';

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const confirm = useRef<ConfirmPopup>(null);
  const confirmPopup: ConfirmContextType['confirmPopup'] = (
    options: ConfirmPopupProps
  ) => {
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
