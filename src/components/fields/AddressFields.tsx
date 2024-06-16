import React from 'react';
import { get } from 'lodash';

import { Field, ErrorMessage, FieldInputProps, FormikProps } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import InputField from './InputField';
import { AddressInterface } from '@type/addressInterface';

interface AddressFieldsProps {
  prefix: string; // Use prefix to handle nested object keys
  errors: FormikProps<any>['errors'];
  value: AddressInterface;
  touched: FormikProps<any>['touched'];
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  prefix,
  errors,
  touched,
}) => {
  const { t } = useTranslation();

  const isFieldInvalid = (
    field: FieldInputProps<string>,
    errors: FormikProps<any>['errors'],
    touched: FormikProps<any>['touched']
  ): boolean => {
    return !!(get(touched, field.name) && get(errors, field.name));
  };

  return (
    <div className='flex flex-col gap-2.5'>
      <InputField name={`${prefix}.line1`} label='Line 1'></InputField>
      <InputField name={`${prefix}.line2`} label='Line 2'></InputField>
      <InputField name={`${prefix}.city`} label='City'></InputField>
      <InputField name={`${prefix}.country`} label='Country'></InputField>
      <InputField
        name={`${prefix}.postal_code`}
        label='Postal code'
      ></InputField>
    </div>
  );
};

export default AddressFields;
