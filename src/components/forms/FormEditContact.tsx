// FormEditContact.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import InputTextField from '@components/fields/InputTextField';
import SelectField from '@components/fields/SelectField';
import { Button } from 'primereact/button';
import useSelectOptions from '@constants/selectOptions';
import { ContactInterface } from '@type/contactsInterface';

interface FormEditContactProps {
  scope: string;
  relationScope?: string;
  removeContact?: () => void;
  propValues?: ContactInterface | null;
}

const FormEditContact: React.FC<FormEditContactProps> = ({
  scope = '',
  relationScope = '',
  removeContact,
}) => {
  const { t } = useTranslation();

  const fieldName = (field: string) => `${scope}${field}`;
  const { genderOptions, relationOptions } = useSelectOptions();
  return (
    <div className='flex flex-col gap-2.5'>
      <InputTextField name={fieldName('first_name')} label='first name' />
      <InputTextField name={fieldName('last_name')} label='last name' />
      <InputTextField name={fieldName('email')} label='email' />
      <InputTextField name={fieldName('phone')} label='phone' />
      <SelectField
        name={fieldName('gender')}
        label={t('select gender')}
        options={genderOptions}
      />
      {relationScope && (
        <SelectField
          name={`${relationScope}relation_of_deceased_to_contact`}
          label={t('select relation')}
          options={relationOptions}
        />
      )}
    </div>
  );
};

export default FormEditContact;
