import React, { ReactNode, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { DialogContext, DialogConfig } from './dialogContext';

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
