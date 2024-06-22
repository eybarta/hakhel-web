import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from 'react';
import { Dialog } from 'primereact/dialog';

interface DialogContextType {
  showDialog: (content: ReactElement) => void;
  hideDialog: () => void;
}

interface DialogConfig {
  visible: boolean;
  blockScroll: boolean;
  content: ReactElement | null;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    visible: false,
    content: null,
    blockScroll: true,
  });

  const showDialog = (content: ReactElement) => {
    setDialogConfig({ visible: true, blockScroll: true, content });
  };

  const hideDialog = () => {
    setDialogConfig({ visible: false, blockScroll: false, content: null });
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      <Dialog
        visible={dialogConfig.visible}
        blockScroll={dialogConfig.blockScroll}
        modal={true}
        onHide={hideDialog}
        content={() => dialogConfig.content}
        maskClassName='backdrop-blur-sm'
      ></Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
