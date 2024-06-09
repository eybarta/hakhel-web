// components/RowActions.tsx
import React from 'react';
import { Button } from 'primereact/button';

interface RowActionsProps {
  data: any;
  onEdit: (data: any) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  showEdit?: boolean;
  showDelete?: boolean;
}

const RowActions: React.FC<RowActionsProps> = ({
  data,
  onEdit,
  onDelete,
  showEdit = true,
  showDelete = true,
}) => {
  return (
    <div className='flex items-center gap-2 row-actions max-w-20'>
      {showEdit && (
        <Button
          icon='pi pi-pencil'
          rounded
          outlined
          text
          size='small'
          severity='secondary'
          onClick={() => onEdit(data)}
        />
      )}
      {showDelete && (
        <Button
          icon='pi pi-trash'
          rounded
          outlined
          size='small'
          severity='danger'
          text
          onClick={e => onDelete(e, data.id)}
        />
      )}
    </div>
  );
};

export default RowActions;
