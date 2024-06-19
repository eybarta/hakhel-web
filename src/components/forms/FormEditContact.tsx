// FormEditContact.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import InputTextField from '@components/fields/InputTextField';
import SelectField from '@components/fields/SelectField';
import { Button } from 'primereact/button';

interface FormEditContactProps {
  scope?: string;
  removeContact?: () => void;
}

const FormEditContact: React.FC<FormEditContactProps> = ({
  scope = '',
  removeContact,
}) => {
  const { t } = useTranslation();
  const fieldName = (field: string) => `${scope}${field}`;

  return (
    <div className='flex flex-col gap-2.5'>
      <InputTextField name={fieldName('first_name')} label='first name' />
      <InputTextField name={fieldName('last_name')} label='last name' />
      <InputTextField name={fieldName('email')} label='email' />
      <InputTextField name={fieldName('phone')} label='phone' />
      <SelectField
        name={fieldName('gender')}
        label='gender'
        options={[
          { label: t('male'), value: 'male' },
          { label: t('female'), value: 'female' },
        ]}
      />
      <SelectField
        name={fieldName('relation_of_deceased_to_contact')}
        label='relation'
        options={[
          { label: t('father'), value: 'father' },
          { label: t('mother'), value: 'mother' },
          { label: t('son'), value: 'son' },
          { label: t('daughter'), value: 'daughter' },
          // Add more relations here
        ]}
      />
      {removeContact && (
        <Button
          label={t('remove')}
          icon='pi pi-times'
          className='p-button-text'
          onClick={removeContact}
        />
      )}
    </div>
  );
};

export default FormEditContact;
