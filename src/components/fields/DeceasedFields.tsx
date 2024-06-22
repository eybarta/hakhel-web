import InputTextField from './InputTextField';
import { useTranslation } from 'react-i18next';
import useSelectOptions from '@constants/selectOptions';
import SelectField from './SelectField';
import HebrewCalendar from '@components/HebrewCalendar';
import { FormikValues } from 'formik';
import { useRecoilValue } from 'recoil';
import { cemeteryOptionsSelector } from '@services/state';

interface DeceasedFieldsProps {
  scope?: string;
  values: FormikValues;
  relationScope?: string;
}

const getInitialDateValue = (date: string | null) =>
  date ? new Date(date) : null;

const DeceasedFields: React.FC<DeceasedFieldsProps> = ({
  scope = '',
  values,
  relationScope = '',
}) => {
  const { t } = useTranslation();
  const fieldName = (field: string) => `${scope}${field}`;
  const { genderOptions, relationOptions } = useSelectOptions();
  const cemeteriesOptions = useRecoilValue(cemeteryOptionsSelector);

  return (
    <div className='flex flex-col gap-3.5'>
      <div className='flex items-start justify-between gap-5'>
        <InputTextField name={fieldName('first_name')} label='first name' />
        <InputTextField name={fieldName('last_name')} label='last name' />
      </div>
      <div className='flex items-start justify-between gap-5'>
        <div className='flex-1 max-w-48'>
          <SelectField
            name={fieldName('gender')}
            label={t('select gender')}
            options={genderOptions}
          />
        </div>
        <div className='flex-1'>
          <HebrewCalendar
            inputId='hebrewDate'
            label='date of death'
            name={fieldName('date_of_death')}
            validationProp={fieldName('date_of_death')}
            fieldName={fieldName}
            value={getInitialDateValue(values.date_of_death)}
          />
        </div>
      </div>
      <div className='flex items-start gap-3.5 mt-3'>
        <SelectField
          name={fieldName('cemetery_id')}
          label='select cemetery'
          options={cemeteriesOptions}
        ></SelectField>

        <div className='flex flex-wrap items-center gap-5'>
          <InputTextField
            name='cemetery_region'
            label='cemetery region'
          ></InputTextField>
          <InputTextField
            name='cemetery_parcel'
            label='cemetery parcel'
          ></InputTextField>
        </div>
      </div>
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

export default DeceasedFields;
