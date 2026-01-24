import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import SearchField from '../../fields/SearchField';

interface ManageTableHeaderProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd?: () => void;
  addLabel?: string;
  title?: string;
}

const ManageTableHeader: React.FC<ManageTableHeaderProps> = ({
  onSearch,
  onAdd,
  addLabel = 'add',
  title = '',
}) => {
  const { t } = useTranslation();

  return (
    <div className='flex justify-between items-center gap-2 p-3'>
      <div className='flex items-center gap-2'>
        
        {title && <h2 className='text-2xl font-bold'>{t(title)}</h2>}
        {onAdd && (
          <Button
            type='button'
            icon='pi pi-plus'
            label={t(addLabel)}
            onClick={onAdd}
          />
        )}
      </div>
      <SearchField onChange={onSearch} />
    </div>
  );
};

export default ManageTableHeader;
