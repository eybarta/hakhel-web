import { Button } from 'primereact/button';

interface DialogHeaderProps {
  title: string;
  closeDialog: () => void;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ title, closeDialog }) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-xl'>{title}</span>
      <Button
        icon='pi pi-times'
        rounded
        text
        severity='secondary'
        aria-label='Cancel'
        onClick={closeDialog}
      />
    </div>
  );
};

export default DialogHeader;
