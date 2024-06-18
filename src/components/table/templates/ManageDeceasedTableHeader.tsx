import React from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import TableHeader from '../TableHeader';

interface ManageDeceasedTableHeaderProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const ManageDeceasedTableHeader: React.FC<ManageDeceasedTableHeaderProps> = ({
  onSearch,
  onAdd,
}) => {
  const { t } = useTranslation();

  return (
    <TableHeader title={t('deceased people')} onSearch={onSearch}>
      <Button
        icon='pi pi-plus'
        severity='info'
        raised
        outlined
        size='small'
        label={t('add deceased person')}
        className='mr-2'
        onClick={onAdd}
      />
    </TableHeader>
  );
};

export default ManageDeceasedTableHeader;
