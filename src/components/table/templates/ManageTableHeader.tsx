import React from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import TableHeader from '../TableHeader';

interface ManageTableHeaderProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  addLabel: string;
  title: string;
}

const ManageTableHeader: React.FC<ManageTableHeaderProps> = ({
  onSearch,
  onAdd,
  addLabel,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <TableHeader title={t(title)} onSearch={onSearch}>
      <Button
        icon='pi pi-plus'
        severity='info'
        raised
        outlined
        size='small'
        label={t(addLabel)}
        className='mr-2'
        onClick={onAdd}
      />
    </TableHeader>
  );
};

export default ManageTableHeader;
