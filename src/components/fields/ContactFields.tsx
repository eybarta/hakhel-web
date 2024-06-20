import InputTextField from './InputTextField';
import { useTranslation } from 'react-i18next';
import useSelectOptions from '@constants/selectOptions';
import SelectField from './SelectField';

interface ContactFieldsProps {
  scope?: string;
  relationScope?: string;
}
const ContactFields: React.FC<ContactFieldsProps> = ({
  scope = '',
  relationScope = '',
}) => {
  const { t } = useTranslation();
  const fieldName = (field: string) => `${scope}${field}`;
  const { genderOptions, relationOptions } = useSelectOptions();

  return (
    <div className='flex flex-col gap-3.5'>
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

export default ContactFields;
