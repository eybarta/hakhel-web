import React from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import TableHeader from '../TableHeader';

interface ManageCemeteriesTableHeaderProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const ManageCemeteriesTableHeader: React.FC<
  ManageCemeteriesTableHeaderProps
> = ({ onSearch, onAdd }) => {
  const { t } = useTranslation();

  return (
    <TableHeader title={t('Cemeteries')} onSearch={onSearch}>
      <Button
        icon='pi pi-plus'
        severity='info'
        raised
        outlined
        size='small'
        label={t('Add cemetery')}
        className='mr-2'
        onClick={onAdd}
      />
    </TableHeader>
  );
};

export default ManageCemeteriesTableHeader;
