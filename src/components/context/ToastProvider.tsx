import React, { ReactNode, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ToastContext, type ToastMessage } from './toastContext';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useRef<Toast>(null);

  const showToast = (message: ToastMessage) => {
    if (toast.current) {
      toast.current.show(message);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};
