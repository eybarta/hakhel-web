import React from 'react';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

interface SearchFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = ({ onChange }: SearchFieldProps) => {
  const { t } = useTranslation();

  return (
    <IconField size={1} iconPosition='right'>
      <InputIcon className='pi pi-search'> </InputIcon>
      <InputText onChange={onChange} placeholder={t('Search')} />
    </IconField>
  );
};

export default SearchField;
